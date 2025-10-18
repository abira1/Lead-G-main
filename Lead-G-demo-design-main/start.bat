@echo off
title Lead G Application Startup

echo 🚀 Starting Lead G Application...
echo ================================

REM Check if we're in the right directory
if not exist "backend" (
    echo ❌ Error: Please run this script from the project root directory
    echo    Expected structure: .\backend\ and .\frontend\
    pause
    exit /b 1
)
if not exist "frontend" (
    echo ❌ Error: Please run this script from the project root directory
    echo    Expected structure: .\backend\ and .\frontend\
    pause
    exit /b 1
)

REM Check if Python virtual environment exists
if not exist "backend\venv" (
    echo ⚠️  Python virtual environment not found. Creating one...
    cd backend
    python -m venv venv
    cd ..
)

echo 🔍 Checking requirements...

REM Start backend in a new window
echo 🐍 Starting Backend (FastAPI)...
cd backend

REM Check if Firebase credentials exist
if not exist "firebase-credentials.json" (
    echo ⚠️  Firebase credentials not found!
    echo    Please add your firebase-credentials.json file to the backend\ directory
    echo    Or set FIREBASE_PROJECT_ID in backend\.env to use default credentials
)

start "Lead G Backend" cmd /k "venv\Scripts\activate && pip install -r requirements.txt >nul 2>&1 && echo ✅ Backend dependencies installed && echo 🚀 Starting backend server... && python server.py"

cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new window
echo ⚛️  Starting Frontend (React)...
cd frontend

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    call yarn install
)

start "Lead G Frontend" cmd /k "echo ✅ Frontend dependencies ready && echo 🚀 Starting React development server... && yarn start"

cd ..

REM Wait for servers to start
timeout /t 5 /nobreak >nul

echo.
echo 🎉 Lead G Application is starting!
echo ================================
echo 🌐 Frontend:     http://localhost:3000
echo 🔧 Backend API:  http://localhost:8001
echo 📚 API Docs:     http://localhost:8001/docs
echo.
echo ℹ️  Both services are opening in separate command windows
echo ⏹️  Close the command windows to stop the services
echo.
echo 📖 Check the README.md file for detailed instructions
echo ✅ Startup script completed!

pause