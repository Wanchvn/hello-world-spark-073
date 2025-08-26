# 🚀 Frontend-Backend Connection Demo

A full-stack application demonstrating React frontend connected to Express.js backend with comprehensive deployment configurations.

## ✨ Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js REST API with CORS and security headers
- **State Management**: React Query for efficient API communication
- **Deployment**: Multiple platform support (Docker, Railway, Vercel)
- **CI/CD**: GitHub Actions for automated deployment
- **Containerization**: Docker and Docker Compose support

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   React Frontend │ ◄──────────────► │ Express Backend  │
│   (Vite + TS)   │                  │   (Node.js)     │
└─────────────────┘                  └─────────────────┘
         │                                     │
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│   Vercel/Netlify│                  │   Railway/Heroku│
│   (Static Host) │                  │   (API Host)    │
└─────────────────┘                  └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Docker (optional)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

3. **Start development servers**
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

4. **Access your application**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Demo: http://localhost:5173 (scroll down)

## 🐳 Docker Deployment

### Quick Start with Docker Compose
```bash
# Build and run both services
docker-compose up --build

# Access at http://localhost:3000 (frontend) and http://localhost:5000 (backend)
```

### Windows Users
Double-click `deploy-docker.bat` for easy deployment!

## 🌐 Cloud Deployment

### Railway (Backend)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy backend
cd backend
railway login
railway up
```

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
vercel
```

## 🔄 Automated Deployment

This repository includes GitHub Actions for automatic deployment:

1. **Push to main branch** → Triggers deployment
2. **Tests run** → Ensures code quality
3. **Backend deploys** → Railway automatically
4. **Frontend deploys** → Vercel automatically

### Setup GitHub Actions
1. Go to repository Settings → Secrets and variables → Actions
2. Add `RAILWAY_TOKEN` and `VERCEL_TOKEN`
3. Push to main branch to trigger deployment

## 📁 Project Structure

```
├── .github/                    # GitHub Actions & templates
│   ├── workflows/
│   │   └── deploy.yml         # Automated deployment
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   └── pull_request_template.md
├── backend/                    # Express.js backend
│   ├── server.js              # Development server
│   ├── server.prod.js         # Production server
│   ├── Dockerfile             # Backend container
│   └── package.json
├── src/                        # React frontend source
│   ├── components/            # React components
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilities & API
│   └── pages/                 # Page components
├── Dockerfile                  # Frontend container
├── docker-compose.yml          # Local development
├── nginx.conf                  # Production web server
├── vercel.json                 # Vercel configuration
├── railway.json                # Railway configuration
└── deploy-*.sh/bat            # Deployment scripts
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create new user |
| `GET` | `/api/posts` | Get all posts |
| `GET` | `/api/posts/:id` | Get post by ID |
| `POST` | `/api/posts` | Create new post |

## 🛠️ Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
```

### Adding New Features

1. **Create feature branch**
```bash
git checkout -b feature/new-feature
```

2. **Make changes and test**
```bash
npm run dev          # Test frontend
cd backend && npm run dev  # Test backend
```

3. **Commit and push**
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

4. **Create Pull Request** → Automatic deployment after merge

## 🔒 Security Features

- CORS configuration
- Security headers (XSS protection, content type options)
- Input validation
- Error handling without information leakage
- Non-root Docker containers

## 📊 Monitoring

### Health Checks
- Backend: `/api/health`
- Frontend: `/health`
- Docker: Built-in health checks

### Logs
- Backend: Railway/Heroku dashboard
- Frontend: Vercel/Netlify dashboard
- GitHub Actions: Actions tab

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` environment variable
   - Verify backend CORS configuration

2. **Build Failures**
   - Check Node.js version (18+ required)
   - Clear `node_modules` and reinstall

3. **Deployment Issues**
   - Check GitHub Actions logs
   - Verify environment variables
   - Check platform-specific dashboards

### Debug Commands

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend

# Test API
curl http://localhost:5000/api/health

# Check environment
echo $NODE_ENV
echo $FRONTEND_URL
```

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Comprehensive deployment guide
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - GitHub repository setup
- **[API Documentation](#api-endpoints)** - Backend API reference

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- 📖 Check the documentation files
- 🐛 Create an issue for bugs
- 💡 Suggest features via issues
- 🔧 Check GitHub Actions for deployment status

## 🎯 Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication & authorization
- [ ] Real-time features (WebSockets)
- [ ] File uploads
- [ ] Advanced monitoring & analytics
- [ ] Multi-environment deployments

---

**Built with ❤️ using modern web technologies**

**Deploy with confidence using our comprehensive deployment setup! 🚀**
