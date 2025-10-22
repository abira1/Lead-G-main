"""
Configuration settings for the FastAPI application
"""
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class Settings:
    # Firebase Configuration
    FIREBASE_CREDENTIALS_PATH = os.getenv('FIREBASE_CREDENTIALS_PATH', '/app/backend/firebase.json')
    FIREBASE_PROJECT_ID = os.getenv('FIREBASE_PROJECT_ID', 'lead-g-final')
    
    # CORS Configuration - Very permissive for cross-domain access
    CORS_ORIGINS_STRING = os.getenv('CORS_ORIGINS', '*')
    
    # Handle both wildcard and specific origins
    if CORS_ORIGINS_STRING == '*':
        CORS_ORIGINS = ["*"]
    else:
        CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGINS_STRING.split(',') if origin.strip()]
        # Add common development and production origins
        additional_origins = [
            "http://localhost:3000",
            "http://localhost:3001", 
            "http://127.0.0.1:3000",
            "https://clean-services-7.preview.emergentagent.com",
            "https://lead-g-final.firebaseapp.com",
            "https://lead-g-final.web.app"
        ]
        CORS_ORIGINS.extend([origin for origin in additional_origins if origin not in CORS_ORIGINS])
    
    # Environment
    ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    
    # API Configuration
    API_V1_STR = "/api"
    PROJECT_NAME = "Lead G API"
    VERSION = "1.0.0"
    
    # Security settings - relaxed for development
    ENABLE_CORS_ALL_ORIGINS = os.getenv('ENABLE_CORS_ALL_ORIGINS', 'true').lower() == 'true'
    ALLOW_ALL_METHODS = os.getenv('ALLOW_ALL_METHODS', 'true').lower() == 'true'
    ALLOW_ALL_HEADERS = os.getenv('ALLOW_ALL_HEADERS', 'true').lower() == 'true'

settings = Settings()