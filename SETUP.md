# 🚀 Lead G - Complete Setup Guide

This guide will walk you through setting up the Lead G application on your local machine in just a few minutes.

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- [ ] **Node.js 16+** - [Download here](https://nodejs.org/)
- [ ] **Python 3.8+** - [Download here](https://python.org/)
- [ ] **Yarn** - Install with: `npm install -g yarn`
- [ ] **Firebase Account** - [Create here](https://firebase.google.com/)
- [ ] **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

## 🔥 Firebase Setup (5 minutes)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `lead-g-app` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

### 2. Enable Firestore Database

1. In your Firebase project, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your preferred location
5. Click "Done"

### 3. Get Service Account Credentials

1. Go to "Project Settings" (gear icon) → "Service accounts"
2. Click "Generate new private key"
3. Click "Generate key" to download the JSON file
4. Rename the downloaded file to `firebase-credentials.json`
5. Copy this file to the `backend/` folder

### 4. Note Your Project ID

- Copy your Firebase Project ID from the "General" tab in Project Settings
- You'll need this for the configuration

## ⚡ Super Quick Setup (2 commands)

If you want to get started immediately:

### Option A: Automatic Setup (macOS/Linux)
```bash
# Make the script executable and run it
chmod +x start.sh
./start.sh
```

### Option B: Automatic Setup (Windows)
```batch
# Double-click the start.bat file or run:
start.bat
```

**That's it!** The script will:
- Create Python virtual environment
- Install all dependencies
- Start both backend and frontend
- Open your browser automatically

## 🛠️ Manual Setup (Step by Step)

If you prefer manual setup or the automatic script doesn't work:

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Update Firebase configuration in .env file
# Edit backend/.env and set your FIREBASE_PROJECT_ID
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node.js dependencies
yarn install

# The .env file is already configured for local development
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python server.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn start
```

## 🌐 Access Your Application

After startup, your application will be available at:

- **🌐 Frontend**: http://localhost:3000
- **🔧 Backend API**: http://localhost:8001
- **📚 API Documentation**: http://localhost:8001/docs
- **📖 Alternative API Docs**: http://localhost:8001/redoc

## ✅ Verify Everything Works

### 1. Test the Frontend
- Visit http://localhost:3000
- Navigate through different pages (Home, About, Contact)
- Test dropdown menus (Services, Industries)
- Try mobile responsive design

### 2. Test the Backend
- Visit http://localhost:8001/docs
- Try the "GET /" endpoint to test basic functionality
- Check the health endpoint: "GET /health"

### 3. Test the Integration
- Fill out the contact form on the frontend
- Check if the form submits successfully
- Verify data appears in Firebase Console → Firestore Database

## 🔧 Configuration

### Environment Variables

**Backend (backend/.env):**
```env
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CREDENTIALS_PATH=firebase-credentials.json
CORS_ORIGINS=http://localhost:3000
ENVIRONMENT=development
DEBUG=True
```

**Frontend (frontend/.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_ENVIRONMENT=development
```

## 🎯 Project Structure

```
lead-g-app/
├── 📁 backend/                 # FastAPI backend
│   ├── config.py              # Configuration
│   ├── database.py            # Firebase setup
│   ├── models.py              # Data models
│   ├── server.py              # Main API server
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── firebase-credentials.json # Firebase key
├── 📁 frontend/               # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/     # React components
│   │   ├── 📁 services/       # API services
│   │   └── App.js             # Main app
│   ├── package.json           # Node dependencies
│   └── .env                   # Environment variables
├── 📄 README.md               # Main documentation
├── 📄 SETUP.md                # This setup guide
├── 🚀 start.sh                # Auto-start script (Unix)
└── 🚀 start.bat               # Auto-start script (Windows)
```

## 🆘 Troubleshooting

### Common Issues and Solutions

#### **"Firebase credentials not found"**
```bash
# Solution: Ensure firebase-credentials.json is in backend/ folder
# Or set FIREBASE_PROJECT_ID in backend/.env for default credentials
```

#### **"Port already in use"**
```bash
# Kill processes using the ports
# Backend (port 8001):
lsof -ti:8001 | xargs kill -9
# Frontend (port 3000):
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :8001
taskkill /F /PID <PID>
```

#### **"Module not found" errors**
```bash
# Backend:
cd backend
source venv/bin/activate
pip install -r requirements.txt

# Frontend:
cd frontend
rm -rf node_modules yarn.lock
yarn install
```

#### **CORS errors in browser console**
```bash
# Check that backend/.env has:
CORS_ORIGINS=http://localhost:3000

# And frontend/.env has:
REACT_APP_BACKEND_URL=http://localhost:8001
```

#### **Firebase connection errors**
```bash
# Verify:
# 1. firebase-credentials.json is in backend/ folder
# 2. FIREBASE_PROJECT_ID matches your Firebase project
# 3. Firestore is enabled in Firebase Console
```

### Getting Help

1. **Check the logs** in your terminal windows
2. **Visit API docs** at http://localhost:8001/docs
3. **Check browser console** for frontend errors
4. **Verify environment variables** in both .env files

## 🎨 Development Tips

### VS Code Extensions (Recommended)

Install these for the best development experience:

```bash
# For Python
Python
Pylance

# For React/JavaScript
ES7+ React/Redux/React-Native snippets
Auto Rename Tag
Prettier - Code formatter

# General
Thunder Client (API testing)
GitLens
```

### Code Formatting

```bash
# Backend (Python)
cd backend
black .
isort .

# Frontend (JavaScript)
cd frontend
yarn format
```

### Hot Reload

Both services support hot reload:
- **Backend**: Automatically reloads when you save Python files
- **Frontend**: Automatically reloads when you save React files

## 🚀 Next Steps

Now that you have the application running:

1. **Explore the codebase** - Check out the well-documented components
2. **Customize the design** - Modify colors, fonts, and layouts
3. **Add new features** - Use the existing patterns as a guide
4. **Deploy to production** - Check the deployment guides in README.md

## 📝 Need Help?

- 📖 **Full Documentation**: [README.md](README.md)
- 🔧 **Backend Guide**: [backend/README.md](backend/README.md)
- ⚛️ **Frontend Guide**: [frontend/README.md](frontend/README.md)
- 🌐 **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)

---

**🎉 Happy Coding!** If you encounter any issues, check the troubleshooting section above or refer to the detailed documentation.