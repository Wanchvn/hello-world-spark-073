@echo off
echo 🚀 Starting Docker Deployment...

echo 📦 Building and starting services...
docker-compose up --build -d

echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

echo 🔍 Checking service status...
docker-compose ps

echo 🌐 Your application is now running at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000

echo.
echo 📊 Health Check:
curl -s http://localhost:5000/api/health

echo.
echo ✅ Deployment complete! Press any key to stop services...
pause >nul

echo 🛑 Stopping services...
docker-compose down

echo 👋 Goodbye!
pause
