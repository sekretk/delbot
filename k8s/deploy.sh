#!/bin/bash

# DelBot Kubernetes Deployment Script
set -e

echo "🚀 DelBot Kubernetes Deployment Script"
echo "======================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Function to check if a resource exists
resource_exists() {
    kubectl get $1 $2 -n $3 &> /dev/null
}

# Check prerequisites
echo ""
echo "🔍 Checking prerequisites..."

# Check for NGINX Ingress Controller
if kubectl get pods -n ingress-nginx | grep -q "ingress-nginx-controller"; then
    echo -e "${GREEN}✅ NGINX Ingress Controller found${NC}"
else
    echo -e "${YELLOW}⚠️  NGINX Ingress Controller not found${NC}"
    echo "Install it with:"
    echo "kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml"
fi

# Check for cert-manager
if kubectl get pods -n cert-manager | grep -q "cert-manager"; then
    echo -e "${GREEN}✅ cert-manager found${NC}"
else
    echo -e "${YELLOW}⚠️  cert-manager not found${NC}"
    echo "Install it with:"
    echo "kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml"
fi

# Check for image pull secret
if resource_exists secret ghcr-secret delbot; then
    echo -e "${GREEN}✅ GitHub Container Registry secret found${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub Container Registry secret not found${NC}"
    echo "Create it with:"
    echo "kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=YOUR_USERNAME --docker-password=YOUR_TOKEN --docker-email=YOUR_EMAIL --namespace=delbot"
fi

echo ""
read -p "Do you want to proceed with the deployment? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Deploy DelBot
echo ""
echo "🚀 Deploying DelBot to Kubernetes..."

# Apply the manifests
kubectl apply -k .

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
echo ""
kubectl get svc -n delbot
echo ""
kubectl get ingress -n delbot

# Check certificate status
echo ""
echo "🔒 Certificate Status:"
echo "====================="
kubectl get certificate -n delbot

echo ""
echo -e "${GREEN}🎉 DelBot deployment completed!${NC}"
echo ""
echo "🌐 Your application should be available at: https://delbot.boysthings.top"
echo "🏥 Health check: https://delbot.boysthings.top/health"
echo ""
echo "📝 To check logs:"
echo "   kubectl logs -f deployment/delbot-backend -n delbot"
echo "   kubectl logs -f deployment/delbot-frontend -n delbot"
echo ""
echo "🔍 To check certificate details:"
echo "   kubectl describe certificate delbot-tls-secret -n delbot"
