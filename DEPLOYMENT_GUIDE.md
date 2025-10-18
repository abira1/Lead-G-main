# 🚀 Lead G - Local Deployment Guide

Complete guide for setting up and running the Lead G application on your local machine.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [System Requirements](#system-requirements)
3. [Project Structure](#project-structure)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Firebase Configuration](#firebase-configuration)
7. [Running the Application](#running-the-application)
8. [Troubleshooting](#troubleshooting)
9. [Development Commands](#development-commands)
10. [Production Deployment](#production-deployment)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v16.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Recommended: v20.x LTS

2. **Yarn** (v1.22.0 or higher)
   - Install globally: `npm install -g yarn`
   - Verify installation: `yarn --version`

3. **Python** (v3.10 or higher)
   - Download from: https://www.python.org/downloads/
   - Verify installation: `python3 --version`
   - Recommended: Python 3.11.x

4. **pip** (Python package manager)
   - Usually comes with Python
   - Verify installation: `pip3 --version`

5. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

---

## 💻 System Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free space
- **Internet Connection**: Required for initial setup and dependencies

---

## 📁 Project Structure

```
lead-g/
├── Lead-G-demo-design-main/
│   ├── backend/           # FastAPI backend application
│   │   ├── server.py      # Main FastAPI application
│   │   ├── requirements.txt  # Python dependencies
│   │   ├── .env.example   # Environment variables template
│   │   └── ...
│   └── frontend/          # React frontend application
│       ├── src/           # React source code
│       ├── public/        # Static assets
│       ├── package.json   # Node.js dependencies
│       ├── .env.example   # Environment variables template
│       └── ...
├── backend -> Lead-G-demo-design-main/backend  # Symlink
├── frontend -> Lead-G-demo-design-main/frontend  # Symlink
└── DEPLOYMENT_GUIDE.md    # This file
```

---

## 🐍 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd /path/to/your/project/backend
```

### Step 2: Create Python Virtual Environment

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt.

### Step 3: Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

This will install:
- FastAPI 0.115.6
- Uvicorn 0.34.0
- Firebase Admin SDK 6.5.0
- Pydantic 2.10.5
- And all other required packages

### Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your configuration:
   ```bash
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CREDENTIALS_PATH=/path/to/your/firebase-credentials.json
   
   # CORS Configuration
   CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   
   # MongoDB Configuration (if using MongoDB)
   MONGO_URL=mongodb://localhost:27017/leadg
   
   # Environment
   ENVIRONMENT=development
   DEBUG=True
   ```

### Step 5: Verify Backend Installation

```bash
python server.py
```

You should see:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8001
```

Stop the server with `Ctrl+C`.

---

## ⚛️ Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd /path/to/your/project/frontend
```

### Step 2: Install Node Dependencies

```bash
yarn install
```

This will install all dependencies listed in `package.json`:
- React 18.3.1
- React Router DOM 6.26.2
- Framer Motion 12.23.13
- Lucide React 0.507.0
- Tailwind CSS 3.4.17
- And all other required packages

**Note:** Installation may take 3-5 minutes depending on your internet connection.

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file:
   ```bash
   # Backend API URL
   REACT_APP_BACKEND_URL=http://localhost:8001
   
   # Environment
   REACT_APP_ENVIRONMENT=development
   ```

### Step 4: Verify Frontend Installation

```bash
yarn start
```

The browser should automatically open at `http://localhost:3000`.

Stop the server with `Ctrl+C`.

---

## 🔥 Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Follow the setup wizard

### Step 2: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create Database"
3. Choose production mode or test mode
4. Select a region closest to you

### Step 3: Generate Service Account Key

1. Go to Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download the JSON file
4. Save it as `firebase-credentials.json` in your backend directory

### Step 4: Update Backend .env File

```bash
FIREBASE_PROJECT_ID=your-actual-project-id
FIREBASE_CREDENTIALS_PATH=/path/to/backend/firebase-credentials.json
```

**Security Note:** Never commit `firebase-credentials.json` to version control!

---

## 🏃 Running the Application

### Option 1: Run Both Services Manually

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python server.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn start
```

### Option 2: Using Supervisor (Production-like Environment)

If supervisor is configured (typically in deployment environment):
```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs

---

## 🔍 Troubleshooting

### Issue: Port Already in Use

**Backend (Port 8001):**
```bash
# Find process using port 8001
lsof -i :8001  # macOS/Linux
netstat -ano | findstr :8001  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

**Frontend (Port 3000):**
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Issue: Module Not Found (Backend)

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: Module Not Found (Frontend)

```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install

# Clear cache
yarn cache clean
```

### Issue: CORS Errors

1. Check backend `.env` file has correct CORS origins
2. Restart backend server
3. Clear browser cache

### Issue: Firebase Connection Error

1. Verify `FIREBASE_PROJECT_ID` is correct
2. Check `firebase-credentials.json` path
3. Ensure Firestore is enabled in Firebase Console
4. Verify service account has necessary permissions

### Issue: Build Failures

**Backend:**
```bash
# Upgrade pip
pip install --upgrade pip

# Install dependencies one by one to identify issue
pip install fastapi
pip install uvicorn
# ... continue with each package
```

**Frontend:**
```bash
# Clear cache and reinstall
yarn cache clean
rm -rf node_modules
yarn install
```

---

## 🛠️ Development Commands

### Backend Commands

```bash
# Run development server
python server.py

# Run tests
pytest

# Format code
black .

# Sort imports
isort .

# Lint code
flake8 .

# Type checking
mypy .
```

### Frontend Commands

```bash
# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Check for outdated packages
yarn outdated
```

---

## 🚀 Production Deployment

### Backend Production Build

1. **Set environment variables:**
   ```bash
   ENVIRONMENT=production
   DEBUG=False
   ```

2. **Use production ASGI server:**
   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
   ```

3. **Use process manager (PM2, Supervisor, systemd):**
   ```bash
   # Example with uvicorn
   gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### Frontend Production Build

1. **Build the application:**
   ```bash
   yarn build
   ```

2. **Serve static files:**
   ```bash
   # Using serve package
   npm install -g serve
   serve -s build -p 3000
   
   # Or using nginx, Apache, etc.
   ```

3. **Update environment variables:**
   ```bash
   REACT_APP_BACKEND_URL=https://your-api-domain.com
   REACT_APP_ENVIRONMENT=production
   ```

---

## 📦 Dependency Versions

### Backend (Python)

- **FastAPI**: 0.115.6
- **Uvicorn**: 0.34.0
- **Firebase Admin**: 6.5.0
- **Pydantic**: 2.10.5
- **Python**: 3.11+ recommended

### Frontend (Node.js)

- **React**: 18.3.1
- **React Router DOM**: 6.26.2
- **Framer Motion**: 12.23.13
- **Tailwind CSS**: 3.4.17
- **Node.js**: 16.0+ (20.x recommended)
- **Yarn**: 1.22.0+

---

## 🔐 Security Best Practices

1. **Never commit sensitive files:**
   - `.env` files
   - `firebase-credentials.json`
   - API keys

2. **Use environment variables** for all configuration

3. **Keep dependencies updated:**
   ```bash
   # Backend
   pip list --outdated
   
   # Frontend
   yarn outdated
   ```

4. **Enable HTTPS** in production

5. **Configure CORS** properly (restrict origins in production)

6. **Use secure session management** for authentication

---

## 📞 Support & Resources

- **Firebase Documentation**: https://firebase.google.com/docs
- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **React Documentation**: https://react.dev/
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs

---

## 📝 Notes

- **Hot Reload**: Both frontend and backend support hot reload in development
- **API Prefix**: All backend routes use `/api` prefix for proper routing
- **Database**: Application uses Firebase Firestore (NoSQL database)
- **Styling**: Uses Tailwind CSS with Glass Morphism design pattern

---

## ✅ Quick Start Checklist

- [ ] Install Node.js (v16+)
- [ ] Install Python (v3.10+)
- [ ] Install Yarn
- [ ] Clone/download project
- [ ] Create Python virtual environment
- [ ] Install backend dependencies (`pip install -r requirements.txt`)
- [ ] Install frontend dependencies (`yarn install`)
- [ ] Setup Firebase project
- [ ] Download Firebase credentials
- [ ] Configure backend `.env` file
- [ ] Configure frontend `.env` file
- [ ] Start backend server (`python server.py`)
- [ ] Start frontend server (`yarn start`)
- [ ] Access application at http://localhost:3000

---

## 🎉 Success!

If you can access the application at `http://localhost:3000` and see the Lead G homepage, congratulations! Your local setup is complete.

For any issues or questions, refer to the [Troubleshooting](#troubleshooting) section above.

Happy coding! 🚀
