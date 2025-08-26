#!/bin/bash

echo "🚀 Deploying to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Deploy backend
echo "📦 Deploying backend..."
cd backend
railway up --service backend

# Deploy frontend
echo "🌐 Deploying frontend..."
cd ..
railway up --service frontend

echo "✅ Deployment complete!"
echo "🔗 Check your Railway dashboard for the deployed URLs"
