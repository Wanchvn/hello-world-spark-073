# 🚀 Quick Start - Local Development

## ⚡ Get Running in 2 Minutes!

### 1. **Start Your App**
```bash
# Windows - Double click this file:
start-local.bat

# Or run in Command Prompt:
start-local.bat
```

### 2. **Open Your Browser**
Your app will automatically open at: **http://localhost:3000**

## 🌐 What You Get

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health
- **Users API:** http://localhost:5000/api/users
- **Posts API:** http://localhost:5000/api/posts

## 🔧 Test Everything Works

```bash
# Run this to test all endpoints:
test-local.bat
```

## 🚨 If Something Goes Wrong

### Docker Not Running?
1. Start Docker Desktop
2. Wait for it to fully start
3. Try `start-local.bat` again

### Ports Already in Use?
```bash
# Stop everything and restart
docker-compose -f docker-compose.local.yml down
start-local.bat
```

### Services Won't Start?
```bash
# Check logs
docker-compose -f docker-compose.local.yml logs

# Rebuild everything
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up --build -d
```

## 💡 Useful Commands

```bash
# View logs
docker-compose -f docker-compose.local.yml logs -f

# Stop services
docker-compose -f docker-compose.local.yml down

# Restart services
docker-compose -f docker-compose.local.yml restart
```

## 🎯 What's Happening

1. **Backend** starts on port 5000 with hot reloading
2. **Frontend** starts on port 3000 with hot reloading
3. **Docker** manages everything automatically
4. **Changes** to your code automatically refresh

## 🆘 Still Stuck?

1. Check the full `LOCAL_DEVELOPMENT.md` guide
2. Make sure Docker Desktop is running
3. Check if ports 3000 and 5000 are free
4. Try restarting Docker Desktop

---

**🎉 You're ready to develop!** Make changes to your code and see them instantly in the browser.
