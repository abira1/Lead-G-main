"""
Mock Firebase Realtime Database for testing
"""
import logging
from typing import Optional, Dict, Any
import uuid
from datetime import datetime

logger = logging.getLogger(__name__)

# In-memory storage for mock database
_mock_storage = {}

class MockFirebaseRealtimeDB:
    """Mock Firebase Realtime Database for testing"""
    
    def __init__(self):
        logger.info("Initialized Mock Firebase Realtime Database")
        # Add db attribute for compatibility with health check
        self.db = self
    
    def get(self, path: str) -> Optional[Dict[str, Any]]:
        """Get data from a path"""
        try:
            path = path.strip('/')
            if '/' in path:
                # Handle nested paths like 'appointments/id'
                parts = path.split('/')
                collection = parts[0]
                doc_id = parts[1]
                
                if collection in _mock_storage and doc_id in _mock_storage[collection]:
                    logger.info(f"Mock: Retrieved document {doc_id} from {collection}")
                    return _mock_storage[collection][doc_id]
                else:
                    logger.info(f"Mock: Document {doc_id} not found in {collection}")
                    return None
            else:
                # Handle collection paths like 'appointments'
                collection = path
                if collection in _mock_storage:
                    logger.info(f"Mock: Retrieved collection {collection} with {len(_mock_storage[collection])} documents")
                    return _mock_storage[collection]
                else:
                    logger.info(f"Mock: Collection {collection} not found")
                    return None
        except Exception as e:
            logger.error(f"Mock: Error getting data from {path}: {e}")
            return None
    
    def set(self, path: str, data: Dict[str, Any]) -> bool:
        """Set data at a path"""
        try:
            path = path.strip('/')
            if '/' in path:
                # Handle nested paths like 'appointments/id'
                parts = path.split('/')
                collection = parts[0]
                doc_id = parts[1]
                
                if collection not in _mock_storage:
                    _mock_storage[collection] = {}
                
                _mock_storage[collection][doc_id] = data
                logger.info(f"Mock: Set document {doc_id} in {collection}")
                return True
            else:
                # Handle collection paths
                collection = path
                _mock_storage[collection] = data
                logger.info(f"Mock: Set collection {collection}")
                return True
        except Exception as e:
            logger.error(f"Mock: Error setting data at {path}: {e}")
            return False
    
    def update(self, path: str, data: Dict[str, Any]) -> bool:
        """Update data at a path"""
        try:
            path = path.strip('/')
            if '/' in path:
                # Handle nested paths like 'appointments/id'
                parts = path.split('/')
                collection = parts[0]
                doc_id = parts[1]
                
                if collection not in _mock_storage:
                    _mock_storage[collection] = {}
                
                if doc_id in _mock_storage[collection]:
                    _mock_storage[collection][doc_id].update(data)
                else:
                    _mock_storage[collection][doc_id] = data
                
                logger.info(f"Mock: Updated document {doc_id} in {collection}")
                return True
            else:
                logger.warning(f"Mock: Cannot update collection directly: {path}")
                return False
        except Exception as e:
            logger.error(f"Mock: Error updating data at {path}: {e}")
            return False
    
    def delete(self, path: str) -> bool:
        """Delete data at a path"""
        try:
            path = path.strip('/')
            if '/' in path:
                # Handle nested paths like 'appointments/id'
                parts = path.split('/')
                collection = parts[0]
                doc_id = parts[1]
                
                if collection in _mock_storage and doc_id in _mock_storage[collection]:
                    del _mock_storage[collection][doc_id]
                    logger.info(f"Mock: Deleted document {doc_id} from {collection}")
                    return True
                else:
                    logger.info(f"Mock: Document {doc_id} not found in {collection}")
                    return False
            else:
                # Handle collection paths
                collection = path
                if collection in _mock_storage:
                    del _mock_storage[collection]
                    logger.info(f"Mock: Deleted collection {collection}")
                    return True
                else:
                    logger.info(f"Mock: Collection {collection} not found")
                    return False
        except Exception as e:
            logger.error(f"Mock: Error deleting data at {path}: {e}")
            return False
    
    def get_collection(self, collection_name: str):
        """Get collection reference (for compatibility with Firestore-style code)"""
        return MockCollection(collection_name)
    
    def collection(self, collection_name: str):
        """Get collection reference (for compatibility with Firestore-style code)"""
        return MockCollection(collection_name)

class MockCollection:
    """Mock collection for compatibility"""
    
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
        if collection_name not in _mock_storage:
            _mock_storage[collection_name] = {}
    
    def document(self, doc_id: str):
        """Get document reference"""
        return MockDocumentRef(self.collection_name, doc_id)
    
    def limit(self, count: int):
        """Limit results"""
        return MockQuery(self.collection_name, limit=count)
    
    def order_by(self, field: str, direction: str = 'ASCENDING'):
        """Order results"""
        return MockQuery(self.collection_name, order_field=field, order_direction=direction)
    
    def where(self, field: str, operator: str, value: Any):
        """Filter results"""
        return MockQuery(self.collection_name, filters=[(field, operator, value)])
    
    def get(self):
        """Get all documents in collection"""
        docs = []
        if self.collection_name in _mock_storage:
            for doc_id, data in _mock_storage[self.collection_name].items():
                docs.append(MockDoc(doc_id, data))
        return docs

class MockDocumentRef:
    """Mock document reference"""
    
    def __init__(self, collection_name: str, doc_id: str):
        self.collection_name = collection_name
        self.doc_id = doc_id
    
    def set(self, data: Dict[str, Any]):
        """Set document data"""
        if self.collection_name not in _mock_storage:
            _mock_storage[self.collection_name] = {}
        _mock_storage[self.collection_name][self.doc_id] = data
        logger.info(f"Mock: Set document {self.doc_id} in {self.collection_name}")
    
    def get(self):
        """Get document"""
        if (self.collection_name in _mock_storage and 
            self.doc_id in _mock_storage[self.collection_name]):
            return MockDoc(self.doc_id, _mock_storage[self.collection_name][self.doc_id])
        return MockDoc(self.doc_id, None, exists=False)

class MockDoc:
    """Mock document"""
    
    def __init__(self, doc_id: str, data: Optional[Dict[str, Any]], exists: bool = True):
        self.id = doc_id
        self._data = data
        self.exists = exists and data is not None
    
    def to_dict(self):
        """Get document data"""
        return self._data or {}

class MockQuery:
    """Mock query"""
    
    def __init__(self, collection_name: str, limit: Optional[int] = None, 
                 order_field: Optional[str] = None, order_direction: str = 'ASCENDING',
                 filters: Optional[list] = None):
        self.collection_name = collection_name
        self.limit_count = limit
        self.order_field = order_field
        self.order_direction = order_direction
        self.filters = filters or []
    
    def limit(self, count: int):
        """Add limit"""
        return MockQuery(self.collection_name, limit=count, 
                        order_field=self.order_field, order_direction=self.order_direction,
                        filters=self.filters)
    
    def order_by(self, field: str, direction: str = 'ASCENDING'):
        """Add ordering"""
        return MockQuery(self.collection_name, limit=self.limit_count,
                        order_field=field, order_direction=direction,
                        filters=self.filters)
    
    def where(self, field: str, operator: str, value: Any):
        """Add filter"""
        new_filters = self.filters + [(field, operator, value)]
        return MockQuery(self.collection_name, limit=self.limit_count,
                        order_field=self.order_field, order_direction=self.order_direction,
                        filters=new_filters)
    
    def get(self):
        """Execute query"""
        docs = []
        if self.collection_name in _mock_storage:
            for doc_id, data in _mock_storage[self.collection_name].items():
                # Apply filters
                include = True
                for field, operator, value in self.filters:
                    if field in data:
                        if operator == '==' and data[field] != value:
                            include = False
                            break
                        elif operator == 'in' and data[field] not in value:
                            include = False
                            break
                
                if include:
                    docs.append(MockDoc(doc_id, data))
        
        # Apply ordering (basic implementation)
        if self.order_field:
            reverse = self.order_direction.upper() == 'DESCENDING'
            docs.sort(key=lambda d: d.to_dict().get(self.order_field, ''), reverse=reverse)
        
        # Apply limit
        if self.limit_count:
            docs = docs[:self.limit_count]
        
        return docs

# Global instance
firebase_db = MockFirebaseRealtimeDB()