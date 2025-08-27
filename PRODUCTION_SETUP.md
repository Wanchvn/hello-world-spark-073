# 🚀 Production Setup Guide

This guide will walk you through setting up your application for production deployment. Follow these steps carefully to get your app running in production.

## 📋 Prerequisites

Before you start, ensure you have:

- [ ] A domain name (e.g., `yourdomain.com`)
- [ ] A server/VPS with Ubuntu 20.04+ or similar
- [ ] Docker and Docker Compose installed
- [ ] SSH access to your server
- [ ] Basic knowledge of Linux commands

## 🏗️ Step 1: Server Setup

### 1.1 Connect to Your Server

```bash
ssh username@your-server-ip
```

### 1.2 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.3 Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes to take effect
exit
# SSH back in
```

### 1.4 Install Additional Tools

```bash
# Install certbot for SSL certificates
sudo apt install -y certbot

# Install curl for health checks
sudo apt install -y curl

# Install git
sudo apt install -y git
```

## 🌐 Step 2: Domain Configuration

### 2.1 DNS Setup

In your domain registrar's DNS settings, add these records:

```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP

Type: A
Name: api
Value: YOUR_SERVER_IP
```

### 2.2 Wait for DNS Propagation

DNS changes can take up to 48 hours to propagate globally. You can check propagation using:

```bash
nslookup yourdomain.com
nslookup www.yourdomain.com
nslookup api.yourdomain.com
```

## 📁 Step 3: Application Deployment

### 3.1 Clone Your Repository

```bash
# Create app directory
mkdir -p /opt/myapp
cd /opt/myapp

# Clone your repository
git clone https://github.com/yourusername/your-repo.git .
```

### 3.2 Set Up Environment Variables

```bash
# Copy environment template
cp env.example .env

# Edit environment file
nano .env
```

Fill in your actual values:

```env
# App Configuration
NODE_ENV=production
APP_NAME=Your App Name
APP_VERSION=1.0.0

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Security
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long-here
SESSION_SECRET=another-super-secret-key-for-sessions-at-least-32-characters
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3.3 Set Up SSL Certificates

```bash
# Stop any services using port 80/443
sudo systemctl stop nginx
sudo systemctl stop apache2

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Create ssl directory
mkdir -p ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/

# Set proper permissions
sudo chown $USER:$USER ssl/*
```

### 3.4 Update Configuration Files

```bash
# Replace placeholder domain in nginx config
sed -i "s/yourdomain.com/yourdomain.com/g" nginx.prod.conf

# Replace placeholder domain in docker-compose
sed -i "s/yourdomain.com/yourdomain.com/g" docker-compose.prod.yml
```

### 3.5 Build and Deploy

```bash
# Make deployment script executable
chmod +x deploy-prod.sh

# Run deployment script
./deploy-prod.sh yourdomain.com admin@yourdomain.com
```

## 🔒 Step 3: Security Hardening

### 3.1 Firewall Configuration

```bash
# Install UFW
sudo apt install -y ufw

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000

# Enable firewall
sudo ufw enable
```

### 3.2 SSL Auto-Renewal

```bash
# Set up auto-renewal cron job
sudo crontab -e

# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet && cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/myapp/ssl/ && cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/myapp/ssl/ && docker-compose -f /opt/myapp/docker-compose.prod.yml restart nginx
```

### 3.3 Regular Security Updates

```bash
# Create security update script
cat > /opt/myapp/security-update.sh << 'EOF'
#!/bin/bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
docker system prune -f
EOF

chmod +x /opt/myapp/security-update.sh

# Add to crontab (weekly updates)
sudo crontab -e
# Add: 0 2 * * 0 /opt/myapp/security-update.sh
```

## 📊 Step 4: Monitoring Setup

### 4.1 Health Check Monitoring

```bash
# Create monitoring script
cat > /opt/myapp/monitor.sh << 'EOF'
#!/bin/bash

LOG_FILE="/opt/myapp/logs/health.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Check backend health
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "[$DATE] ✅ Backend is healthy" >> $LOG_FILE
else
    echo "[$DATE] ❌ Backend health check failed" >> $LOG_FILE
    # Restart backend
    docker-compose -f /opt/myapp/docker-compose.prod.yml restart backend
fi

# Check frontend health
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "[$DATE] ✅ Frontend is healthy" >> $LOG_FILE
else
    echo "[$DATE] ❌ Frontend health check failed" >> $LOG_FILE
    # Restart frontend
    docker-compose -f /opt/myapp/docker-compose.prod.yml restart frontend
fi

# Check nginx health
if curl -f http://localhost:80 > /dev/null 2>&1; then
    echo "[$DATE] ✅ Nginx is healthy" >> $LOG_FILE
else
    echo "[$DATE] ❌ Nginx health check failed" >> $LOG_FILE
    # Restart nginx
    docker-compose -f /opt/myapp/docker-compose.prod.yml restart nginx
fi

# Log rotation (keep last 1000 lines)
tail -n 1000 $LOG_FILE > $LOG_FILE.tmp && mv $LOG_FILE.tmp $LOG_FILE
EOF

chmod +x /opt/myapp/monitor.sh

# Add to crontab (every 5 minutes)
sudo crontab -e
# Add: */5 * * * * /opt/myapp/monitor.sh
```

### 4.2 Log Management

```bash
# Create log rotation config
sudo tee /etc/logrotate.d/myapp << EOF
/opt/myapp/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        docker-compose -f /opt/myapp/docker-compose.prod.yml restart nginx
    endscript
}
EOF
```

## 🚀 Step 5: CI/CD Setup

### 5.1 GitHub Actions Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

- `RAILWAY_TOKEN` - Get from Railway dashboard
- `VERCEL_TOKEN` - Get from Vercel dashboard
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub password

### 5.2 Railway Setup

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Link to existing project
railway link
```

### 5.3 Vercel Setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Initialize project
vercel
```

## 🔄 Step 6: Backup Strategy

### 6.1 Database Backup

```bash
# Create backup script
cat > /opt/myapp/backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/opt/myapp/backups"
DATE=$(date '+%Y%m%d_%H%M%S')

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database (adjust for your database type)
# PostgreSQL example:
# docker exec -t myapp-backend pg_dumpall -c -U postgres > $BACKUP_DIR/db_backup_$DATE.sql

# Backup application files
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=logs \
    --exclude=backups \
    .

# Keep only last 7 backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /opt/myapp/backup.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
# Add: 0 2 * * * /opt/myapp/backup.sh
```

## 🧪 Step 7: Testing Your Deployment

### 7.1 Health Checks

```bash
# Test backend health
curl -f http://localhost:5000/api/health

# Test frontend
curl -f http://localhost:3000

# Test nginx
curl -f http://localhost:80

# Test SSL
curl -f https://yourdomain.com
```

### 7.2 Load Testing

```bash
# Install Apache Bench
sudo apt install -y apache2-utils

# Test backend API
ab -n 100 -c 10 http://localhost:5000/api/health

# Test frontend
ab -n 100 -c 10 http://localhost:3000
```

## 🚨 Step 8: Troubleshooting

### 8.1 Common Issues

**SSL Certificate Issues:**
```bash
# Check certificate validity
openssl x509 -in ssl/fullchain.pem -text -noout

# Renew certificates manually
sudo certbot renew
```

**Container Issues:**
```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Restart services
docker-compose -f docker-compose.prod.yml restart
```

**Port Conflicts:**
```bash
# Check what's using ports
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
sudo netstat -tlnp | grep :5000
```

### 8.2 Performance Issues

```bash
# Check resource usage
docker stats

# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top
```

## 📈 Step 9: Scaling Considerations

### 9.1 Database Scaling

```bash
# Install Redis for caching
sudo apt install -y redis-server

# Configure Redis
sudo nano /etc/redis/redis.conf

# Add to docker-compose.prod.yml
# redis:
#   image: redis:alpine
#   container_name: redis
#   restart: unless-stopped
#   networks:
#     - app-network
```

### 9.2 Load Balancing

```bash
# Install HAProxy
sudo apt install -y haproxy

# Configure HAProxy for multiple backend instances
sudo nano /etc/haproxy/haproxy.cfg
```

## 🎯 Next Steps

1. **Set up monitoring tools:**
   - Prometheus + Grafana
   - ELK Stack (Elasticsearch, Logstash, Kibana)
   - Sentry for error tracking

2. **Implement CDN:**
   - Cloudflare (free tier available)
   - AWS CloudFront
   - Azure CDN

3. **Add database clustering:**
   - PostgreSQL with read replicas
   - MongoDB with sharding
   - Redis cluster

4. **Set up alerting:**
   - Email notifications
   - Slack/Discord webhooks
   - PagerDuty integration

## 📚 Additional Resources

- [Docker Production Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Ubuntu Server Security](https://ubuntu.com/server/docs/security)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## 🆘 Getting Help

If you encounter issues:

1. Check the logs: `docker-compose -f docker-compose.prod.yml logs -f`
2. Verify configuration files
3. Check system resources
4. Consult the troubleshooting section above
5. Search for solutions online
6. Ask for help in relevant communities

---

**⚠️ Important Notes:**

- Always test in staging before deploying to production
- Keep your system updated regularly
- Monitor your application continuously
- Have a backup and recovery plan
- Document any custom configurations
- Test your disaster recovery procedures

Good luck with your production deployment! 🚀
