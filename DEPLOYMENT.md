# 🚀 Deployment Guide

This guide covers multiple deployment options for your frontend-backend application with real-world considerations and practical steps.

## 🐳 Docker Deployment (Recommended for Production)

### Prerequisites
- Docker and Docker Compose installed
- Domain name (required for production)
- SSL certificates
- Proper firewall configuration

### Quick Start with Docker Compose (Development)

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

**⚠️ Important:** Production deployment requires proper security configuration, SSL certificates, and environment variable management.

1. **Build production images:**
```bash
# Backend
cd backend
docker build -t myapp-backend:latest .

# Frontend
docker build -t myapp-frontend:latest .
```

2. **Create production docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    image: myapp-backend:latest
    container_name: backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - FRONTEND_URL=https://yourdomain.com
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network

  frontend:
    image: myapp-frontend:latest
    container_name: frontend
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

3. **Set up SSL certificates:**
```bash
# Install certbot
sudo apt update
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates to ssl directory
sudo mkdir -p ssl
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/
```

4. **Run with production settings:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🌐 Railway Deployment (Free Tier Available)

### Prerequisites
- Railway account (https://railway.app)
- Railway CLI installed
- Credit card for verification (required even for free tier)

### Deploy to Railway

**⚠️ Note:** Railway's free tier has limitations and may require credit card verification.

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
DATABASE_URL=your-database-connection-string
JWT_SECRET=your-super-secret-jwt-key
```

**⚠️ Important:** Railway free tier has limitations:
- 500 hours/month for free tier
- Automatic sleep after inactivity
- Limited bandwidth
- No custom domains on free tier

## ⚡ Vercel Deployment (Frontend Only)

### Prerequisites
- Vercel account (https://vercel.com)
- Vercel CLI installed
- GitHub repository connected

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
vercel env add VITE_APP_NAME
vercel env add VITE_ANALYTICS_ID
```

4. **Update API base URL in your frontend code:**
```typescript
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Add error handling for production
if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
  console.error('VITE_API_URL environment variable is not set in production');
}
```

**⚠️ Limitations:**
- Vercel is frontend-only
- You'll need a separate backend deployment
- Environment variables are public in client-side code
- No server-side rendering without additional setup

## 🐙 GitHub Actions Deployment

### Prerequisites
- GitHub repository
- GitHub Actions enabled
- Deployment secrets configured
- Target deployment platform access

### Setup GitHub Actions

1. **Create `.github/workflows/deploy.yml`:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          npm ci
          cd backend && npm ci
      
      - name: Run tests
        run: |
          npm run test
          cd backend && npm run test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          cd backend
          echo ${{ secrets.RAILWAY_TOKEN }} | railway login
          railway up --service backend
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          echo ${{ secrets.VERCEL_TOKEN }} | vercel --token
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

2. **Set up GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add `RAILWAY_TOKEN` (get from Railway dashboard)
   - Add `VERCEL_TOKEN` (get from Vercel dashboard)

**⚠️ Important:** Never commit tokens or secrets to your repository. Always use GitHub Secrets.

## 🌍 Environment Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
SESSION_SECRET=another-super-secret-key-for-sessions
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables

Create a `.env.production` file:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=Your App Name
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_SENTRY_DSN=your-sentry-dsn
```

**⚠️ Security Note:** All Vite environment variables prefixed with `VITE_` are exposed to the client. Never put sensitive information here.

## 🔒 Security Considerations

### Production Checklist

- [ ] HTTPS enabled with valid SSL certificates
- [ ] CORS properly configured with specific origins
- [ ] Environment variables set and secured
- [ ] Security headers configured (HSTS, CSP, etc.)
- [ ] Rate limiting implemented
- [ ] Input validation and sanitization enabled
- [ ] Error logging configured (no sensitive data in logs)
- [ ] Database connections secured
- [ ] JWT secrets rotated regularly
- [ ] API endpoints protected with authentication
- [ ] File upload validation and restrictions
- [ ] SQL injection prevention
- [ ] XSS protection enabled

### SSL/HTTPS

For production, ensure your domain has SSL certificates:

1. **Let's Encrypt (Free):**
```bash
sudo apt update
sudo apt install certbot nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Set up auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

2. **Cloudflare (Free):**
- Add your domain to Cloudflare
- Enable SSL/TLS encryption mode to "Full (strict)"
- Set up DNS records
- Enable HSTS

**⚠️ Important:** Let's Encrypt certificates expire every 90 days. Set up auto-renewal.

## 📊 Monitoring and Health Checks

### Health Check Endpoints

- Backend: `/api/health`
- Frontend: `/health`

### Monitoring Tools

1. **Uptime Robot (Free tier available):**
   - Monitor your endpoints
   - Get notifications on downtime
   - Basic analytics

2. **Sentry (Free tier available):**
   - Error tracking and monitoring
   - Performance monitoring
   - Real-time alerts

3. **Logs:**
   - Backend: Check Railway/Heroku logs
   - Frontend: Check Vercel/Netlify logs
   - Set up log aggregation (e.g., Logtail, Loggly)

### Health Check Implementation

```javascript
// Backend health check
app.get('/api/health', (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV
  };
  
  res.status(200).json(health);
});
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Check `FRONTEND_URL` environment variable
   - Verify CORS configuration in backend
   - Ensure frontend URL matches exactly (including protocol)

2. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript compilation errors
   - Verify environment variables are set

3. **Environment Variables:**
   - Ensure all required variables are set
   - Check variable names and values
   - Verify no trailing spaces or quotes
   - Use proper escaping for special characters

4. **SSL/HTTPS Issues:**
   - Check certificate validity
   - Verify DNS configuration
   - Check firewall settings
   - Verify nginx configuration

### Debug Commands

```bash
# Check backend logs
docker logs backend
docker logs -f backend  # Follow logs

# Check frontend logs
docker logs frontend
docker logs -f frontend  # Follow logs

# Test backend health
curl -v http://localhost:5000/api/health

# Test frontend
curl -v http://localhost:3000

# Check SSL certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Check nginx configuration
nginx -t

# Check Docker containers
docker ps -a
docker stats
```

## 🔄 Continuous Deployment

### Auto-deploy on Git Push

1. **Railway:** Automatically deploys on push to main branch
2. **Vercel:** Automatically deploys on push to main branch
3. **GitHub Actions:** Custom deployment workflows with testing

### Manual Deployment

```bash
# Backend
cd backend
railway up

# Frontend
vercel --prod

# Docker
docker-compose -f docker-compose.prod.yml up -d
```

### Deployment Strategies

1. **Blue-Green Deployment:**
   - Deploy new version alongside old
   - Switch traffic when ready
   - Rollback capability

2. **Rolling Updates:**
   - Update containers one by one
   - Maintain service availability
   - Gradual rollout

## 📈 Scaling Considerations

### Backend Scaling

- Use Railway's auto-scaling (paid plans)
- Implement database connection pooling
- Add caching (Redis)
- Use CDN for static assets
- Implement load balancing
- Add horizontal scaling for stateless services

### Frontend Scaling

- Vercel/Netlify handle scaling automatically
- Implement lazy loading and code splitting
- Optimize bundle size with tree shaking
- Use CDN for assets
- Implement service workers for caching
- Add progressive web app features

### Database Scaling

- Implement read replicas
- Add connection pooling
- Use database clustering
- Implement caching layers
- Consider database sharding for large datasets

## 🎯 Next Steps

1. **Database Integration:**
   - Add PostgreSQL/MongoDB
   - Implement data persistence
   - Set up database migrations
   - Add database backup strategies

2. **Authentication & Authorization:**
   - Add JWT authentication
   - Implement user sessions
   - Add role-based access control
   - Implement OAuth providers

3. **Performance & Monitoring:**
   - Add Redis caching
   - Implement CDN
   - Add monitoring tools (Prometheus, Grafana)
   - Set up alerting systems

4. **CI/CD Pipeline:**
   - Set up automated testing
   - Implement staging environments
   - Add deployment rollbacks
   - Set up code quality checks

5. **Security Hardening:**
   - Implement API rate limiting
   - Add request validation
   - Set up security scanning
   - Implement audit logging

6. **Backup & Recovery:**
   - Database backup strategies
   - File storage backup
   - Disaster recovery plan
   - Regular backup testing

## 📚 Additional Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
