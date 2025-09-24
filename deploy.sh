#!/bin/bash

# DelBot Helm Deployment Script
# This replaces both k8s/deploy.sh and k8s/deploy-version.sh

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Default values
CHART_PATH="./delbot-chart"
RELEASE_NAME="delbot"
VERSION=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -v|--version)
      VERSION="$2"
      shift 2
      ;;
    -h|--help)
      echo "Usage: $0 [options]"
      echo "Options:"
      echo "  -v, --version VERSION    Deploy specific version (e.g., 0.0.3, latest)"
      echo "  -h, --help              Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0                      Deploy with default values"
      echo "  $0 -v 0.0.3            Deploy version 0.0.3"  
      echo "  $0 --version latest     Deploy latest version"
      exit 0
      ;;
    *)
      VERSION="$1"
      shift
      ;;
  esac
done

# Interactive version prompt if not provided
if [ -z "$VERSION" ]; then
    echo -e "${YELLOW}📝 Enter version to deploy (or press Enter for default):${NC}"
    read -p "Version (e.g., 0.0.3, latest): " VERSION
fi

echo "🚀 DelBot Helm Deployment"
echo "========================"
if [ -n "$VERSION" ]; then
    echo -e "${YELLOW}Version: $VERSION${NC}"
else
    echo -e "${YELLOW}Version: Using values.yaml defaults${NC}"
fi
echo ""

# Check if helm is available
if ! command -v helm &> /dev/null; then
    echo -e "${RED}❌ Helm is not installed or not in PATH${NC}"
    exit 1
fi

# Check if chart exists
if [ ! -d "$CHART_PATH" ]; then
    echo -e "${RED}❌ Helm chart not found at $CHART_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Helm is available and chart found${NC}"

# Build helm command
HELM_CMD="helm upgrade --install $RELEASE_NAME $CHART_PATH"

# Add version overrides if specified
if [ -n "$VERSION" ]; then
    HELM_CMD="$HELM_CMD --set backend.image.tag=$VERSION --set frontend.image.tag=$VERSION --set commonLabels.version=$VERSION"
fi

# Deploy with Helm
echo ""
echo "🚀 Deploying DelBot..."
echo "Command: $HELM_CMD"
echo ""

eval $HELM_CMD

echo ""
echo -e "${GREEN}✅ DelBot deployed successfully!${NC}"

# Wait for deployments to be ready
echo ""
echo "⏳ Waiting for deployments to be ready..."

kubectl wait --for=condition=available --timeout=300s deployment/delbot-backend -n delbot
kubectl wait --for=condition=available --timeout=300s deployment/delbot-frontend -n delbot

echo ""
echo -e "${GREEN}✅ All deployments are ready!${NC}"

# Show deployment status
echo ""
echo "📊 Deployment Status:"
echo "===================="
kubectl get pods -n delbot

# Show current versions
echo ""
echo "🏷️ Current Image Versions:"
echo "=========================="
kubectl get deployment delbot-backend -n delbot -o jsonpath='{.spec.template.spec.containers[0].image}' && echo " (Backend)"
kubectl get deployment delbot-frontend -n delbot -o jsonpath='{.spec.template.spec.containers[0].image}' && echo " (Frontend)"

echo ""
echo -e "${GREEN}🎉 DelBot deployment completed!${NC}"
echo ""
echo "🌐 Your application should be available at: http://delbot.boysthings.top"

# Show useful Helm commands
echo ""
echo "📋 Useful Helm Commands:"
echo "========================"
echo "# Check release status"
echo "helm status $RELEASE_NAME"
echo ""
echo "# View release history"  
echo "helm history $RELEASE_NAME"
echo ""
echo "# Rollback to previous version"
echo "helm rollback $RELEASE_NAME"
echo ""
echo "# Uninstall release"
echo "helm uninstall $RELEASE_NAME"
