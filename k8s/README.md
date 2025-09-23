# DelBot Kubernetes Deployment

This directory contains Kubernetes manifests to deploy DelBot frontend and backend with automatic SSL certificates via Let's Encrypt.

## 🏗️ Architecture

- **Frontend**: React app served via nginx (port 80)
- **Backend**: NestJS API server (port 3000)
- **Domain**: `delbot.boysthings.top`
- **SSL**: Let's Encrypt certificates (automatic renewal)
- **Registry**: GitHub Container Registry (ghcr.io)

## 📋 Prerequisites

1. **Kubernetes cluster** (1.19+)
2. **NGINX Ingress Controller** installed
3. **cert-manager** installed for Let's Encrypt
4. **kubectl** configured
5. **kustomize** (optional, built into kubectl)

## 🚀 Quick Start

### 1. Install Prerequisites

```bash
# Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

### 2. Configure GitHub Container Registry Access

Create the image pull secret:

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN \
  --docker-email=YOUR_EMAIL \
  --namespace=delbot
```

### 3. Update Email in Certificate Issuer

Edit `k8s/cert-manager-issuer.yaml` and replace `your-email@example.com` with your actual email address.

### 4. Deploy DelBot

**Option A: Deploy Default Version (0.0.2)**
```bash
# Deploy with default version tags
kubectl apply -k k8s/
```

**Option B: Deploy Specific Version** ⭐ (Recommended)
```bash
# Deploy specific version
cd k8s && ./deploy-version.sh 0.0.3

# Or deploy latest
cd k8s && ./deploy-version.sh latest
```

**Option C: Override Version with Environment Variable**
```bash
# Deploy with version override
DELBOT_VERSION=0.0.3 ./k8s/deploy.sh
```

### 5. Verify Deployment

```bash
# Check all resources
kubectl get all -n delbot

# Check certificate status
kubectl get certificate -n delbot
kubectl describe certificate delbot-tls-secret -n delbot

# Check ingress
kubectl get ingress -n delbot
```

## 📝 Configuration Files

### Kubernetes Manifests (`k8s/`)

- `namespace.yaml` - DelBot namespace
- `backend-deployment.yaml` - Backend deployment (2 replicas)
- `backend-service.yaml` - Backend service (ClusterIP)
- `frontend-deployment.yaml` - Frontend deployment (2 replicas)  
- `frontend-service.yaml` - Frontend service (ClusterIP)
- `ingress.yaml` - NGINX ingress with Let's Encrypt
- `cert-manager-issuer.yaml` - Let's Encrypt certificate issuers
- `image-pull-secret.yaml` - GitHub Container Registry access
- `kustomization.yaml` - Kustomization configuration
- `deploy.sh` - Automated deployment script
- `README.md` - This documentation


## 🌐 Domain Configuration

Ensure your domain `delbot.boysthings.top` points to your Kubernetes cluster's ingress IP:

```bash
# Get ingress IP
kubectl get svc -n ingress-nginx

# Update DNS A record
# delbot.boysthings.top -> YOUR_CLUSTER_IP
```

## 🔐 SSL Certificate

The Let's Encrypt certificate is automatically provisioned and renewed. Check status:

```bash
# View certificate details
kubectl describe certificate delbot-tls-secret -n delbot

# View certificate issuer events
kubectl describe clusterissuer letsencrypt-prod
```

## 📊 Monitoring & Troubleshooting

### Check Pod Status
```bash
kubectl get pods -n delbot
kubectl logs -f deployment/delbot-backend -n delbot
kubectl logs -f deployment/delbot-frontend -n delbot
```

### Check Ingress
```bash
kubectl describe ingress delbot-ingress -n delbot
```

### Test Health Endpoints
```bash
# Backend health
curl https://delbot.boysthings.top/health

# Frontend (should return HTML)
curl https://delbot.boysthings.top/
```

## 🔄 Updates

**Method 1: Deploy Specific Version** ⭐ (Recommended)
```bash
# Deploy new version
cd k8s && ./deploy-version.sh 0.0.3

# Check rollout status
kubectl rollout status deployment/delbot-backend -n delbot
kubectl rollout status deployment/delbot-frontend -n delbot
```

**Method 2: Update Default Version**
```bash
# Update image tags in kustomization.yaml, then:
kubectl apply -k k8s/
```

**Method 3: Force Restart with Latest**
```bash
# Force pull latest images and restart
kubectl rollout restart deployment/delbot-backend -n delbot
kubectl rollout restart deployment/delbot-frontend -n delbot
```

**Check Current Versions:**
```bash
# View current image versions
kubectl get deployment delbot-backend -n delbot -o jsonpath='{.spec.template.spec.containers[0].image}'
kubectl get deployment delbot-frontend -n delbot -o jsonpath='{.spec.template.spec.containers[0].image}'
```

## 🔒 Security Features

- **Non-root containers**: All containers run as user 1001
- **Read-only root filesystem**: Enhanced security
- **Resource limits**: CPU and memory constraints
- **Security headers**: XSS, CSRF, and clickjacking protection
- **Rate limiting**: 100 requests per minute per IP
- **SSL redirect**: All HTTP traffic redirected to HTTPS

## 📈 Scaling

```bash
# Scale backend
kubectl scale deployment delbot-backend --replicas=3 -n delbot

# Scale frontend  
kubectl scale deployment delbot-frontend --replicas=3 -n delbot
```

## 🗑️ Cleanup

```bash
# Remove DelBot deployment
kubectl delete -k k8s/

# Remove namespace (removes everything)
kubectl delete namespace delbot
```
