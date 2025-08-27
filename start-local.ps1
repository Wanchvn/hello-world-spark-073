# Local Development Startup Script
Write-Host "🚀 Starting local development environment..." -ForegroundColor Green

# Check if Docker is running
Write-Host "📋 Checking if Docker is running..." -ForegroundColor Yellow
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Build and start services
Write-Host "🔨 Building and starting services..." -ForegroundColor Yellow
docker-compose -f docker-compose.local.yml up --build -d

# Wait for services to start
Write-Host "⏳ Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check service health
Write-Host "🏥 Checking service health..." -ForegroundColor Yellow

# Check backend health
Write-Host "🔍 Checking backend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend is healthy" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Backend might still be starting up..." -ForegroundColor Yellow
}

# Check frontend
Write-Host "🔍 Checking frontend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend is healthy" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Frontend might still be starting up..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Local development environment is starting!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your application will be available at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend API: http://localhost:5000/api" -ForegroundColor White
Write-Host "   Health Check: http://localhost:5000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "💡 Useful commands:" -ForegroundColor Cyan
Write-Host "   View logs: docker-compose -f docker-compose.local.yml logs -f" -ForegroundColor White
Write-Host "   Stop services: docker-compose -f docker-compose.local.yml down" -ForegroundColor White
Write-Host "   Restart services: docker-compose -f docker-compose.local.yml restart" -ForegroundColor White
Write-Host ""
Write-Host "📋 Current container status:" -ForegroundColor Cyan
docker-compose -f docker-compose.local.yml ps

Write-Host ""
Write-Host "🚀 Opening your application in the browser..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Press Enter to continue..." -ForegroundColor Yellow
Read-Host
