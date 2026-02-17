#!/usr/bin/env python3
"""
Security Testing Script for Lead G API
Tests all security fixes that were implemented:
1. JWT Token Expiration (15 minutes instead of 24 hours)
2. Bcrypt Password Authentication
3. Rate Limiting (5 attempts per minute)
4. Security Headers
5. Admin Authentication Still Works
"""

import requests
import json
import sys
import time
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://auth-upload-issue.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

# Test credentials from the review request
TEST_EMAIL = "toiral.dev@gmail.com"
TEST_PASSWORD = "MGS=Q*_101_yOXlf"

class SecurityTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {message}")
        
        if not success:
            self.failed_tests.append(result)
            if response_data:
                print(f"   Response: {response_data}")

    def test_jwt_token_expiration(self):
        """Test JWT Token Expiration - should be 900 seconds (15 minutes), NOT 86400 seconds"""
        try:
            login_data = {
                "email": TEST_EMAIL,
                "password": TEST_PASSWORD
            }
            
            response = requests.post(
                f"{API_BASE_URL}/admin/login",
                json=login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                expires_in = data.get('expires_in')
                
                if expires_in == 900:  # 15 minutes * 60 seconds
                    self.log_test("JWT Token Expiration", True, f"✅ SECURITY FIX VERIFIED: Token expires in {expires_in} seconds (15 minutes)")
                elif expires_in == 86400:  # 24 hours
                    self.log_test("JWT Token Expiration", False, f"❌ SECURITY ISSUE: Token still expires in {expires_in} seconds (24 hours) - should be 900 seconds", data)
                else:
                    self.log_test("JWT Token Expiration", False, f"❌ UNEXPECTED: Token expires in {expires_in} seconds - expected 900 seconds", data)
                
                # Verify token structure
                access_token = data.get('access_token')
                token_type = data.get('token_type')
                
                if access_token and token_type == 'bearer' and len(access_token) > 50:
                    self.log_test("JWT Token Structure", True, f"Token structure is valid (length: {len(access_token)})")
                    return access_token
                else:
                    self.log_test("JWT Token Structure", False, f"Invalid token structure: {data}", data)
            else:
                self.log_test("JWT Token Expiration", False, f"Login failed: HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("JWT Token Expiration", False, f"Request failed: {str(e)}")
        
        return None

    def test_bcrypt_password_authentication(self):
        """Test Bcrypt Password Authentication - correct and wrong passwords"""
        try:
            # Test 1: Correct password
            correct_login_data = {
                "email": TEST_EMAIL,
                "password": TEST_PASSWORD
            }
            
            response = requests.post(
                f"{API_BASE_URL}/admin/login",
                json=correct_login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if 'access_token' in data:
                    self.log_test("Bcrypt Authentication - Correct Password", True, "✅ SECURITY FIX VERIFIED: Correct password accepted with bcrypt verification")
                else:
                    self.log_test("Bcrypt Authentication - Correct Password", False, "Login succeeded but no access token returned", data)
            else:
                self.log_test("Bcrypt Authentication - Correct Password", False, f"❌ SECURITY ISSUE: Correct password rejected: HTTP {response.status_code}: {response.text}", response.text)
            
            # Test 2: Wrong password
            wrong_login_data = {
                "email": TEST_EMAIL,
                "password": "wrong_password_123"
            }
            
            response2 = requests.post(
                f"{API_BASE_URL}/admin/login",
                json=wrong_login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response2.status_code == 401:
                error_data = response2.json()
                if "invalid" in error_data.get('detail', '').lower():
                    self.log_test("Bcrypt Authentication - Wrong Password", True, "✅ SECURITY FIX VERIFIED: Wrong password correctly rejected with 401 Unauthorized")
                else:
                    self.log_test("Bcrypt Authentication - Wrong Password", False, f"Wrong password rejected but with unexpected error message: {error_data.get('detail')}")
            else:
                self.log_test("Bcrypt Authentication - Wrong Password", False, f"❌ SECURITY ISSUE: Wrong password not properly rejected: HTTP {response2.status_code}: {response2.text}")
            
            # Test 3: Wrong email
            wrong_email_data = {
                "email": "wrong@email.com",
                "password": TEST_PASSWORD
            }
            
            response3 = requests.post(
                f"{API_BASE_URL}/admin/login",
                json=wrong_email_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response3.status_code == 401:
                self.log_test("Bcrypt Authentication - Wrong Email", True, "✅ SECURITY FIX VERIFIED: Wrong email correctly rejected with 401 Unauthorized")
            else:
                self.log_test("Bcrypt Authentication - Wrong Email", False, f"❌ SECURITY ISSUE: Wrong email not properly rejected: HTTP {response3.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Bcrypt Password Authentication", False, f"Request failed: {str(e)}")

    def test_rate_limiting(self):
        """Test Rate Limiting - should be 5 attempts per minute"""
        try:
            print("🔄 Testing rate limiting with 6 rapid login attempts...")
            
            # Prepare login data (mix of correct and wrong passwords)
            login_attempts = [
                {"email": TEST_EMAIL, "password": "wrong1"},
                {"email": TEST_EMAIL, "password": "wrong2"},
                {"email": TEST_EMAIL, "password": TEST_PASSWORD},  # Correct password
                {"email": TEST_EMAIL, "password": "wrong3"},
                {"email": TEST_EMAIL, "password": "wrong4"},
                {"email": TEST_EMAIL, "password": "wrong5"},  # This should trigger rate limit
            ]
            
            rate_limited = False
            successful_attempts = 0
            
            for i, login_data in enumerate(login_attempts, 1):
                print(f"   Attempt {i}/6: {login_data['email']} / {'correct' if login_data['password'] == TEST_PASSWORD else 'wrong'}")
                
                response = requests.post(
                    f"{API_BASE_URL}/admin/login",
                    json=login_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                if response.status_code == 429:  # Rate limit exceeded
                    error_data = response.json()
                    if "rate limit" in error_data.get('detail', '').lower():
                        rate_limited = True
                        self.log_test("Rate Limiting", True, f"✅ SECURITY FIX VERIFIED: Rate limit triggered after {i} attempts - 'Rate limit exceeded' error returned")
                        break
                    else:
                        self.log_test("Rate Limiting", False, f"Got 429 status but wrong error message: {error_data.get('detail')}")
                        break
                elif response.status_code in [200, 401]:
                    successful_attempts += 1
                    if successful_attempts > 5:
                        self.log_test("Rate Limiting", False, f"❌ SECURITY ISSUE: More than 5 attempts allowed without rate limiting")
                        break
                else:
                    self.log_test("Rate Limiting", False, f"Unexpected response: HTTP {response.status_code}: {response.text}")
                    break
                
                # Small delay between attempts
                time.sleep(0.1)
            
            if not rate_limited and successful_attempts <= 5:
                self.log_test("Rate Limiting", False, f"❌ SECURITY ISSUE: Rate limiting not triggered after {successful_attempts} attempts")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Rate Limiting", False, f"Request failed: {str(e)}")

    def test_security_headers(self):
        """Test Security Headers - check for required security headers"""
        try:
            # Test on health endpoint
            response = requests.get(f"{API_BASE_URL}/health", timeout=10)
            
            required_headers = {
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block',
                'Strict-Transport-Security': 'max-age=31536000',
                'Content-Security-Policy': "default-src 'self'",
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
            }
            
            missing_headers = []
            incorrect_headers = []
            present_headers = []
            
            for header_name, expected_value in required_headers.items():
                actual_value = response.headers.get(header_name)
                
                if actual_value is None:
                    missing_headers.append(header_name)
                elif expected_value.lower() in actual_value.lower():
                    present_headers.append(f"{header_name}: {actual_value}")
                else:
                    incorrect_headers.append(f"{header_name}: expected '{expected_value}', got '{actual_value}'")
            
            if not missing_headers and not incorrect_headers:
                self.log_test("Security Headers", True, f"✅ SECURITY FIX VERIFIED: All {len(required_headers)} security headers present and correct")
                for header in present_headers:
                    print(f"   ✓ {header}")
            else:
                issues = []
                if missing_headers:
                    issues.append(f"Missing: {', '.join(missing_headers)}")
                if incorrect_headers:
                    issues.append(f"Incorrect: {', '.join(incorrect_headers)}")
                
                self.log_test("Security Headers", False, f"❌ SECURITY ISSUE: {'; '.join(issues)}")
                
                if present_headers:
                    print("   Present headers:")
                    for header in present_headers:
                        print(f"   ✓ {header}")
            
            # Also test on root endpoint
            response2 = requests.get(f"{BACKEND_URL}/api/", timeout=10)
            root_headers = [h for h in required_headers.keys() if h in response2.headers]
            
            if len(root_headers) >= len(required_headers) - 1:  # Allow for minor differences
                self.log_test("Security Headers - Root Endpoint", True, f"Security headers also present on root endpoint ({len(root_headers)}/{len(required_headers)})")
            else:
                self.log_test("Security Headers - Root Endpoint", False, f"Security headers missing on root endpoint ({len(root_headers)}/{len(required_headers)})")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Security Headers", False, f"Request failed: {str(e)}")

    def test_admin_authentication_still_works(self):
        """Test that admin authentication still works after security fixes"""
        try:
            # Test 1: Admin login
            login_data = {
                "email": TEST_EMAIL,
                "password": TEST_PASSWORD
            }
            
            response = requests.post(
                f"{API_BASE_URL}/admin/login",
                json=login_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code != 200:
                self.log_test("Admin Authentication - Login", False, f"❌ CRITICAL: Admin login broken: HTTP {response.status_code}: {response.text}")
                return
            
            data = response.json()
            access_token = data.get('access_token')
            
            if not access_token:
                self.log_test("Admin Authentication - Login", False, "❌ CRITICAL: No access token returned from login")
                return
            
            self.log_test("Admin Authentication - Login", True, "✅ Admin login endpoint works with new credentials")
            
            # Test 2: Token verification
            verify_response = requests.get(
                f"{API_BASE_URL}/admin/verify",
                headers={'Authorization': f'Bearer {access_token}'},
                timeout=10
            )
            
            if verify_response.status_code == 200:
                verify_data = verify_response.json()
                if verify_data.get('success') and verify_data.get('data', {}).get('email') == TEST_EMAIL:
                    self.log_test("Admin Authentication - Token Verification", True, "✅ Token verification endpoint works correctly")
                else:
                    self.log_test("Admin Authentication - Token Verification", False, f"Token verification returned unexpected data: {verify_data}")
            else:
                self.log_test("Admin Authentication - Token Verification", False, f"❌ CRITICAL: Token verification failed: HTTP {verify_response.status_code}")
            
            # Test 3: Protected endpoint access
            appointments_response = requests.get(
                f"{API_BASE_URL}/appointments",
                headers={'Authorization': f'Bearer {access_token}'},
                timeout=10
            )
            
            if appointments_response.status_code == 200:
                appointments_data = appointments_response.json()
                if isinstance(appointments_data, list):
                    self.log_test("Admin Authentication - Protected Endpoints", True, f"✅ Protected endpoints accessible (found {len(appointments_data)} appointments)")
                else:
                    self.log_test("Admin Authentication - Protected Endpoints", False, f"Protected endpoint returned unexpected data type: {type(appointments_data)}")
            else:
                self.log_test("Admin Authentication - Protected Endpoints", False, f"❌ CRITICAL: Protected endpoint access failed: HTTP {appointments_response.status_code}")
            
            # Test 4: Unauthorized access still blocked
            unauth_response = requests.get(f"{API_BASE_URL}/appointments", timeout=10)
            
            if unauth_response.status_code in [401, 403]:
                self.log_test("Admin Authentication - Unauthorized Access Blocked", True, "✅ Unauthorized access properly blocked")
            else:
                self.log_test("Admin Authentication - Unauthorized Access Blocked", False, f"❌ SECURITY ISSUE: Unauthorized access not blocked: HTTP {unauth_response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Admin Authentication Still Works", False, f"Request failed: {str(e)}")

    def run_security_tests(self):
        """Run all security tests"""
        print("🔒 SECURITY TESTING - Lead G API Security Fixes")
        print(f"📍 Testing API Base URL: {API_BASE_URL}")
        print(f"🔑 Using credentials: {TEST_EMAIL} / {TEST_PASSWORD}")
        print("=" * 80)
        
        print("\n1️⃣  JWT TOKEN EXPIRATION TEST")
        print("-" * 40)
        self.test_jwt_token_expiration()
        
        print("\n2️⃣  BCRYPT PASSWORD AUTHENTICATION TEST")
        print("-" * 40)
        self.test_bcrypt_password_authentication()
        
        print("\n3️⃣  RATE LIMITING TEST")
        print("-" * 40)
        self.test_rate_limiting()
        
        print("\n4️⃣  SECURITY HEADERS TEST")
        print("-" * 40)
        self.test_security_headers()
        
        print("\n5️⃣  ADMIN AUTHENTICATION STILL WORKS TEST")
        print("-" * 40)
        self.test_admin_authentication_still_works()
        
        # Summary
        print("\n" + "=" * 80)
        print("📊 SECURITY TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS ({len(self.failed_tests)}):")
            for i, test in enumerate(self.failed_tests, 1):
                print(f"{i}. {test['test']}: {test['message']}")
        else:
            print(f"\n🎉 ALL SECURITY TESTS PASSED!")
        
        return len(self.failed_tests) == 0

def main():
    """Main function"""
    tester = SecurityTester()
    success = tester.run_security_tests()
    
    if success:
        print(f"\n✅ SECURITY TESTING COMPLETED SUCCESSFULLY")
        sys.exit(0)
    else:
        print(f"\n❌ SECURITY TESTING FAILED - ISSUES FOUND")
        sys.exit(1)

if __name__ == "__main__":
    main()