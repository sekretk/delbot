# Multi-stage build for NestJS Backend
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest*.js ./
RUN npm install

# Copy source code
COPY backend/ ./backend/
COPY .nx/ ./.nx/

# Build the backend application
RUN npx nx build backend --prod

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/dist/backend ./dist

USER nestjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

CMD ["node", "dist/main.js"]
