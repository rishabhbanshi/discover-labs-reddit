# Docker Setup for FastAPI Reddit Analyzer

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the image
docker build -t reddit-analyzer .

# Run the container
docker run -p 8000:8000 reddit-analyzer

# Run with environment variables
docker run -p 8000:8000 \
  -e MAX_POSTS_PER_REQUEST=150 \
  reddit-analyzer
```

## Access the API

Once running, access the API at:
- **API**: http://localhost:8000
- **Health Check**: http://localhost:8000/health
- **Docs**: http://localhost:8000/docs
- **Reddit Analysis**: http://localhost:8000/reddit/analyze/Tesla

## Files Included

1. **`Dockerfile`** - Development/basic Dockerfile
   - Simple single-stage build
   - Good for development
   - Includes hot-reload capability

2. **`Dockerfile.prod`** - Production-optimized Dockerfile
   - Multi-stage build for smaller image size
   - 4 worker processes
   - Optimized for performance
   - ~200MB smaller than dev build

3. **`docker-compose.yml`** - Docker Compose configuration
   - Easy orchestration
   - Volume mounting for development
   - Health checks included
   - Network configuration

4. **`.dockerignore`** - Excludes unnecessary files
   - Reduces build context size
   - Faster builds

## Development vs Production

### Development (with hot reload)

```bash
# docker-compose.yml includes volume mount for hot reload
docker-compose up
```

Code changes in `./app` will automatically reload the server.

### Production

```bash
# Build production image
docker build -f Dockerfile.prod -t reddit-analyzer:prod .

# Run production container
docker run -p 8000:8000 reddit-analyzer:prod
```

## Environment Variables

Set these in `docker-compose.yml` or pass with `-e`:

```yaml
environment:
  - PUSHSHIFT_BASE_URL=https://api.pushshift.io/reddit
  - MAX_POSTS_PER_REQUEST=100
  - MAX_SUBREDDITS=50
  - MAX_SUBREDDITS_DETAILED=5
  - MAX_POSTS_PER_SUBREDDIT=10
  - MAX_COMMENTS_PER_POST=5
```

## Docker Commands Cheat Sheet

```bash
# Build
docker-compose build
docker build -t reddit-analyzer .

# Run
docker-compose up
docker-compose up -d  # detached mode
docker run -p 8000:8000 reddit-analyzer

# Stop
docker-compose down
docker stop <container-id>

# Logs
docker-compose logs -f
docker logs <container-id>

# Shell access
docker-compose exec fastapi-app bash
docker exec -it <container-id> bash

# Remove
docker-compose down -v  # with volumes
docker rmi reddit-analyzer  # remove image

# Clean up
docker system prune -a  # remove all unused containers/images
```

## Testing the Dockerized API

```bash
# Start the container
docker-compose up -d

# Test health endpoint
curl http://localhost:8000/health

# Test Reddit analysis
curl http://localhost:8000/reddit/analyze/Tesla?limit=10

# View logs
docker-compose logs -f
```

## Image Sizes

- **Development** (`Dockerfile`): ~450MB
- **Production** (`Dockerfile.prod`): ~250MB (multi-stage build)

## Troubleshooting

### Port already in use
```bash
# Check what's using port 8000
lsof -i :8000

# Or use a different port
docker run -p 8001:8000 reddit-analyzer
```

### Container won't start
```bash
# Check logs
docker-compose logs

# Check container status
docker ps -a

# Rebuild without cache
docker-compose build --no-cache
```

### Permission errors
```bash
# The Dockerfile creates a non-root user (appuser)
# If you have permission issues, check file ownership
ls -la app/
```

## Production Deployment

### With Docker Compose

```bash
# Use production Dockerfile
docker-compose -f docker-compose.prod.yml up -d
```

### With Kubernetes

Create deployment and service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reddit-analyzer
spec:
  replicas: 3
  selector:
    matchLabels:
      app: reddit-analyzer
  template:
    metadata:
      labels:
        app: reddit-analyzer
    spec:
      containers:
      - name: reddit-analyzer
        image: reddit-analyzer:prod
        ports:
        - containerPort: 8000
---
apiVersion: v1
kind: Service
metadata:
  name: reddit-analyzer
spec:
  selector:
    app: reddit-analyzer
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer
```

## Health Checks

The containers include health checks that:
- Check `/health` endpoint every 30 seconds
- Timeout after 10 seconds
- Retry 3 times before marking unhealthy
- Start checking after 5-second grace period

```bash
# Check container health
docker ps
# HEALTHY status indicates working container
```

## Volume Mounting (Development)

For development with hot reload:

```yaml
volumes:
  - ./app:/app/app
```

This mounts your local `app` directory into the container.

## Multi-Container Setup

To add a database or other services:

```yaml
# docker-compose.yml
services:
  fastapi-app:
    # ... existing config ...
    depends_on:
      - redis
      - postgres
    environment:
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Best Practices Implemented

✅ Multi-stage builds (production)  
✅ Non-root user for security  
✅ Health checks  
✅ .dockerignore for faster builds  
✅ Volume mounting for development  
✅ Environment variable configuration  
✅ Proper layer caching  
✅ Minimal base image (slim)  

