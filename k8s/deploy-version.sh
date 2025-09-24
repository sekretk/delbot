#!/bin/bash

# DelBot Version Deployment Script
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get version from argument or prompt
if [ -z "$1" ]; then
    echo -e "${YELLOW}📝 Usage: ./deploy-version.sh <version>${NC}"
    echo "Examples:"
    echo "  ./deploy-version.sh 0.0.3"
    echo "  ./deploy-version.sh latest"
    echo ""
    read -p "Enter version to deploy: " VERSION
else
    VERSION=$1
fi

# Validate version format (basic check)
if [[ ! "$VERSION" =~ ^([0-9]+\.[0-9]+\.[0-9]+|latest)$ ]]; then
    echo -e "${RED}❌ Invalid version format. Use 0.0.1 format or 'latest'${NC}"
    exit 1
fi

echo "🚀 DelBot Version Deployment"
echo "============================"
echo -e "${YELLOW}Version: $VERSION${NC}"
echo ""

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl is not installed or not in PATH${NC}"
    exit 1
fi

# Check if cluster is accessible
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}❌ Cannot connect to Kubernetes cluster${NC}"
    exit 1
fi

echo -e "${GREEN}✅ kubectl is available and cluster is accessible${NC}"

# Create temporary kustomization with version override
echo "🔧 Creating version-specific deployment..."

# Create a temporary kustomization.yaml with the specified version
cat > kustomization-temp.yaml << EOF
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

metadata:
  name: delbot-versioned

namespace: delbot

resources:
  - namespace.yaml
  - backend-deployment.yaml
  - backend-service.yaml
  - frontend-deployment.yaml
  - frontend-service.yaml
  - ingress.yaml
  - cert-manager-issuer.yaml
  - image-pull-secret.yaml

labels:
  - includeSelectors: true
    pairs:
      app: delbot
      version: "$VERSION"

images:
  - name: ghcr.io/sekretk/delbot/backend
    newTag: $VERSION
  - name: ghcr.io/sekretk/delbot/frontend
    newTag: $VERSION
EOF

echo -e "${GREEN}✅ Generated version-specific configuration${NC}"

# Apply the manifests
echo ""
echo "🚀 Deploying DelBot version $VERSION..."
kubectl apply -k . -f kustomization-temp.yaml

# Clean up temporary file
rm kustomization-temp.yaml

echo ""
echo -e "${GREEN}✅ DelBot $VERSION deployed successfully!${NC}"

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
kubectl get pods -n delbot -o wide
echo ""

# Show image versions
echo "🏷️ Current Image Versions:"
echo "=========================="
kubectl get deployment delbot-backend -n delbot -o jsonpath='{.spec.template.spec.containers[0].image}' && echo " (Backend)"
kubectl get deployment delbot-frontend -n delbot -o jsonpath='{.spec.template.spec.containers[0].image}' && echo " (Frontend)"

echo ""
echo -e "${GREEN}🎉 DelBot $VERSION deployment completed!${NC}"
echo ""
echo "🌐 Your application should be available at: https://delbot.boysthings.top"
