@echo off
echo ========================================
echo Vercel Deployment Pre-Check Script
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    exit /b 1
)
echo ✓ Node.js is installed
echo.

echo [2/5] Checking frontend dependencies...
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✓ Frontend dependencies already installed
)
cd ..
echo.

echo [3/5] Checking backend dependencies...
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✓ Backend dependencies already installed
)
cd ..
echo.

echo [4/5] Building frontend for production...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed!
    cd ..
    exit /b 1
)
echo ✓ Frontend build successful
cd ..
echo.

echo [5/5] Checking environment files...
if exist "frontend\.env" (
    echo ✓ Frontend .env file found
) else (
    echo WARNING: frontend\.env file not found
    echo Please create it based on frontend\.env.example
)

if exist "backend\.env" (
    echo ✓ Backend .env file found
) else (
    echo WARNING: backend\.env file not found
    echo Please ensure environment variables are set in Vercel
)
echo.

echo ========================================
echo Pre-Check Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Set environment variables in Vercel dashboard
echo 2. Run: vercel --prod
echo 3. Or push to GitHub and deploy via Vercel integration
echo.
echo For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.

pause
