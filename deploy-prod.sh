#!/bin/bash

# Production Deployment Script
# This script automates the production deployment process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${1:-"yourdomain.com"}
EMAIL=${2:-"admin@yourdomain.com"}

echo -e "${GREEN}🚀 Starting production deployment for ${DOMAIN}${NC}"

# Check if running as root (needed for SSL)
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}❌ This script should not be run as root${NC}"
   exit 1
fi

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ docker-compose is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if domain is provided
if [ "$DOMAIN" = "yourdomain.com" ]; then
    echo -e "${RED}❌ Please provide your actual domain name as the first argument${NC}"
    echo "Usage: ./deploy-prod.sh yourdomain.com admin@yourdomain.com"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Create necessary directories
echo -e "${YELLOW}📁 Creating necessary directories...${NC}"
mkdir -p logs/nginx
mkdir -p ssl
mkdir -p backups

# Check if SSL certificates exist
if [ ! -f "ssl/fullchain.pem" ] || [ ! -f "ssl/privkey.pem" ]; then
    echo -e "${YELLOW}🔒 SSL certificates not found. Setting up Let's Encrypt...${NC}"
    
    # Check if certbot is available
    if ! command -v certbot &> /dev/null; then
        echo -e "${RED}❌ certbot is not installed. Installing...${NC}"
        sudo apt update
        sudo apt install -y certbot
    fi
    
    # Get SSL certificate
    echo -e "${YELLOW}📜 Getting SSL certificate from Let's Encrypt...${NC}"
    sudo certbot certonly --standalone -d "$DOMAIN" -d "www.$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive
    
    # Copy certificates to ssl directory
    echo -e "${YELLOW}📋 Copying SSL certificates...${NC}"
    sudo cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ssl/
    sudo cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" ssl/
    sudo chown $USER:$USER ssl/*
    
    echo -e "${GREEN}✅ SSL certificates obtained and configured${NC}"
else
    echo -e "${GREEN}✅ SSL certificates already exist${NC}"
fi

# Update configuration files with actual domain
echo -e "${YELLOW}⚙️  Updating configuration files...${NC}"

# Update nginx configuration
sed -i "s/yourdomain.com/$DOMAIN/g" nginx.prod.conf
sed -i "s/api.yourdomain.com/api.$DOMAIN/g" nginx.prod.conf

# Update docker-compose.prod.yml
sed -i "s/yourdomain.com/$DOMAIN/g" docker-compose.prod.yml

# Update environment variables
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}📝 Creating .env file from template...${NC}"
    cp env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env file with your actual values before continuing${NC}"
    echo -e "${YELLOW}Press Enter when you're ready to continue...${NC}"
    read
fi

# Build production images
echo -e "${YELLOW}🔨 Building production Docker images...${NC}"

# Build backend
echo -e "${YELLOW}🔨 Building backend image...${NC}"
cd backend
docker build -t myapp-backend:latest .
cd ..

# Build frontend
echo -e "${YELLOW}🔨 Building frontend image...${NC}"
docker build -t myapp-frontend:latest .

echo -e "${GREEN}✅ Docker images built successfully${NC}"

# Stop existing containers if running
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down --remove-orphans || true

# Start production services
echo -e "${YELLOW}🚀 Starting production services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 30

# Check service health
echo -e "${YELLOW}🏥 Checking service health...${NC}"

# Check backend health
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    docker-compose -f docker-compose.prod.yml logs backend
    exit 1
fi

# Check frontend health
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is healthy${NC}"
else
    echo -e "${RED}❌ Frontend health check failed${NC}"
    docker-compose -f docker-compose.prod.yml logs frontend
    exit 1
fi

# Check nginx health
if curl -f http://localhost:80 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Nginx is healthy${NC}"
else
    echo -e "${RED}❌ Nginx health check failed${NC}"
    docker-compose -f docker-compose.prod.yml logs nginx
    exit 1
fi

echo -e "${GREEN}🎉 Production deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your application is now running at:${NC}"
echo -e "${GREEN}   Frontend: http://$DOMAIN${NC}"
echo -e "${GREEN}   Backend API: https://$DOMAIN/api${NC}"
echo -e "${GREEN}   Health Check: https://$DOMAIN/health${NC}"

# Show running containers
echo -e "${YELLOW}📊 Running containers:${NC}"
docker-compose -f docker-compose.prod.yml ps

# Show logs
echo -e "${YELLOW}📋 Recent logs (last 10 lines):${NC}"
docker-compose -f docker-compose.prod.yml logs --tail=10

echo -e "${GREEN}✅ Deployment script completed!${NC}"
echo -e "${YELLOW}💡 Useful commands:${NC}"
echo -e "${YELLOW}   View logs: docker-compose -f docker-compose.prod.yml logs -f${NC}"
echo -e "${YELLOW}   Stop services: docker-compose -f docker-compose.prod.yml down${NC}"
echo -e "${YELLOW}   Restart services: docker-compose -f docker-compose.prod.yml restart${NC}"
