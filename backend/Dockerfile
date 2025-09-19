# Multi-stage build for NestJS Backend
FROM node:20-alpine AS builder
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat python3 make g++

# Copy all necessary files for build
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest*.js ./
COPY .nx/ ./.nx/
COPY backend/ ./backend/

# Install dependencies
RUN npm install

# Build the backend application directly
RUN npx nx build backend --prod

# Production runtime stage - minimal
FROM node:20-alpine AS production
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Copy only production runtime dependencies (much smaller)
COPY --from=builder --chown=nestjs:nodejs /app/dist/backend ./dist

# Copy only essential runtime node_modules (NestJS core dependencies)
RUN npm init -y && \
    npm install --production --no-audit --no-fund \
    @nestjs/core@^11.0.0 \
    @nestjs/common@^11.0.0 \
    @nestjs/platform-express@^11.0.0 \
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
