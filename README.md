# DelBot

This project is for UI + BFF (Backend for Frontend) service for robot delivery.

## Overview

DelBot provides a comprehensive solution for robot delivery services, featuring:
- User interface for managing deliveries
- Backend for Frontend (BFF) service to handle API orchestration
- Integration with robot delivery systems

## Getting Started

### Prerequisites
- [Helm](https://helm.sh/docs/intro/install/) (v3+)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- Access to a Kubernetes cluster

### Quick Deploy

```bash
# Deploy with default settings
./deploy.sh

# Deploy specific version
./deploy.sh --version 0.0.3

# Deploy latest version
./deploy.sh --version latest
```

### Manual Helm Commands

```bash
# Deploy specific version
helm upgrade --install delbot ./delbot-chart \
  --set backend.image.tag=0.0.3 \
  --set frontend.image.tag=0.0.3

# Deploy with custom values
helm upgrade --install delbot ./delbot-chart -f my-values.yaml

# Check deployment status
helm status delbot

# Rollback to previous version
helm rollback delbot
```

### Application URLs
- **Frontend**: http://delbot.boysthings.top/
- **Backend API**: http://delbot.boysthings.top/api/health
- **Health Check**: http://delbot.boysthings.top/health
