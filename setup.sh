#!/bin/bash

# ==================================================================
# Lead G - Automated Setup Script
# ==================================================================
# This script automates the setup process for Lead G application
# Run with: bash setup.sh
# ==================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main setup process
main() {
    print_header "🚀 Lead G - Setup Script"
    
    # Check prerequisites
    print_header "1. Checking Prerequisites"
    
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js installed: $NODE_VERSION"
    else
        print_error "Node.js not found. Please install Node.js v16+ from https://nodejs.org/"
        exit 1
    fi
    
    if command_exists yarn; then
        YARN_VERSION=$(yarn --version)
        print_success "Yarn installed: v$YARN_VERSION"
    else
        print_warning "Yarn not found. Installing Yarn..."
        npm install -g yarn
        print_success "Yarn installed"
    fi
    
    if command_exists python3; then
        PYTHON_VERSION=$(python3 --version)
        print_success "Python installed: $PYTHON_VERSION"
    else
        print_error "Python 3 not found. Please install Python 3.10+ from https://www.python.org/"
        exit 1
    fi
    
    if command_exists pip3; then
        print_success "pip installed"
    else
        print_error "pip3 not found. Please install pip"
        exit 1
    fi
    
    # Setup Backend
    print_header "2. Setting Up Backend"
    
    cd backend
    
    print_info "Creating Python virtual environment..."
    python3 -m venv venv
    print_success "Virtual environment created"
    
    print_info "Activating virtual environment..."
    source venv/bin/activate
    
    print_info "Upgrading pip..."
    pip install --upgrade pip --quiet
    print_success "pip upgraded"
    
    print_info "Installing Python dependencies..."
    pip install -r requirements.txt --quiet
    print_success "Python dependencies installed"
    
    if [ ! -f .env ]; then
        print_info "Creating backend .env file from template..."
        cp .env.example .env
        print_warning "Please edit backend/.env with your configuration"
    else
        print_info "Backend .env file already exists"
    fi
    
    cd ..
    
    # Setup Frontend
    print_header "3. Setting Up Frontend"
    
    cd frontend
    
    print_info "Installing Node.js dependencies (this may take a few minutes)..."
    yarn install
    print_success "Node.js dependencies installed"
    
    if [ ! -f .env ]; then
        print_info "Creating frontend .env file from template..."
        cp .env.example .env
        print_success "Frontend .env file created"
    else
        print_info "Frontend .env file already exists"
    fi
    
    cd ..
    
    # Final instructions
    print_header "✅ Setup Complete!"
    
    echo ""
    print_success "Backend and Frontend setup completed successfully!"
    echo ""
    print_info "Next Steps:"
    echo ""
    echo "1. Configure Firebase:"
    echo "   - Create Firebase project at https://console.firebase.google.com/"
    echo "   - Enable Firestore Database"
    echo "   - Download service account key"
    echo "   - Update backend/.env with Firebase credentials"
    echo ""
    echo "2. Start the Backend:"
    echo "   cd backend"
    echo "   source venv/bin/activate"
    echo "   python server.py"
    echo ""
    echo "3. Start the Frontend (in new terminal):"
    echo "   cd frontend"
    echo "   yarn start"
    echo ""
    echo "4. Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8001"
    echo "   API Docs: http://localhost:8001/docs"
    echo ""
    print_warning "Don't forget to configure your .env files!"
    echo ""
    print_success "For detailed documentation, see DEPLOYMENT_GUIDE.md"
    echo ""
}

# Run main function
main
