# Lead G Backend API

FastAPI backend service for the Lead G lead generation platform, using Firebase Firestore as the database.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Firebase project with Firestore enabled

### Installation

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Firebase Setup:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create/select your project
   - Generate service account key (JSON file)
   - Save as `firebase-credentials.json` in this directory

4. **Environment Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase project details
   ```

5. **Run the server:**
   ```bash
   python server.py
   ```

The API will be available at:
- **Server**: http://localhost:8001
- **Documentation**: http://localhost:8001/docs
- **Alternative Docs**: http://localhost:8001/redoc

## 📚 API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check with database connection test

### Status Checks
- `POST /api/status` - Create a new status check
- `GET /api/status` - Retrieve status checks (with optional limit)

### Contact Forms
- `POST /api/contact` - Submit a contact form
- `GET /api/contact` - Retrieve contact forms (admin endpoint)

## 🗂️ Project Structure

```
backend/
├── config.py          # Configuration settings
├── database.py        # Firebase Firestore setup
├── models.py          # Pydantic data models
├── server.py          # FastAPI application
├── requirements.txt   # Python dependencies
├── .env.example      # Environment variables template
└── firebase-credentials.json  # Firebase service account key
```

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CREDENTIALS_PATH=firebase-credentials.json

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Environment
ENVIRONMENT=development
DEBUG=True
```

## 🏗️ Architecture

### Database Schema

**Collections:**

1. **status_checks**
   ```json
   {
     "id": "uuid4-string",
     "client_name": "string",
     "message": "optional-string",
     "timestamp": "iso-datetime"
   }
   ```

2. **contact_forms**
   ```json
   {
     "id": "uuid4-string",
     "first_name": "string",
     "last_name": "string",
     "email": "email-string",
     "phone": "optional-string",
     "company": "optional-string",
     "industry": "optional-string",
     "service": "optional-string",
     "message": "string",
     "submitted_at": "iso-datetime",
     "status": "new|contacted|closed"
   }
   ```

### Key Components

- **FastAPI**: Modern, fast web framework
- **Firebase Admin SDK**: Database and authentication
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server for production

## 🧪 Testing

```bash
# Run tests
pytest

# Run tests with coverage
pytest --cov=.

# Run specific test file
pytest test_specific.py
```

## 🚀 Production Deployment

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Environment Variables for Production

```env
ENVIRONMENT=production
DEBUG=False
CORS_ORIGINS=https://yourdomain.com
FIREBASE_PROJECT_ID=your-prod-project-id
```

### Running in Production

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
```

## 🔒 Security

### Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read for status checks
    match /status_checks/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📊 Monitoring

The API includes built-in logging and health check endpoints for monitoring:

- Use `/health` endpoint for load balancer health checks
- Monitor logs for error tracking
- Set up Firebase monitoring for database performance

## 🤝 Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Include docstrings for all public methods
4. Write tests for new features
5. Update this README for any new endpoints

## 📝 Dependencies

### Core Dependencies
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `firebase-admin` - Firebase SDK
- `pydantic` - Data validation

### Development Dependencies
- `pytest` - Testing framework
- `black` - Code formatting
- `flake8` - Linting

## 🆘 Troubleshooting

### Common Issues

**Firebase Authentication Error:**
```
Check if firebase-credentials.json is in the correct location
Verify FIREBASE_PROJECT_ID in .env matches your Firebase project
```

**Import Errors:**
```
Ensure virtual environment is activated
Run: pip install -r requirements.txt
```

**CORS Issues:**
```
Add your frontend URL to CORS_ORIGINS in .env
Format: CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

---

For more information, visit the [main project README](../README.md).