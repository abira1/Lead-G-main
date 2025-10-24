#!/usr/bin/env python3
"""
Debug Rate Limiting - Check what's happening with rate limiting
"""

import requests
import json
import time
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://job-page-fix.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

# Test credentials
TEST_EMAIL = "toiral.dev@gmail.com"

def debug_rate_limiting():
    """Debug rate limiting by making rapid requests and checking headers"""
    print("🔍 DEBUGGING RATE LIMITING")
    print("=" * 50)
    
    wrong_login_data = {
        "email": TEST_EMAIL,
        "password": "wrong_password_for_rate_limit_test"
    }
    
    print(f"Making rapid requests to: {API_BASE_URL}/admin/login")
    print(f"Using wrong credentials to trigger rate limiting...")
    print()
    
    for i in range(1, 10):  # Try 9 attempts
        print(f"Request {i}: ", end="", flush=True)
        
        try:
            response = requests.post(
                f"{API_BASE_URL}/admin/login",
                json=wrong_login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"HTTP {response.status_code}")
            
            # Check for rate limiting headers
            rate_limit_headers = {}
            for header_name, header_value in response.headers.items():
                if 'rate' in header_name.lower() or 'limit' in header_name.lower() or 'retry' in header_name.lower():
                    rate_limit_headers[header_name] = header_value
            
            if rate_limit_headers:
                print(f"   Rate limit headers: {rate_limit_headers}")
            
            # Check response content
            try:
                data = response.json()
                if response.status_code == 429:
                    print(f"   ✅ RATE LIMITED! Message: {data.get('detail', 'No detail')}")
                    return True
                elif 'rate' in str(data).lower() or 'limit' in str(data).lower():
                    print(f"   Rate limit related response: {data}")
            except:
                if response.status_code == 429:
                    print(f"   ✅ RATE LIMITED! Raw response: {response.text}")
                    return True
            
            # Check if we got an unexpected success
            if response.status_code == 200:
                print(f"   ⚠️  UNEXPECTED SUCCESS with wrong password!")
                return False
            
        except requests.exceptions.RequestException as e:
            print(f"   Request failed: {e}")
            return False
        
        # Very small delay
        time.sleep(0.05)
    
    print(f"\n❌ Rate limiting not triggered after {i} attempts")
    return False

def test_with_session():
    """Test rate limiting using a session to maintain connection"""
    print("\n🔍 TESTING WITH SESSION (PERSISTENT CONNECTION)")
    print("=" * 50)
    
    session = requests.Session()
    
    wrong_login_data = {
        "email": TEST_EMAIL,
        "password": "session_test_wrong_password"
    }
    
    for i in range(1, 8):
        print(f"Session Request {i}: ", end="", flush=True)
        
        try:
            response = session.post(
                f"{API_BASE_URL}/admin/login",
                json=wrong_login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"HTTP {response.status_code}")
            
            if response.status_code == 429:
                try:
                    data = response.json()
                    print(f"   ✅ RATE LIMITED! Message: {data.get('detail', 'No detail')}")
                except:
                    print(f"   ✅ RATE LIMITED! Raw: {response.text}")
                return True
            
        except requests.exceptions.RequestException as e:
            print(f"   Request failed: {e}")
            return False
        
        time.sleep(0.05)
    
    print(f"\n❌ Session-based rate limiting not triggered after {i} attempts")
    return False

def check_slowapi_config():
    """Check if slowapi is properly configured by testing a simple endpoint"""
    print("\n🔍 CHECKING SLOWAPI CONFIGURATION")
    print("=" * 50)
    
    # Test if any endpoint has rate limiting working
    print("Testing health endpoint for rate limiting...")
    
    for i in range(1, 20):  # More attempts for health endpoint
        try:
            response = requests.get(f"{API_BASE_URL}/health", timeout=5)
            
            if response.status_code == 429:
                print(f"✅ Rate limiting works on health endpoint after {i} requests")
                return True
            elif i % 5 == 0:
                print(f"   {i} requests to health endpoint - no rate limiting yet")
                
        except requests.exceptions.RequestException as e:
            print(f"Request {i} failed: {e}")
            break
        
        time.sleep(0.01)  # Very fast requests
    
    print("❌ No rate limiting detected on health endpoint")
    return False

def main():
    print("🔒 RATE LIMITING DEBUG ANALYSIS")
    print(f"📍 Testing API: {API_BASE_URL}")
    print("=" * 60)
    
    # Test 1: Basic rate limiting debug
    result1 = debug_rate_limiting()
    
    # Test 2: Session-based testing
    result2 = test_with_session()
    
    # Test 3: Check if slowapi is working at all
    result3 = check_slowapi_config()
    
    print("\n" + "=" * 60)
    print("📊 DEBUG SUMMARY")
    print("=" * 60)
    
    if result1 or result2:
        print("✅ RATE LIMITING IS WORKING")
    elif result3:
        print("⚠️  SLOWAPI WORKS BUT LOGIN RATE LIMITING MAY HAVE ISSUES")
    else:
        print("❌ RATE LIMITING APPEARS TO BE NOT WORKING")
        print("Possible issues:")
        print("- SlowAPI not properly configured")
        print("- Rate limiting bypassed by load balancer/proxy")
        print("- Different client IPs for each request")
        print("- Rate limiting storage not persistent")
    
    return result1 or result2

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)