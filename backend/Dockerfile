# Multi-stage build for NestJS Backend
FROM node:24 AS builder
WORKDIR /app

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package*.json ./
COPY tsconfig.base.json ./
COPY nx.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code and shared libraries
COPY . .

# Build the backend application directly
RUN npx nx build backend --prod

# Production runtime stage - minimal
FROM node:24-alpine AS production
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Copy only production runtime dependencies (much smaller)
COPY --from=builder --chown=nestjs:nodejs /app/dist/backend ./dist

# Copy only essential runtime node_modules (NestJS + tRPC dependencies)
RUN npm init -y && \
    npm install --production --no-audit --no-fund \
    @nestjs/core@^11.0.0 \
    @nestjs/common@^11.0.0 \
    @nestjs/platform-express@^11.0.0 \
    @nestjs/swagger@^11.2.0 \
    @trpc/server@^11.0.0 \
    reflect-metadata@^0.2.0 \
    rxjs@^7.8.0

USER nestjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
