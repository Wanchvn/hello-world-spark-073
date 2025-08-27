@echo off
echo 🚀 Starting local development environment...

echo 📋 Checking if Docker is running...
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo ✅ Docker is running

echo 🔨 Building and starting services...
docker-compose -f docker-compose.local.yml up --build -d

echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

echo 🏥 Checking service health...

REM Check backend health
echo 🔍 Checking backend...
curl -f http://localhost:5000/api/health >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Backend might still be starting up...
) else (
    echo ✅ Backend is healthy
)

REM Check frontend
echo 🔍 Checking frontend...
curl -f http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Frontend might still be starting up...
) else (
    echo ✅ Frontend is healthy
)

echo.
echo 🎉 Local development environment is starting!
echo.
echo 🌐 Your application will be available at:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000/api
echo    Health Check: http://localhost:5000/api/health
echo.
echo 💡 Useful commands:
echo    View logs: docker-compose -f docker-compose.local.yml logs -f
echo    Stop services: docker-compose -f docker-compose.local.yml down
echo    Restart services: docker-compose -f docker-compose.local.yml restart
echo.
echo 📋 Current container status:
docker-compose -f docker-compose.local.yml ps

echo.
echo 🚀 Opening your application in the browser...
start http://localhost:3000

pause
