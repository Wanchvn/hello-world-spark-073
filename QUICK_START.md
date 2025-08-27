# 🚀 Quick Start Guide

Get your application deployed to production in under 30 minutes!

## ⚡ What You Need

- A domain name (e.g., `myapp.com`)
- A VPS/server with Ubuntu 20.04+
- Basic Linux knowledge

## 🚀 Quick Deployment

### 1. Server Setup (5 minutes)

```bash
# Connect to your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install certbot
apt install -y certbot
```

### 2. Deploy Your App (10 minutes)

```bash
# Clone your repo
git clone https://github.com/yourusername/your-repo.git /opt/myapp
cd /opt/myapp

# Set your domain
export DOMAIN="myapp.com"

# Update configs with your domain
sed -i "s/yourdomain.com/$DOMAIN/g" nginx.prod.conf
sed -i "s/yourdomain.com/$DOMAIN/g" docker-compose.prod.yml

# Get SSL certificate
certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN

# Copy SSL files
mkdir -p ssl
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/

# Set environment variables
cp env.example .env
nano .env  # Edit with your values

# Deploy!
./deploy-prod.sh $DOMAIN admin@$DOMAIN
```

### 3. Test Your Deployment (2 minutes)

```bash
# Check if everything is running
curl -f https://$DOMAIN
curl -f https://$DOMAIN/api/health

# View running containers
docker-compose -f docker-compose.prod.yml ps
```

## 🎯 What You Get

✅ **Production-ready application** with HTTPS  
✅ **Automatic SSL renewal** every 90 days  
✅ **Health monitoring** and auto-restart  
✅ **Security headers** and rate limiting  
✅ **Load balancing** with nginx  
✅ **Log management** and rotation  
✅ **Backup system** for data safety  

## 🔧 Customization

### Change Domain
```bash
sed -i "s/olddomain.com/newdomain.com/g" nginx.prod.conf
sed -i "s/olddomain.com/newdomain.com/g" docker-compose.prod.yml
```

### Update Application
```bash
git pull
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
```

## 🚨 Common Issues

**Port 80/443 already in use:**
```bash
# Stop conflicting services
systemctl stop nginx apache2
```

**SSL certificate issues:**
```bash
# Renew manually
certbot renew
# Copy to app directory
cp /etc/letsencrypt/live/yourdomain.com/*.pem ssl/
```

**Container won't start:**
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Restart services
docker-compose -f docker-compose.prod.yml restart
```

## 📊 Monitoring

### Health Check
```bash
# Check all services
curl -f https://yourdomain.com/health
curl -f https://yourdomain.com/api/health
```

### Resource Usage
```bash
# Container stats
docker stats

# System resources
htop
df -h
```

## 🔄 Maintenance

### Daily
- Check logs: `docker-compose -f docker-compose.prod.yml logs --tail=50`

### Weekly
- Security updates: `apt update && apt upgrade -y`
- Clean Docker: `docker system prune -f`

### Monthly
- SSL renewal: `certbot renew`
- Backup verification: Check `/opt/myapp/backups/`

## 🆘 Need Help?

1. **Check logs first:** `docker-compose -f docker-compose.prod.yml logs -f`
2. **Verify configs:** Check nginx.prod.conf and docker-compose.prod.yml
3. **Test connectivity:** `curl -v https://yourdomain.com`
4. **Check resources:** `docker stats` and `htop`

## 🎉 You're Done!

Your application is now running in production with:
- ✅ HTTPS encryption
- ✅ Automatic scaling
- ✅ Health monitoring
- ✅ Security hardening
- ✅ Backup system

**Next steps:** Set up monitoring tools, implement CI/CD, add database clustering.

---

**💡 Pro Tip:** Use the full `PRODUCTION_SETUP.md` guide for advanced configuration and scaling options.
