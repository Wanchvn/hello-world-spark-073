@echo off
echo 🚀 Setting up GitHub Repository with Deployment Configs...

echo.
echo 📋 Checking prerequisites...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git not found. Please install Git first.
    pause
    exit /b 1
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

echo.
echo 🔧 Setting up Git repository...
if not exist .git (
    echo Initializing Git repository...
    git init
    echo Adding all files...
    git add .
    echo Making initial commit...
    git commit -m "Initial commit: Frontend-Backend with deployment configs"
    echo.
    echo 📝 Please enter your GitHub repository URL:
    set /p repo_url="Repository URL (e.g., https://github.com/username/repo-name.git): "
    echo.
    echo Adding remote origin...
    git remote add origin %repo_url%
    echo.
    echo 🚀 Pushing to GitHub...
    git push -u origin main
    if %errorlevel% neq 0 (
        echo.
        echo ⚠️  Push failed. You may need to:
        echo    1. Create the repository on GitHub first
        echo    2. Set up authentication (Personal Access Token)
        echo    3. Check your repository URL
        echo.
        echo 🔗 Create repository at: https://github.com/new
        echo 🔑 Set up token at: https://github.com/settings/tokens
    )
) else (
    echo ✅ Git repository already exists
    echo.
    echo 📊 Current status:
    git status
)

echo.
echo 📚 Next steps:
echo    1. Go to your GitHub repository
echo    2. Set up GitHub Secrets (RAILWAY_TOKEN, VERCEL_TOKEN)
echo    3. Enable GitHub Actions
echo    4. Check the GITHUB_SETUP.md file for detailed instructions
echo.
echo 🔗 GitHub repository setup complete!
echo.
pause
