"""
Firebase Realtime Database configuration and utilities
"""
import logging
from typing import Optional, Dict, Any, List
import uuid
from datetime import datetime
import os
import json
import requests

logger = logging.getLogger(__name__)

class FirebaseRealtimeDB:
    _instance: Optional['FirebaseRealtimeDB'] = None
    _db_url = None
    _api_key = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirebaseRealtimeDB, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize connection to Firebase Realtime Database"""
        try:
            # Load Firebase credentials
            cred_path = os.getenv('FIREBASE_CREDENTIALS_PATH', '/app/backend/firebase-credentials.json')
            
            if os.path.exists(cred_path):
                with open(cred_path, 'r') as f:
                    config = json.load(f)
                    self._db_url = config.get('databaseURL')
                    self._api_key = config.get('apiKey')
                    
                if self._db_url:
                    logger.info(f"Successfully connected to Firebase Realtime Database: {self._db_url}")
                else:
                    raise ValueError("Database URL not found in credentials")
            else:
                raise FileNotFoundError(f"Credentials file not found: {cred_path}")
                
        except Exception as e:
            logger.error(f"Failed to initialize Firebase Realtime Database: {e}")
            raise
    
    def _get_url(self, path: str) -> str:
        """Get full URL for a database path"""
        path = path.strip('/')
        return f"{self._db_url}/{path}.json"
    
    def get(self, path: str, query_params: Dict[str, Any] = None) -> Any:
        """Get data from a path"""
        try:
            url = self._get_url(path)
            params = query_params or {}
            if self._api_key:
                params['auth'] = self._api_key
                
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Error getting data from {path}: {e}")
            return None
    
    def set(self, path: str, data: Any) -> bool:
        """Set data at a path (overwrites)"""
        try:
            url = self._get_url(path)
            params = {}
            if self._api_key:
                params['auth'] = self._api_key
                
            response = requests.put(url, json=data, params=params)
            response.raise_for_status()
            logger.info(f"Successfully set data at {path}")
            return True
        except Exception as e:
            logger.error(f"Error setting data at {path}: {e}")
            return False
    
    def push(self, path: str, data: Any) -> Optional[str]:
        """Push data to a path (creates new entry with unique key)"""
        try:
            url = self._get_url(path)
            params = {}
            if self._api_key:
                params['auth'] = self._api_key
                
            response = requests.post(url, json=data, params=params)
            response.raise_for_status()
            result = response.json()
            new_key = result.get('name')
            logger.info(f"Successfully pushed data to {path} with key {new_key}")
            return new_key
        except Exception as e:
            logger.error(f"Error pushing data to {path}: {e}")
            return None
    
    def update(self, path: str, data: Dict[str, Any]) -> bool:
        """Update data at a path (merges with existing)"""
        try:
            url = self._get_url(path)
            params = {}
            if self._api_key:
                params['auth'] = self._api_key
                
            response = requests.patch(url, json=data, params=params)
            response.raise_for_status()
            logger.info(f"Successfully updated data at {path}")
            return True
        except Exception as e:
            logger.error(f"Error updating data at {path}: {e}")
            return False
    
    def delete(self, path: str) -> bool:
        """Delete data at a path"""
        try:
            url = self._get_url(path)
            params = {}
            if self._api_key:
                params['auth'] = self._api_key
                
            response = requests.delete(url, params=params)
            response.raise_for_status()
            logger.info(f"Successfully deleted data at {path}")
            return True
        except Exception as e:
            logger.error(f"Error deleting data at {path}: {e}")
            return False
    
    def query(self, path: str, order_by: str = None, limit_to_first: int = None, 
              limit_to_last: int = None, equal_to: Any = None) -> Any:
        """Query data with filters"""
        try:
            url = self._get_url(path)
            params = {}
            if self._api_key:
                params['auth'] = self._api_key
            
            if order_by:
                params['orderBy'] = f'"{order_by}"'
            if limit_to_first:
                params['limitToFirst'] = limit_to_first
            if limit_to_last:
                params['limitToLast'] = limit_to_last
            if equal_to is not None:
                params['equalTo'] = f'"{equal_to}"' if isinstance(equal_to, str) else equal_to
                
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Error querying data from {path}: {e}")
            return None
    
    def get_collection(self, collection_name: str) -> Dict[str, Any]:
        """Get all documents in a collection"""
        data = self.get(collection_name)
        if data and isinstance(data, dict):
            # Convert to list format with id field
            return {
                'items': [
                    {**value, 'id': key} for key, value in data.items()
                ],
                'raw': data
            }
        return {'items': [], 'raw': {}}

# Global database instance
firebase_db = FirebaseRealtimeDB()
