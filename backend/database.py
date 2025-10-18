"""
Firebase Realtime Database configuration and utilities
"""
import logging
from typing import Optional, Dict, Any, List
import uuid
from datetime import datetime
import os
import json

logger = logging.getLogger(__name__)

# In-memory storage for mock database
_mock_storage = {}

class MockDocument:
    """Mock Firestore document for development"""
    def __init__(self, data: Dict[str, Any]):
        self._data = data
        self.exists = True
    
    def to_dict(self):
        return self._data
    
    def get(self):
        return self

class MockDocumentReference:
    """Mock Firestore document reference for development"""
    def __init__(self, collection_name: str, doc_id: str):
        self.collection_name = collection_name
        self.doc_id = doc_id
        # Initialize collection in storage if it doesn't exist
        if collection_name not in _mock_storage:
            _mock_storage[collection_name] = {}
    
    def set(self, data: Dict[str, Any]):
        _mock_storage[self.collection_name][self.doc_id] = data
        logger.info(f"Mock: Set document {self.doc_id} in {self.collection_name}")
        return self
    
    def update(self, data: Dict[str, Any]):
        if self.doc_id in _mock_storage[self.collection_name]:
            _mock_storage[self.collection_name][self.doc_id].update(data)
        else:
            _mock_storage[self.collection_name][self.doc_id] = data
        logger.info(f"Mock: Updated document {self.doc_id} in {self.collection_name}")
        return self
    
    def get(self):
        if self.doc_id in _mock_storage.get(self.collection_name, {}):
            return MockDocument(_mock_storage[self.collection_name][self.doc_id])
        else:
            doc = MockDocument({})
            doc.exists = False
            return doc
    
    def delete(self):
        if self.collection_name in _mock_storage and self.doc_id in _mock_storage[self.collection_name]:
            del _mock_storage[self.collection_name][self.doc_id]
            logger.info(f"Mock: Deleted document {self.doc_id} from {self.collection_name}")
        else:
            logger.warning(f"Mock: Attempted to delete non-existent document {self.doc_id} from {self.collection_name}")
        return self

class MockQuery:
    """Mock Firestore query for development"""
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
        self._filters = []
        self._order_by = None
        self._limit_count = None
    
    def where(self, field: str, op: str, value: Any):
        self._filters.append((field, op, value))
        return self
    
    def order_by(self, field: str, direction: str = 'ASCENDING'):
        self._order_by = (field, direction)
        return self
    
    def limit(self, count: int):
        self._limit_count = count
        return self
    
    def get(self):
        logger.info(f"Mock: Query {self.collection_name} with filters {self._filters}")
        
        # Get all documents from the collection
        collection_data = _mock_storage.get(self.collection_name, {})
        documents = []
        
        for doc_id, data in collection_data.items():
            # Apply filters
            match = True
            for field, op, value in self._filters:
                if field in data:
                    if op == '==':
                        if data[field] != value:
                            match = False
                            break
                    elif op == 'in':
                        if data[field] not in value:
                            match = False
                            break
                    elif op == '!=':
                        if data[field] == value:
                            match = False
                            break
                else:
                    match = False
                    break
            
            if match:
                documents.append(MockDocument(data))
        
        # Apply ordering
        if self._order_by:
            field, direction = self._order_by
            reverse = direction == 'DESCENDING'
            try:
                documents.sort(key=lambda doc: doc.to_dict().get(field, ''), reverse=reverse)
            except Exception as e:
                logger.warning(f"Error sorting by {field}: {e}")
        
        # Apply limit
        if self._limit_count:
            documents = documents[:self._limit_count]
        
        logger.info(f"Mock: Returning {len(documents)} documents from {self.collection_name}")
        return documents

class MockCollection:
    """Mock Firestore collection for development"""
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
    
    def document(self, doc_id: str = None):
        if doc_id is None:
            doc_id = str(uuid.uuid4())
        return MockDocumentReference(self.collection_name, doc_id)
    
    def where(self, field: str, op: str, value: Any):
        return MockQuery(self.collection_name).where(field, op, value)
    
    def order_by(self, field: str, direction: str = 'ASCENDING'):
        return MockQuery(self.collection_name).order_by(field, direction)
    
    def limit(self, count: int):
        return MockQuery(self.collection_name).limit(count)
    
    def get(self):
        logger.info(f"Mock: Get all documents from {self.collection_name}")
        collection_data = _mock_storage.get(self.collection_name, {})
        documents = [MockDocument(data) for data in collection_data.values()]
        logger.info(f"Mock: Returning {len(documents)} documents from {self.collection_name}")
        return documents

class MockFirestore:
    """Mock Firestore client for development"""
    def collection(self, collection_name: str):
        return MockCollection(collection_name)

class FirebaseDB:
    _instance: Optional['FirebaseDB'] = None
    _db = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirebaseDB, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize database - connect to Firebase Firestore"""
        try:
            import firebase_admin
            from firebase_admin import credentials, firestore
            
            # Check if Firebase is already initialized
            if not firebase_admin._apps:
                # Get credentials path from environment
                cred_path = os.getenv('FIREBASE_CREDENTIALS_PATH', '/app/backend/firebase-credentials.json')
                
                # Check if credentials file exists
                if os.path.exists(cred_path):
                    logger.info(f"Initializing Firebase with credentials from {cred_path}")
                    cred = credentials.Certificate(cred_path)
                    firebase_admin.initialize_app(cred)
                    self._db = firestore.client()
                    logger.info("Successfully connected to Firebase Firestore")
                else:
                    logger.warning(f"Firebase credentials not found at {cred_path}, using mock database")
                    self._db = MockFirestore()
            else:
                # Use existing Firebase app
                self._db = firestore.client()
                logger.info("Using existing Firebase connection")
                
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")
            logger.warning("Falling back to mock database")
            self._db = MockFirestore()
    
    @property
    def db(self):
        """Get database instance"""
        if self._db is None:
            self._initialize()
        return self._db
    
    def get_collection(self, collection_name: str):
        """Get a collection reference"""
        return self.db.collection(collection_name)

# Global database instance
firebase_db = FirebaseDB()