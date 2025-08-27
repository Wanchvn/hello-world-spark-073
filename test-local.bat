@echo off
echo 🧪 Testing local development environment...

echo 🔍 Testing backend health...
curl -f http://localhost:5000/api/health
if errorlevel 1 (
    echo ❌ Backend health check failed
    echo 💡 Make sure the backend is running: docker-compose -f docker-compose.local.yml up -d
) else (
    echo ✅ Backend is healthy
)

echo.
echo 🔍 Testing frontend...
curl -f http://localhost:3000
if errorlevel 1 (
    echo ❌ Frontend check failed
    echo 💡 Make sure the frontend is running: docker-compose -f docker-compose.local.yml up -d
) else (
    echo ✅ Frontend is accessible
)

echo.
echo 🔍 Testing API endpoints...

echo 📋 Testing users endpoint...
curl -s http://localhost:5000/api/users | findstr "John Doe"
if errorlevel 1 (
    echo ❌ Users endpoint failed
) else (
    echo ✅ Users endpoint working
)

echo 📋 Testing posts endpoint...
curl -s http://localhost:5000/api/posts | findstr "First Post"
if errorlevel 1 (
    echo ❌ Posts endpoint failed
) else (
    echo ✅ Posts endpoint working
)

echo.
echo 🎯 Container status:
docker-compose -f docker-compose.local.yml ps

echo.
echo 🌐 Your application is running at:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000/api
echo    Health Check: http://localhost:5000/api/health
echo    Users: http://localhost:5000/api/users
echo    Posts: http://localhost:5000/api/posts

echo.
echo 🚀 Opening frontend in browser...
start http://localhost:3000

pause
