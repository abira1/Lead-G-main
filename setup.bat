@echo off
REM ==================================================================
REM Lead G - Automated Setup Script for Windows
REM ==================================================================
REM This script automates the setup process for Lead G application
REM Run by double-clicking or: setup.bat
REM ==================================================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Lead G - Setup Script (Windows)
echo ========================================
echo.

REM Check Node.js
echo [1/5] Checking Prerequisites...
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found. Please install Node.js v16+ from https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js installed: !NODE_VERSION!
)

REM Check Yarn
where yarn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Yarn not found. Installing Yarn...
    call npm install -g yarn
    echo [OK] Yarn installed
) else (
    for /f "tokens=*" %%i in ('yarn --version') do set YARN_VERSION=%%i
    echo [OK] Yarn installed: v!YARN_VERSION!
)

REM Check Python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python not found. Please install Python 3.10+ from https://www.python.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
    echo [OK] Python installed: !PYTHON_VERSION!
)

REM Check pip
where pip >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] pip not found. Please install pip
    pause
    exit /b 1
) else (
    echo [OK] pip installed
)

echo.
echo ========================================
echo [2/5] Setting Up Backend
echo ========================================
echo.

cd backend

REM Create virtual environment
echo Creating Python virtual environment...
python -m venv venv
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to create virtual environment
    pause
    exit /b 1
)
echo [OK] Virtual environment created

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip --quiet
echo [OK] pip upgraded

REM Install dependencies
echo Installing Python dependencies (this may take a few minutes)...
pip install -r requirements.txt --quiet
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install Python dependencies
    pause
    exit /b 1
)
echo [OK] Python dependencies installed

REM Create .env file
if not exist .env (
    echo Creating backend .env file from template...
    copy .env.example .env >nul
    echo [WARNING] Please edit backend\.env with your configuration
) else (
    echo [INFO] Backend .env file already exists
)

cd ..

echo.
echo ========================================
echo [3/5] Setting Up Frontend
echo ========================================
echo.

cd frontend

REM Install Node dependencies
echo Installing Node.js dependencies (this may take a few minutes)...
call yarn install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo [OK] Node.js dependencies installed

REM Create .env file
if not exist .env (
    echo Creating frontend .env file from template...
    copy .env.example .env >nul
    echo [OK] Frontend .env file created
) else (
    echo [INFO] Frontend .env file already exists
)

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo [OK] Backend and Frontend setup completed successfully!
echo.
echo Next Steps:
echo.
echo 1. Configure Firebase:
echo    - Create Firebase project at https://console.firebase.google.com/
echo    - Enable Firestore Database
echo    - Download service account key
echo    - Update backend\.env with Firebase credentials
echo.
echo 2. Start the Backend:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python server.py
echo.
echo 3. Start the Frontend (in new terminal):
echo    cd frontend
echo    yarn start
echo.
echo 4. Access the application:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8001
echo    API Docs: http://localhost:8001/docs
echo.
echo [WARNING] Don't forget to configure your .env files!
echo.
echo For detailed documentation, see DEPLOYMENT_GUIDE.md
echo.

pause
