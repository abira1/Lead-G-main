# Lead G - Modern Lead Generation Platform

A modern, scalable lead generation platform built with React (frontend) and FastAPI (backend) using Firebase Firestore as the database.

## 🚀 Features

- **Modern UI/UX**: Built with React 18 and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Glass Morphism Design**: Modern glass box effects and animations
- **Firebase Backend**: Scalable Firestore database
- **RESTful API**: Clean FastAPI backend with automatic documentation
- **Contact Forms**: Advanced contact form handling
- **Status Tracking**: Real-time status check system
- **SEO Optimized**: Proper routing and meta tags

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern Python web framework
- **Firebase Admin SDK** - Database and authentication
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

### Database
- **Firebase Firestore** - NoSQL document database

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **Yarn package manager** - `npm install -g yarn`
- **Firebase account** - [Create here](https://firebase.google.com/)

## 🔧 Quick Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd lead-g-platform
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Go to Project Settings > Service Accounts
5. Generate a new private key (downloads JSON file)
6. Save the JSON file as `firebase-credentials.json` in the `backend/` folder

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file from example
cp .env.example .env

# Edit .env file with your Firebase configuration
# FIREBASE_PROJECT_ID=your-project-id
# FIREBASE_CREDENTIALS_PATH=firebase-credentials.json
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
yarn install

# Create environment file from example
cp .env.example .env

# Edit .env file if needed (defaults should work)
# REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🚀 Running the Application

You need to run both frontend and backend servers simultaneously.

### Option 1: Manual Start (Recommended for Development)

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

### Option 2: Quick Start Script

Create a start script for your OS:

**For macOS/Linux (`start.sh`):**
```bash
#!/bin/bash
# Start backend in background
cd backend && source venv/bin/activate && python server.py &

# Start frontend
cd frontend && yarn start
```

**For Windows (`start.bat`):**
```batch
@echo off
start cmd /k "cd backend && venv\Scripts\activate && python server.py"
timeout /t 3
cd frontend && yarn start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs
- **Alternative API Docs**: http://localhost:8001/redoc

## 📂 Project Structure

```
lead-g-platform/
├── backend/
│   ├── config.py              # Configuration settings
│   ├── database.py            # Firebase database setup
│   ├── models.py              # Pydantic data models
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment variables example
│   └── firebase-credentials.json  # Firebase service account key
├── frontend/
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── data/            # Mock data and constants
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── package.json         # Node.js dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── .env.example         # Environment variables example
├── README.md                # This file
└── .gitignore              # Git ignore rules
```

## 🔧 Development

### Backend Development

The backend uses FastAPI with automatic reload enabled in development mode.

**Key files:**
- `server.py` - Main FastAPI application
- `models.py` - Data validation models
- `database.py` - Firebase connection
- `config.py` - Configuration settings

**API Endpoints:**
- `GET /` - Health check
- `GET /health` - Detailed health check
- `POST /api/status` - Create status check
- `GET /api/status` - Get status checks
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact forms

### Frontend Development

The frontend is built with React and uses hot reload for development.

**Key directories:**
- `src/components/` - Reusable React components
- `src/data/` - Mock data and configuration
- `src/` - Main application files

### Environment Variables

**Backend (`.env`):**
```env
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CREDENTIALS_PATH=firebase-credentials.json
CORS_ORIGINS=http://localhost:3000
ENVIRONMENT=development
DEBUG=True
```

**Frontend (`.env`):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_ENVIRONMENT=development
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
pytest
```

### Frontend Testing

```bash
cd frontend
yarn test
```

## 🚀 Production Deployment

### Backend Deployment

1. Set environment variables on your server
2. Install dependencies: `pip install -r requirements.txt`
3. Run with production ASGI server: `uvicorn server:app --host 0.0.0.0 --port 8001`

### Frontend Deployment

1. Build the application: `yarn build`
2. Serve the `build/` directory with a web server (Nginx, Apache, etc.)

### Firebase Security

1. Set up Firestore security rules
2. Configure Firebase Authentication if needed
3. Restrict API access in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Firebase Connection Error:**
- Verify your `firebase-credentials.json` file is in the correct location
- Check that your Firebase project ID is correct in `.env`
- Ensure Firestore is enabled in your Firebase project

**CORS Issues:**
- Verify `CORS_ORIGINS` in backend `.env` includes your frontend URL
- Check that frontend is calling the correct backend URL

**Port Conflicts:**
- Backend default port: 8001
- Frontend default port: 3000
- Change ports in environment variables if needed

**Dependencies Issues:**
- Delete `node_modules` and run `yarn install` again
- For Python: Update pip with `pip install --upgrade pip`

### Getting Help

1. Check the API documentation at http://localhost:8001/docs
2. Review the browser console for frontend errors
3. Check server logs for backend errors
4. Ensure all environment variables are set correctly

## 🎯 Design Credit

Design and Development by [Toiral Web Development](https://toiral-development.web.app/)

---

**Happy Coding! 🚀**