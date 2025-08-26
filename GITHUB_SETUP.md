# 🚀 GitHub Repository Setup Guide

This guide will help you set up your GitHub repository with all the deployment configurations and automation.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- Node.js and npm installed
- Railway account (for backend deployment)
- Vercel account (for frontend deployment)

## 🔧 Step-by-Step Setup

### 1. Initialize Git Repository

```bash
# If you haven't already initialized git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Frontend-Backend with deployment configs"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2. Set Up GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

#### Railway Token
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Get token: `railway whoami`
4. Add as `RAILWAY_TOKEN`

#### Vercel Token
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Get token from [Vercel Dashboard](https://vercel.com/account/tokens)
4. Add as `VERCEL_TOKEN`

### 3. Enable GitHub Actions

1. Go to your repository → Actions tab
2. Click "Enable Actions"
3. The workflow will automatically run on your next push

### 4. Set Up Branch Protection (Recommended)

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

## 🚀 Deployment Workflow

### Automatic Deployment

1. **Push to main branch** → Triggers deployment
2. **GitHub Actions runs:**
   - Tests and builds frontend
   - Deploys backend to Railway
   - Deploys frontend to Vercel

### Manual Deployment

```bash
# Deploy backend
cd backend
railway up

# Deploy frontend
vercel --prod
```

## 📁 Repository Structure

```
your-repo/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions workflow
│   ├── ISSUE_TEMPLATE/
│   │   └── deployment-request.md
│   └── pull_request_template.md
├── backend/
│   ├── server.js               # Development server
│   ├── server.prod.js          # Production server
│   ├── Dockerfile              # Backend container
│   ├── package.json
│   └── deploy.config.js        # Deployment config
├── src/                        # Frontend source
├── Dockerfile                  # Frontend container
├── docker-compose.yml          # Local development
├── nginx.conf                  # Nginx config
├── vercel.json                 # Vercel config
├── railway.json                # Railway config
├── deploy-docker.bat           # Windows deployment script
├── deploy-railway.sh           # Railway deployment script
├── DEPLOYMENT.md               # Deployment guide
└── GITHUB_SETUP.md             # This file
```

## 🔐 Environment Variables

### Backend (Railway)
Set these in Railway dashboard:
```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (Vercel)
Set these in Vercel dashboard:
```
VITE_API_URL=https://your-backend-domain.railway.app/api
```

## 📊 Monitoring

### Health Checks
- Backend: `https://your-backend.railway.app/api/health`
- Frontend: `https://your-frontend.vercel.app/health`

### GitHub Actions
- View deployment status in Actions tab
- Check logs for any deployment issues

## 🚨 Troubleshooting

### Common Issues

1. **Secrets not found:**
   - Verify secrets are set in GitHub repository settings
   - Check secret names match exactly

2. **Deployment fails:**
   - Check GitHub Actions logs
   - Verify environment variables are set
   - Check Railway/Vercel dashboard for errors

3. **CORS errors:**
   - Verify `FRONTEND_URL` is set correctly in Railway
   - Check CORS configuration in backend

### Debug Commands

```bash
# Check GitHub Actions status
gh run list

# View latest workflow run
gh run view

# Check Railway status
railway status

# Check Vercel status
vercel ls
```

## 🔄 Continuous Deployment

### Workflow
1. **Develop locally** → Test changes
2. **Create feature branch** → `git checkout -b feature/new-feature`
3. **Make changes** → Test thoroughly
4. **Push to feature branch** → `git push origin feature/new-feature`
5. **Create Pull Request** → Request review
6. **Merge to main** → Automatic deployment

### Rollback
1. **Revert commit** → `git revert <commit-hash>`
2. **Push to main** → Automatic rollback deployment

## 📈 Next Steps

1. **Set up monitoring:**
   - Uptime Robot for health checks
   - Log aggregation (Papertrail, Loggly)

2. **Add testing:**
   - Unit tests with Jest
   - Integration tests
   - E2E tests with Playwright

3. **Security:**
   - Dependabot for dependency updates
   - CodeQL for security scanning
   - Secret scanning

4. **Performance:**
   - Lighthouse CI
   - Bundle analysis
   - Performance monitoring

## 🎯 Success Metrics

- ✅ Automated deployments working
- ✅ Health checks passing
- ✅ Frontend and backend communicating
- ✅ Rollback capability tested
- ✅ Monitoring alerts configured

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review Railway/Vercel dashboards
3. Check this documentation
4. Create an issue in the repository

---

**Happy Deploying! 🚀**
