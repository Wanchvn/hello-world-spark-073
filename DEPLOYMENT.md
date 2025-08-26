# 🚀 Deployment Guide

This guide covers multiple deployment options for your frontend-backend application.

## 🐳 Docker Deployment (Recommended for Production)

### Prerequisites
- Docker and Docker Compose installed
- Domain name (optional)

### Quick Start with Docker Compose

1. **Build and run both services:**
```bash
docker-compose up --build
```

2. **Access your application:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

3. **Stop services:**
```bash
docker-compose down
```

### Production Docker Deployment

1. **Build production images:**
```bash
# Backend
cd backend
docker build -t myapp-backend .

# Frontend
docker build -t myapp-frontend .
```

2. **Run with production settings:**
```bash
docker run -d -p 5000:5000 --name backend myapp-backend
docker run -d -p 80:80 --name frontend myapp-frontend
```

## 🌐 Railway Deployment (Free Tier Available)

### Prerequisites
- Railway account (https://railway.app)
- Railway CLI installed

### Deploy to Railway

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Initialize project:**
```bash
railway init
```

4. **Deploy backend:**
```bash
cd backend
railway up
```

5. **Deploy frontend:**
```bash
cd ..
railway up
```

6. **Set environment variables in Railway dashboard:**
```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.railway.app
```

## ⚡ Vercel Deployment (Frontend Only)

### Prerequisites
- Vercel account (https://vercel.com)
- Vercel CLI installed

### Deploy Frontend to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Set environment variables:**
```bash
vercel env add VITE_API_URL
```

4. **Update API base URL in your frontend code:**
```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

## 🐙 GitHub Actions Deployment

### Prerequisites
- GitHub repository
- GitHub Actions enabled

### Setup GitHub Actions

1. **Create `.github/workflows/deploy.yml`:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          cd backend
          npm ci
          npm run build
      # Add your deployment steps here

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          npm ci
          npm run build
      # Add your deployment steps here
```

## 🌍 Environment Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables

Create a `.env.production` file:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🔒 Security Considerations

### Production Checklist

- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Environment variables set
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] Error logging configured

### SSL/HTTPS

For production, ensure your domain has SSL certificates:

1. **Let's Encrypt (Free):**
```bash
sudo apt install certbot
sudo certbot --nginx -d yourdomain.com
```

2. **Cloudflare (Free):**
- Add your domain to Cloudflare
- Enable SSL/TLS encryption mode to "Full"

## 📊 Monitoring and Health Checks

### Health Check Endpoints

- Backend: `/api/health`
- Frontend: `/health`

### Monitoring Tools

1. **Uptime Robot (Free):**
   - Monitor your endpoints
   - Get notifications on downtime

2. **Logs:**
   - Backend: Check Railway/Heroku logs
   - Frontend: Check Vercel/Netlify logs

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Check `FRONTEND_URL` environment variable
   - Verify CORS configuration in backend

2. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Environment Variables:**
   - Ensure all required variables are set
   - Check variable names and values

### Debug Commands

```bash
# Check backend logs
docker logs backend

# Check frontend logs
docker logs frontend

# Test backend health
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost:3000
```

## 🔄 Continuous Deployment

### Auto-deploy on Git Push

1. **Railway:** Automatically deploys on push to main branch
2. **Vercel:** Automatically deploys on push to main branch
3. **GitHub Actions:** Custom deployment workflows

### Manual Deployment

```bash
# Backend
cd backend
railway up

# Frontend
vercel --prod
```

## 📈 Scaling Considerations

### Backend Scaling

- Use Railway's auto-scaling
- Implement database connection pooling
- Add caching (Redis)
- Use CDN for static assets

### Frontend Scaling

- Vercel/Netlify handle scaling automatically
- Implement lazy loading
- Optimize bundle size
- Use CDN for assets

## 🎯 Next Steps

1. **Database Integration:**
   - Add PostgreSQL/MongoDB
   - Implement data persistence

2. **Authentication:**
   - Add JWT authentication
   - Implement user sessions

3. **Performance:**
   - Add Redis caching
   - Implement CDN
   - Add monitoring tools

4. **CI/CD:**
   - Set up automated testing
   - Implement staging environments
   - Add deployment rollbacks
