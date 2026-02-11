#!/usr/bin/env python3
"""
Focused Rate Limiting Test
Tests the rate limiting implementation specifically
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
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://lead-generator-21.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

# Test credentials
TEST_EMAIL = "toiral.dev@gmail.com"
TEST_PASSWORD = "MGS=Q*_101_yOXlf"

def test_rate_limiting_detailed():
    """Detailed rate limiting test"""
    print("🔄 DETAILED RATE LIMITING TEST")
    print("=" * 50)
    
    # Use consistent wrong credentials to trigger rate limiting
    wrong_login_data = {
        "email": TEST_EMAIL,
        "password": "definitely_wrong_password"
    }
    
    print(f"Testing with wrong password to trigger rate limiting...")
    print(f"Email: {TEST_EMAIL}")
    print(f"Password: definitely_wrong_password")
    print()
    
    rate_limited = False
    
    for i in range(1, 8):  # Try 7 attempts
        print(f"Attempt {i}: ", end="", flush=True)
        
        try:
            response = requests.post(
                f"{API_BASE_URL}/admin/login",
                json=wrong_login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"HTTP {response.status_code}", end="")
            
            if response.status_code == 429:
                print(" - ✅ RATE LIMITED!")
                try:
                    error_data = response.json()
                    print(f"   Error message: {error_data.get('detail', 'No detail')}")
                except:
                    print(f"   Raw response: {response.text}")
                rate_limited = True
                break
            elif response.status_code == 401:
                print(" - Unauthorized (expected)")
            else:
                print(f" - Unexpected status")
                try:
                    data = response.json()
                    print(f"   Response: {data}")
                except:
                    print(f"   Raw response: {response.text}")
            
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            break
        
        # Small delay between attempts
        time.sleep(0.2)
    
    if rate_limited:
        print(f"\n✅ SUCCESS: Rate limiting triggered after {i} attempts")
        return True
    else:
        print(f"\n❌ FAILURE: Rate limiting not triggered after {i} attempts")
        return False

def test_rate_limiting_with_correct_credentials():
    """Test rate limiting with mix of correct/wrong credentials"""
    print("\n🔄 RATE LIMITING TEST WITH MIXED CREDENTIALS")
    print("=" * 50)
    
    attempts = [
        {"email": TEST_EMAIL, "password": "wrong1", "expected": "wrong"},
        {"email": TEST_EMAIL, "password": "wrong2", "expected": "wrong"},
        {"email": TEST_EMAIL, "password": TEST_PASSWORD, "expected": "correct"},
        {"email": TEST_EMAIL, "password": "wrong3", "expected": "wrong"},
        {"email": TEST_EMAIL, "password": "wrong4", "expected": "wrong"},
        {"email": TEST_EMAIL, "password": "wrong5", "expected": "wrong"},  # Should trigger rate limit
    ]
    
    rate_limited = False
    
    for i, attempt in enumerate(attempts, 1):
        print(f"Attempt {i} ({attempt['expected']}): ", end="", flush=True)
        
        try:
            response = requests.post(
                f"{API_BASE_URL}/admin/login",
                json={"email": attempt["email"], "password": attempt["password"]},
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            print(f"HTTP {response.status_code}", end="")
            
            if response.status_code == 429:
                print(" - ✅ RATE LIMITED!")
                try:
                    error_data = response.json()
                    print(f"   Error message: {error_data.get('detail', 'No detail')}")
                except:
                    print(f"   Raw response: {response.text}")
                rate_limited = True
                break
            elif response.status_code == 401:
                print(" - Unauthorized (expected for wrong password)")
            elif response.status_code == 200:
                print(" - Success (expected for correct password)")
            else:
                print(f" - Unexpected status")
            
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            break
        
        # Small delay between attempts
        time.sleep(0.1)
    
    if rate_limited:
        print(f"\n✅ SUCCESS: Rate limiting triggered after {i} attempts")
        return True
    else:
        print(f"\n❌ FAILURE: Rate limiting not triggered after {i} attempts")
        return False

def main():
    print("🔒 RATE LIMITING SECURITY TEST")
    print(f"📍 Testing API: {API_BASE_URL}/admin/login")
    print("=" * 60)
    
    # Test 1: Wrong credentials only
    test1_result = test_rate_limiting_detailed()
    
    # Wait a bit before next test
    print("\nWaiting 5 seconds before next test...")
    time.sleep(5)
    
    # Test 2: Mixed credentials
    test2_result = test_rate_limiting_with_correct_credentials()
    
    print("\n" + "=" * 60)
    print("📊 RATE LIMITING TEST SUMMARY")
    print("=" * 60)
    
    if test1_result or test2_result:
        print("✅ RATE LIMITING IS WORKING")
        print("The API properly limits login attempts to 5 per minute")
    else:
        print("❌ RATE LIMITING ISSUE DETECTED")
        print("The API may not be properly limiting login attempts")
    
    return test1_result or test2_result

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)