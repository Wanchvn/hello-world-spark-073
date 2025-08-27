@echo off
setlocal enabledelayedexpansion

REM Production Deployment Script for Windows
REM This script automates the production deployment process

REM Configuration
set DOMAIN=%1
set EMAIL=%2

if "%DOMAIN%"=="" set DOMAIN=yourdomain.com
if "%EMAIL%"=="" set EMAIL=admin@yourdomain.com

echo 🚀 Starting production deployment for %DOMAIN%

REM Check if domain is provided
if "%DOMAIN%"=="yourdomain.com" (
    echo ❌ Please provide your actual domain name as the first argument
    echo Usage: deploy-prod.bat yourdomain.com admin@yourdomain.com
    pause
    exit /b 1
)

REM Check prerequisites
echo 📋 Checking prerequisites...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

REM Check if docker-compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ docker-compose is not available. Please install it first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist "logs\nginx" mkdir "logs\nginx"
if not exist "ssl" mkdir "ssl"
if not exist "backups" mkdir "backups"

REM Check if SSL certificates exist
if not exist "ssl\fullchain.pem" (
    echo 🔒 SSL certificates not found.
    echo ⚠️  Please obtain SSL certificates manually and place them in the ssl folder:
    echo    - ssl\fullchain.pem
    echo    - ssl\privkey.pem
    echo.
    echo 💡 You can use Let's Encrypt with certbot or purchase from a certificate authority.
    echo.
    pause
)

REM Update configuration files with actual domain
echo ⚙️  Updating configuration files...

REM Update nginx configuration (using PowerShell for sed-like functionality)
powershell -Command "(Get-Content nginx.prod.conf) -replace 'yourdomain.com', '%DOMAIN%' -replace 'api.yourdomain.com', 'api.%DOMAIN%' | Set-Content nginx.prod.conf"

REM Update docker-compose.prod.yml
powershell -Command "(Get-Content docker-compose.prod.yml) -replace 'yourdomain.com', '%DOMAIN%' | Set-Content docker-compose.prod.yml"

REM Update environment variables
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy "env.example" ".env"
    echo ⚠️  Please edit .env file with your actual values before continuing
    echo Press any key when you're ready to continue...
    pause >nul
)

REM Build production images
echo 🔨 Building production Docker images...

REM Build backend
echo 🔨 Building backend image...
cd backend
docker build -t myapp-backend:latest .
cd ..

REM Build frontend
echo 🔨 Building frontend image...
docker build -t myapp-frontend:latest .

echo ✅ Docker images built successfully

REM Stop existing containers if running
echo 🛑 Stopping existing containers...
docker-compose -f docker-compose.prod.yml down --remove-orphans

REM Start production services
echo 🚀 Starting production services...
docker-compose -f docker-compose.prod.yml up -d

REM Wait for services to be healthy
echo ⏳ Waiting for services to be healthy...
timeout /t 30 /nobreak >nul

REM Check service health
echo 🏥 Checking service health...

REM Check backend health
curl -f http://localhost:5000/api/health >nul 2>&1
if errorlevel 1 (
    echo ❌ Backend health check failed
    docker-compose -f docker-compose.prod.yml logs backend
    pause
    exit /b 1
) else (
    echo ✅ Backend is healthy
)

REM Check frontend health
curl -f http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo ❌ Frontend health check failed
    docker-compose -f docker-compose.prod.yml logs frontend
    pause
    exit /b 1
) else (
    echo ✅ Frontend is healthy
)

REM Check nginx health
curl -f http://localhost:80 >nul 2>&1
if errorlevel 1 (
    echo ❌ Nginx health check failed
    docker-compose -f docker-compose.prod.yml logs nginx
    pause
    exit /b 1
) else (
    echo ✅ Nginx is healthy
)

echo 🎉 Production deployment completed successfully!
echo 🌐 Your application is now running at:
echo    Frontend: http://%DOMAIN%
echo    Backend API: https://%DOMAIN%/api
echo    Health Check: https://%DOMAIN%/health

REM Show running containers
echo 📊 Running containers:
docker-compose -f docker-compose.prod.yml ps

REM Show logs
echo 📋 Recent logs (last 10 lines):
docker-compose -f docker-compose.prod.yml logs --tail=10

echo ✅ Deployment script completed!
echo 💡 Useful commands:
echo    View logs: docker-compose -f docker-compose.prod.yml logs -f
echo    Stop services: docker-compose -f docker-compose.prod.yml down
echo    Restart services: docker-compose -f docker-compose.prod.yml restart

pause
