# Multi-stage build for React Frontend
FROM node:20-alpine AS builder
WORKDIR /app

# TODO Copy package files and install dependencies
COPY . .
RUN npm i

# Build the frontend application
RUN npx nx build frontend --prod

# Production stage with nginx
FROM nginx:alpine AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from builder stage
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Copy custom nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user for nginx
RUN addgroup -g 1001 -S nginx-user && adduser -S frontend-user -u 1001 -G nginx-user

# Change ownership of nginx directories
RUN chown -R frontend-user:nginx-user /var/cache/nginx && \
    chown -R frontend-user:nginx-user /var/log/nginx && \
    chown -R frontend-user:nginx-user /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R frontend-user:nginx-user /var/run/nginx.pid && \
    chown -R frontend-user:nginx-user /usr/share/nginx/html

USER frontend-user

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
