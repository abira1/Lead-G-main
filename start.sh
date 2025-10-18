#!/bin/bash

# Lead G Application Startup Script
# This script starts both backend and frontend services

echo "🚀 Starting Lead G Application..."
echo "================================"

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Expected structure: ./backend/ and ./frontend/"
    exit 1
fi

# Check if Python virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "⚠️  Python virtual environment not found. Creating one..."
    cd backend
    python3 -m venv venv
    cd ..
fi

# Function to check if port is in use
check_port() {
    local port=$1
    local name=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $port is already in use. Please stop the $name service or change the port."
        return 1
    fi
    return 0
}

# Check if required ports are available
echo "🔍 Checking port availability..."
check_port 8001 "backend" && check_port 3000 "frontend" || exit 1

# Start backend in background
echo "🐍 Starting Backend (FastAPI)..."
cd backend

# Activate virtual environment and start server
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1
echo "   📦 Dependencies installed"

# Check if Firebase credentials exist
if [ ! -f "firebase-credentials.json" ]; then
    echo "⚠️  Firebase credentials not found!"
    echo "   Please add your firebase-credentials.json file to the backend/ directory"
    echo "   Or set FIREBASE_PROJECT_ID in backend/.env to use default credentials"
fi

python server.py &
BACKEND_PID=$!
echo "   ✅ Backend started (PID: $BACKEND_PID) at http://localhost:8001"

cd ..

# Start frontend
echo "⚛️  Starting Frontend (React)..."
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "   📦 Installing frontend dependencies..."
    yarn install
fi

# Start React development server
echo "   🚀 Starting React development server..."
yarn start &
FRONTEND_PID=$!
echo "   ✅ Frontend started (PID: $FRONTEND_PID) at http://localhost:3000"

cd ..

# Wait a moment for servers to start
sleep 3

echo ""
echo "🎉 Lead G Application is now running!"
echo "================================"
echo "🌐 Frontend:     http://localhost:3000"
echo "🔧 Backend API:  http://localhost:8001"
echo "📚 API Docs:     http://localhost:8001/docs"
echo ""
echo "📝 Logs:"
echo "   Backend PID:   $BACKEND_PID"
echo "   Frontend PID:  $FRONTEND_PID"
echo ""
echo "⏹️  To stop the application:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   or use Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down Lead G Application..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Application stopped successfully!"
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Wait for user to press Ctrl+C
echo "👀 Watching for changes... Press Ctrl+C to stop."
wait