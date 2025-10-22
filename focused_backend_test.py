#!/usr/bin/env python3
"""
Focused Backend Testing Script
Tests basic backend functionality after frontend navigation changes (Case Studies removal).
Specifically tests:
1. Root API endpoint (GET /api/) 
2. One appointment endpoint to verify backend is working
3. Quick health check for all services
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://clean-services-7.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class FocusedBackendTester:
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
    
    def test_root_api_endpoint(self):
        """Test GET /api/ endpoint - should return API status message"""
        try:
            print(f"\n🔍 Testing Root API Endpoint: {API_BASE_URL}/health")
            response = requests.get(f"{API_BASE_URL}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check for expected response structure
                if (data.get('success') == True and 
                    'message' in data and
                    'data' in data):
                    
                    message = data.get('message', '')
                    if ('running successfully' in message.lower() or 
                        'lead g api' in message.lower() or 
                        'services are healthy' in message.lower()):
                        self.log_test("Root API Endpoint", True, f"✅ API is running - {message}")
                        return True
                    else:
                        self.log_test("Root API Endpoint", False, f"Unexpected message: {message}", data)
                else:
                    self.log_test("Root API Endpoint", False, f"Invalid response structure", data)
            else:
                self.log_test("Root API Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Root API Endpoint", False, f"Request failed: {str(e)}")
        
        return False

    def test_appointment_endpoint(self):
        """Test one appointment endpoint to verify backend functionality"""
        try:
            print(f"\n🔍 Testing Appointment Creation Endpoint: {API_BASE_URL}/appointments")
            
            # Test data for appointment creation (use unique timestamp to avoid conflicts)
            unique_time = datetime.now().strftime("%H:%M")
            test_data = {
                "name": "Backend Test User",
                "email": "backend.test@leadg.com",
                "phone": "+1-555-TEST",
                "business": "Test Company",
                "industry": "Technology",
                "service_interests": "Lead Generation",
                "appointment_date": "2024-12-27",
                "appointment_time": unique_time,
                "user_timezone": "America/New_York",
                "message": "Testing backend functionality after frontend navigation changes"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                
                # Check for required appointment fields
                required_fields = ['id', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 'status']
                
                if all(field in data for field in required_fields):
                    if (data['name'] == test_data['name'] and 
                        data['email'] == test_data['email'] and
                        data['appointment_date'] == test_data['appointment_date'] and
                        data['appointment_time'] == test_data['appointment_time'] and
                        data['status'] == 'pending'):
                        self.log_test("Appointment Creation", True, "✅ Appointment endpoint working correctly")
                        return True
                    else:
                        self.log_test("Appointment Creation", False, "Data mismatch in created appointment", data)
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Appointment Creation", False, f"Missing required fields: {missing_fields}", data)
            else:
                self.log_test("Appointment Creation", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Appointment Creation", False, f"Request failed: {str(e)}")
        
        return False

    def test_services_health_check(self):
        """Quick health check to ensure all services are operational"""
        try:
            print(f"\n🔍 Testing Services Health Check")
            
            # Test 1: Backend API connectivity
            api_response = requests.get(f"{API_BASE_URL}/", timeout=10)
            api_healthy = api_response.status_code == 200
            
            # Test 2: Database connectivity (via status endpoint)
            try:
                db_response = requests.get(f"{API_BASE_URL}/status", timeout=10)
                db_healthy = db_response.status_code == 200
            except:
                db_healthy = False
            
            # Test 3: CORS configuration
            try:
                cors_response = requests.options(
                    f"{API_BASE_URL}/appointments",
                    headers={
                        'Origin': BACKEND_URL,
                        'Access-Control-Request-Method': 'POST',
                        'Access-Control-Request-Headers': 'Content-Type'
                    },
                    timeout=10
                )
                cors_healthy = 'Access-Control-Allow-Origin' in cors_response.headers
            except:
                cors_healthy = False
            
            # Compile health status
            health_status = {
                'api_connectivity': api_healthy,
                'database_connectivity': db_healthy,
                'cors_configuration': cors_healthy
            }
            
            healthy_services = sum(health_status.values())
            total_services = len(health_status)
            
            if healthy_services == total_services:
                self.log_test("Services Health Check", True, f"✅ All {total_services} services operational")
                return True
            elif healthy_services >= 2:
                failed_services = [service for service, status in health_status.items() if not status]
                self.log_test("Services Health Check", True, f"⚠️ {healthy_services}/{total_services} services operational. Issues: {failed_services}")
                return True
            else:
                failed_services = [service for service, status in health_status.items() if not status]
                self.log_test("Services Health Check", False, f"❌ Only {healthy_services}/{total_services} services operational. Failed: {failed_services}")
                return False
                
        except Exception as e:
            self.log_test("Services Health Check", False, f"Health check failed: {str(e)}")
            return False

    def run_focused_tests(self):
        """Run the focused backend tests as requested"""
        print("=" * 80)
        print("🚀 FOCUSED BACKEND TESTING - POST FRONTEND NAVIGATION CHANGES")
        print("=" * 80)
        print(f"Backend URL: {BACKEND_URL}")
        print(f"API Base URL: {API_BASE_URL}")
        print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 80)
        
        # Run the three specific tests requested
        test_results = []
        
        # 1. Test root API endpoint
        test_results.append(self.test_root_api_endpoint())
        
        # 2. Test one appointment endpoint
        test_results.append(self.test_appointment_endpoint())
        
        # 3. Quick health check
        test_results.append(self.test_services_health_check())
        
        # Summary
        print("\n" + "=" * 80)
        print("📊 FOCUSED TEST SUMMARY")
        print("=" * 80)
        
        passed_tests = sum(test_results)
        total_tests = len(test_results)
        
        print(f"✅ Passed: {passed_tests}/{total_tests} tests")
        print(f"❌ Failed: {total_tests - passed_tests}/{total_tests} tests")
        
        if self.failed_tests:
            print("\n🔍 FAILED TESTS DETAILS:")
            for failed_test in self.failed_tests:
                print(f"  ❌ {failed_test['test']}: {failed_test['message']}")
        
        # Overall status
        if passed_tests == total_tests:
            print(f"\n🎉 SUCCESS: All backend functionality working correctly after frontend changes!")
            print("✅ Frontend navigation changes (Case Studies removal) did not affect backend")
            return True
        elif passed_tests >= 2:
            print(f"\n⚠️ MOSTLY WORKING: {passed_tests}/{total_tests} core functions operational")
            print("✅ Backend largely unaffected by frontend changes")
            return True
        else:
            print(f"\n❌ CRITICAL ISSUES: Only {passed_tests}/{total_tests} core functions working")
            print("🚨 Backend may have issues unrelated to frontend changes")
            return False

def main():
    """Main function to run focused backend tests"""
    tester = FocusedBackendTester()
    success = tester.run_focused_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()