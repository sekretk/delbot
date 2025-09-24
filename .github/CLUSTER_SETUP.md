# Kubernetes Cluster Setup for CI/CD

This guide explains how to configure GitHub Actions to automatically deploy DelBot to your Kubernetes cluster after each release.

## Prerequisites

- Access to your Kubernetes cluster with `kubectl`
- Admin access to this GitHub repository (to add secrets)
- Helm installed locally for testing

## Setup Steps

### 1. Get Your Kubernetes Config

First, get your cluster configuration:

```bash
# Copy your current kubeconfig
cat ~/.kube/config

# Or get config for a specific cluster
kubectl config view --raw --minify
```

### 2. Encode the Config

The kubeconfig needs to be base64 encoded for GitHub Secrets:

```bash
# Encode your kubeconfig
cat ~/.kube/config | base64 -w 0

# On macOS:
cat ~/.kube/config | base64
```

Copy the entire base64 string (it will be very long).

### 3. Add GitHub Secret

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `KUBE_CONFIG`
5. Value: Paste the base64-encoded kubeconfig
6. Click **Add secret**

### 4. Test the Setup

Create a test release to verify everything works:

```bash
# Create and push a test tag
git tag v0.0.4
git push origin v0.0.4
```

## How It Works

When you create a release tag (e.g., `v0.0.4`), the release pipeline will:

1. ✅ **Build** Docker images with the version tag
2. ✅ **Push** images to GitHub Container Registry
3. ✅ **Install** kubectl and Helm in the CI environment
4. ✅ **Setup** cluster access using the `KUBE_CONFIG` secret
5. ✅ **Deploy** the new version using Helm:
   ```bash
   helm upgrade --install delbot ./delbot-chart \
     --set backend.image.tag=0.0.4 \
     --set frontend.image.tag=0.0.4 \
     --set commonLabels.version=0.0.4
   ```
6. ✅ **Wait** for all pods to be ready
7. ✅ **Report** deployment status in the release summary

## Release Summary

After successful deployment, you'll see:

- 🌐 **Live application URLs**
- 📊 **Kubernetes status commands**
- 🐳 **Docker image links**
- ✅ **Deployment confirmation**

## Troubleshooting

### Deployment Skipped

If you see "Kubernetes deployment (cluster access not configured)" in the release summary:

1. Check that `KUBE_CONFIG` secret exists in repository settings
2. Verify the base64 encoding is correct
3. Ensure the kubeconfig has proper cluster access

### Deployment Failed

Common issues:

1. **Invalid kubeconfig**: Re-encode and update the secret
2. **Cluster permissions**: Ensure the kubeconfig user has deployment permissions
3. **Network access**: GitHub Actions needs to reach your cluster
4. **Namespace issues**: Ensure the `delbot` namespace can be created/accessed

### Testing Locally

Test the same commands locally:

```bash
# Test cluster access
kubectl cluster-info

# Test Helm deployment
./deploy.sh --version 0.0.4

# Check deployment status
helm status delbot
kubectl get pods -n delbot
```

## Security Notes

- The `KUBE_CONFIG` secret contains cluster admin access
- Only repository maintainers should have access to this secret
- Consider using service accounts with limited permissions for production
- Rotate the kubeconfig periodically

## Manual Deployment

If you prefer manual deployment after releases:

```bash
# After a release is created, deploy manually:
./deploy.sh --version 0.0.4

# Or use Helm directly:
helm upgrade --install delbot ./delbot-chart \
  --set backend.image.tag=0.0.4 \
  --set frontend.image.tag=0.0.4
```
