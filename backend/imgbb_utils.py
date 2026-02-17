"""
ImgBB API Integration
Handles image uploads to ImgBB cloud storage
"""
import os
import logging
import base64
import requests
from typing import Optional, Dict

logger = logging.getLogger(__name__)

# ImgBB API Configuration
IMGBB_API_KEY = os.getenv("IMGBB_API_KEY", "81c81608aeec2e89be5d099d3f3a55e8")
IMGBB_API_URL = "https://api.imgbb.com/1/upload"


def upload_to_imgbb(file_content: bytes, filename: str) -> Dict:
    """
    Upload an image to ImgBB and return the URL
    
    Args:
        file_content: The binary content of the image file
        filename: Original filename (for reference)
    
    Returns:
        Dict with success status and either url or error message
    """
    try:
        # Validate file content
        if not file_content:
            return {
                "success": False,
                "error": "No file content provided"
            }
        
        # Encode file content to base64
        base64_image = base64.b64encode(file_content).decode('utf-8')
        
        # Prepare the payload
        payload = {
            'key': IMGBB_API_KEY,
            'image': base64_image,
            'name': filename
        }
        
        logger.info(f"📤 Uploading image to ImgBB: {filename}")
        
        # Make the API request
        response = requests.post(
            IMGBB_API_URL,
            data=payload,
            timeout=30
        )
        
        # Check response status
        if response.status_code == 200:
            result = response.json()
            
            if result.get('success'):
                image_url = result['data']['url']
                display_url = result['data']['display_url']
                delete_url = result['data'].get('delete_url')
                
                logger.info(f"✅ Image uploaded successfully to ImgBB: {image_url}")
                
                return {
                    "success": True,
                    "url": image_url,
                    "display_url": display_url,
                    "delete_url": delete_url,
                    "filename": filename
                }
            else:
                error_msg = result.get('error', {}).get('message', 'Unknown error')
                logger.error(f"❌ ImgBB API returned error: {error_msg}")
                return {
                    "success": False,
                    "error": f"ImgBB API error: {error_msg}"
                }
        else:
            logger.error(f"❌ ImgBB API request failed with status {response.status_code}")
            return {
                "success": False,
                "error": f"Upload failed with status code {response.status_code}"
            }
            
    except requests.exceptions.Timeout:
        logger.error("❌ ImgBB API request timed out")
        return {
            "success": False,
            "error": "Upload request timed out. Please try again."
        }
    except requests.exceptions.RequestException as e:
        logger.error(f"❌ ImgBB API request failed: {str(e)}")
        return {
            "success": False,
            "error": f"Network error: {str(e)}"
        }
    except Exception as e:
        logger.error(f"❌ Unexpected error during ImgBB upload: {str(e)}")
        return {
            "success": False,
            "error": f"Unexpected error: {str(e)}"
        }


def validate_image_file(file_content: bytes, content_type: str, max_size_mb: int = 5) -> Optional[str]:
    """
    Validate image file before upload
    
    Args:
        file_content: The binary content of the file
        content_type: MIME type of the file
        max_size_mb: Maximum file size in MB
    
    Returns:
        Error message if validation fails, None if valid
    """
    # Check if file content exists
    if not file_content:
        return "No file content provided"
    
    # Validate file type
    allowed_types = [
        "image/jpeg", "image/jpg", "image/png", 
        "image/gif", "image/webp", "image/svg+xml", "image/bmp"
    ]
    if content_type not in allowed_types:
        return "Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, SVG, BMP"
    
    # Validate file size
    max_size_bytes = max_size_mb * 1024 * 1024
    file_size = len(file_content)
    if file_size > max_size_bytes:
        return f"File size ({file_size / (1024*1024):.2f}MB) exceeds maximum allowed size ({max_size_mb}MB)"
    
    # File is valid
    return None
