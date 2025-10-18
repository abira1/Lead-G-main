# ⚡ Quick Start Guide - Lead G

Get the Lead G application running in 5 minutes!

---

## Prerequisites

✅ Node.js (v16+)  
✅ Python (v3.10+)  
✅ Yarn  
✅ Git

Check installations:
```bash
node --version
python3 --version
yarn --version
```

---

## 🚀 Setup in 5 Steps

### 1️⃣ Clone the Project

```bash
git clone <repository-url>
cd lead-g
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your Firebase credentials
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
yarn install

# Setup environment
cp .env.example .env
# Keep default settings for local development
```

### 4️⃣ Firebase Configuration

1. Create Firebase project: https://console.firebase.google.com/
2. Enable Firestore Database
3. Download service account key (Project Settings → Service Accounts)
4. Save as `firebase-credentials.json` in backend folder
5. Update backend `.env`:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CREDENTIALS_PATH=/path/to/backend/firebase-credentials.json
   ```

### 5️⃣ Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python server.py
```
✅ Backend running on http://localhost:8001

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn start
```
✅ Frontend running on http://localhost:3000

---

## 🎯 Access Points

- **Application**: http://localhost:3000
- **API Docs**: http://localhost:8001/docs
- **API**: http://localhost:8001/api

---

## 🆘 Quick Fixes

**Port in use?**
```bash
# Kill process on port 8001 (backend)
lsof -i :8001 && kill -9 <PID>

# Kill process on port 3000 (frontend)
lsof -i :3000 && kill -9 <PID>
```

**Dependencies issue?**
```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
rm -rf node_modules yarn.lock
yarn install
```

---

## 📚 Full Documentation

For detailed setup, troubleshooting, and deployment: see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

**That's it! Happy coding! 🎉**
