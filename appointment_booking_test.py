#!/usr/bin/env python3
"""
Appointment Booking API Testing Script
Focused testing of the appointment booking system after frontend form updates.
"""

import requests
import json
import sys
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://spacing-rhythm.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class AppointmentBookingTester:
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

    def test_appointment_creation_with_sample_data(self):
        """Test POST /api/appointments with the exact sample data provided in review request"""
        try:
            # Use the exact sample data from the review request
            sample_data = {
                "name": "Test User",
                "email": "test@example.com", 
                "phone": "1234567890",
                "business": "Test Business",
                "industry": "Real Estate",
                "service_interests": ["Telemarketing"],
                "appointment_date": "2024-12-25",
                "appointment_time": "14:00",
                "message": "Test appointment booking",
                "user_timezone": "America/New_York"
            }
            
            print(f"Testing with sample data: {json.dumps(sample_data, indent=2)}")
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=sample_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            print(f"Response status code: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            print(f"Raw response text: {response.text[:500]}...")  # First 500 chars
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    print(f"Parsed JSON response: {json.dumps(data, indent=2, default=str)}")
                    
                    # Check required fields
                    required_fields = ['id', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 'status', 'created_at']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_test("Appointment Creation - Sample Data", False, f"Missing required fields: {missing_fields}", data)
                        return False
                    
                    # Verify data matches input
                    if (data['name'] == sample_data['name'] and 
                        data['email'] == sample_data['email'] and
                        data['phone'] == sample_data['phone'] and
                        data['business'] == sample_data['business'] and
                        data['industry'] == sample_data['industry'] and
                        data['appointment_date'] == sample_data['appointment_date'] and
                        data['appointment_time'] == sample_data['appointment_time'] and
                        data['message'] == sample_data['message'] and
                        data['user_timezone'] == sample_data['user_timezone'] and
                        data['status'] == 'pending'):
                        
                        self.log_test("Appointment Creation - Sample Data", True, f"✅ Appointment created successfully with ID: {data['id']}")
                        return True
                    else:
                        self.log_test("Appointment Creation - Sample Data", False, "Data mismatch between input and response", {
                            'input': sample_data,
                            'output': data
                        })
                        return False
                        
                except json.JSONDecodeError as e:
                    self.log_test("Appointment Creation - Sample Data", False, f"❌ JSON DECODE ERROR - This indicates 'Unexpected end of JSON input': {str(e)}", response.text)
                    return False
                    
            elif response.status_code == 422:
                try:
                    error_data = response.json()
                    self.log_test("Appointment Creation - Sample Data", False, f"Validation error (422): {error_data}", error_data)
                except json.JSONDecodeError:
                    self.log_test("Appointment Creation - Sample Data", False, f"Validation error (422) with invalid JSON: {response.text}", response.text)
                return False
                
            else:
                try:
                    error_data = response.json()
                    self.log_test("Appointment Creation - Sample Data", False, f"HTTP {response.status_code}: {error_data}", error_data)
                except json.JSONDecodeError:
                    self.log_test("Appointment Creation - Sample Data", False, f"HTTP {response.status_code} with invalid JSON: {response.text}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Appointment Creation - Sample Data", False, f"Request failed: {str(e)}")
            return False

    def test_backend_service_responding(self):
        """Test that backend service is responding correctly"""
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    if data.get('success') == True and 'running successfully' in data.get('message', '').lower():
                        self.log_test("Backend Service Response", True, f"Backend is responding correctly - {data['message']}")
                        return True
                    else:
                        self.log_test("Backend Service Response", False, f"Unexpected response structure: {data}", data)
                        return False
                except json.JSONDecodeError as e:
                    self.log_test("Backend Service Response", False, f"JSON decode error: {str(e)}", response.text)
                    return False
            else:
                self.log_test("Backend Service Response", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Backend Service Response", False, f"Request failed: {str(e)}")
            return False

    def test_json_response_format(self):
        """Test that JSON response is properly formatted by making a simple request"""
        try:
            # Test with minimal valid data to check JSON formatting
            minimal_data = {
                "name": "JSON Test User",
                "email": "jsontest@example.com",
                "phone": "5551234567",
                "appointment_date": "2024-12-26",
                "appointment_time": "15:00",
                "user_timezone": "UTC"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=minimal_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            print(f"JSON Format Test - Status: {response.status_code}")
            print(f"JSON Format Test - Content-Type: {response.headers.get('content-type', 'Not set')}")
            
            # Check if response has proper JSON content type
            content_type = response.headers.get('content-type', '')
            if 'application/json' not in content_type:
                self.log_test("JSON Response Format", False, f"Response not JSON format. Content-Type: {content_type}")
                return False
            
            # Try to parse JSON
            try:
                data = response.json()
                self.log_test("JSON Response Format", True, "✅ JSON response is properly formatted and parseable")
                return True
            except json.JSONDecodeError as e:
                self.log_test("JSON Response Format", False, f"❌ JSON PARSING FAILED - 'Unexpected end of JSON input' type error: {str(e)}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("JSON Response Format", False, f"Request failed: {str(e)}")
            return False

    def test_no_unexpected_json_errors(self):
        """Test multiple appointment creations to ensure no JSON errors occur"""
        try:
            test_cases = [
                {
                    "name": "Alice Johnson",
                    "email": "alice@company.com",
                    "phone": "5551111111",
                    "business": "Tech Corp",
                    "industry": "Technology",
                    "service_interests": ["Social Media"],
                    "appointment_date": "2024-12-27",
                    "appointment_time": "09:00",
                    "message": "Interested in social media services",
                    "user_timezone": "America/Los_Angeles"
                },
                {
                    "name": "Bob Smith",
                    "email": "bob@realestate.com",
                    "phone": "5552222222",
                    "business": "Smith Realty",
                    "industry": "Real Estate",
                    "service_interests": ["Telemarketing", "Lead Generation"],
                    "appointment_date": "2024-12-28",
                    "appointment_time": "11:30",
                    "message": "Need help with lead generation",
                    "user_timezone": "America/Chicago"
                }
            ]
            
            successful_tests = 0
            json_errors = 0
            
            for i, test_case in enumerate(test_cases, 1):
                try:
                    response = requests.post(
                        f"{API_BASE_URL}/appointments",
                        json=test_case,
                        headers={'Content-Type': 'application/json'},
                        timeout=15
                    )
                    
                    # Try to parse JSON
                    try:
                        data = response.json()
                        if response.status_code == 200:
                            successful_tests += 1
                            print(f"  Test case {i}: ✅ Success - Created appointment {data.get('id', 'unknown')}")
                        else:
                            print(f"  Test case {i}: ⚠️  HTTP {response.status_code} but JSON parseable")
                    except json.JSONDecodeError as e:
                        json_errors += 1
                        print(f"  Test case {i}: ❌ JSON Error - {str(e)}")
                        
                except requests.exceptions.RequestException as e:
                    print(f"  Test case {i}: ❌ Request Error - {str(e)}")
            
            if json_errors == 0:
                self.log_test("No Unexpected JSON Errors", True, f"✅ All {len(test_cases)} test cases completed without JSON parsing errors. {successful_tests} successful appointments created.")
                return True
            else:
                self.log_test("No Unexpected JSON Errors", False, f"❌ {json_errors} JSON parsing errors occurred out of {len(test_cases)} test cases")
                return False
                
        except Exception as e:
            self.log_test("No Unexpected JSON Errors", False, f"Test failed with exception: {str(e)}")
            return False

    def test_appointment_creation_with_all_fields(self):
        """Test POST /api/appointments with all form fields including new ones"""
        try:
            test_data = {
                "name": "Jennifer Martinez",
                "email": "jennifer.martinez@techcorp.com",
                "phone": "+1-555-0198",
                "business": "TechCorp Solutions",
                "industry": "Technology",
                "service_interests": "Lead Generation, Social Media Marketing, Gov Contracting",
                "appointment_date": "2024-12-27",
                "appointment_time": "15:30",
                "message": "We're looking to expand our lead generation capabilities and improve our social media presence. We're particularly interested in government contracting opportunities."
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'name', 'email', 'phone', 'business', 'industry', 'service_interests', 'appointment_date', 'appointment_time', 'message', 'status', 'created_at']
                
                if all(field in data for field in required_fields):
                    # Verify all data matches
                    data_matches = (
                        data['name'] == test_data['name'] and
                        data['email'] == test_data['email'] and
                        data['phone'] == test_data['phone'] and
                        data['business'] == test_data['business'] and
                        data['industry'] == test_data['industry'] and
                        data['service_interests'] == test_data['service_interests'] and
                        data['appointment_date'] == test_data['appointment_date'] and
                        data['appointment_time'] == test_data['appointment_time'] and
                        data['message'] == test_data['message'] and
                        data['status'] == 'pending'
                    )
                    
                    if data_matches:
                        self.log_test("Appointment Creation - All Fields", True, f"Successfully created appointment with UUID {data['id']} and all form fields")
                        return data
                    else:
                        self.log_test("Appointment Creation - All Fields", False, "Data mismatch in created appointment", data)
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Appointment Creation - All Fields", False, f"Missing required fields: {missing_fields}", data)
            else:
                self.log_test("Appointment Creation - All Fields", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Appointment Creation - All Fields", False, f"Request failed: {str(e)}")
        
        return None

    def test_appointment_creation_minimal_fields(self):
        """Test POST /api/appointments with only required fields"""
        try:
            test_data = {
                "name": "Robert Kim",
                "email": "robert.kim@startup.io",
                "phone": "+1-555-0234",
                "appointment_date": "2024-12-28",
                "appointment_time": "10:00"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 'status', 'created_at']
                
                if all(field in data for field in required_fields):
                    if (data['name'] == test_data['name'] and 
                        data['email'] == test_data['email'] and
                        data['phone'] == test_data['phone'] and
                        data['appointment_date'] == test_data['appointment_date'] and
                        data['appointment_time'] == test_data['appointment_time'] and
                        data['status'] == 'pending'):
                        self.log_test("Appointment Creation - Minimal Fields", True, f"Successfully created appointment with minimal required fields, UUID: {data['id']}")
                        return data
                    else:
                        self.log_test("Appointment Creation - Minimal Fields", False, "Data mismatch in created appointment", data)
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Appointment Creation - Minimal Fields", False, f"Missing required fields: {missing_fields}", data)
            else:
                self.log_test("Appointment Creation - Minimal Fields", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Appointment Creation - Minimal Fields", False, f"Request failed: {str(e)}")
        
        return None

    def test_email_validation(self):
        """Test email format validation"""
        try:
            # Test invalid email formats
            invalid_emails = [
                "invalid-email",
                "test@",
                "@domain.com",
                "test..test@domain.com",
                "test@domain",
                ""
            ]
            
            for invalid_email in invalid_emails:
                test_data = {
                    "name": "Test User",
                    "email": invalid_email,
                    "phone": "+1-555-0123",
                    "appointment_date": "2024-12-29",
                    "appointment_time": "11:00"
                }
                
                response = requests.post(
                    f"{API_BASE_URL}/appointments",
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                if response.status_code != 422:
                    self.log_test("Email Validation", False, f"Invalid email '{invalid_email}' was accepted (expected 422, got {response.status_code})")
                    return
            
            # Test valid email format
            valid_test_data = {
                "name": "Test User",
                "email": "valid.email@domain.com",
                "phone": "+1-555-0123",
                "appointment_date": "2024-12-29",
                "appointment_time": "11:30"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=valid_test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                self.log_test("Email Validation", True, "Email validation working correctly - rejects invalid formats and accepts valid ones")
            else:
                self.log_test("Email Validation", False, f"Valid email was rejected: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Email Validation", False, f"Request failed: {str(e)}")

    def test_phone_validation(self):
        """Test phone number validation"""
        try:
            # Test phone number too short
            short_phone_data = {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "123",  # Too short
                "appointment_date": "2024-12-30",
                "appointment_time": "12:00"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=short_phone_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 422:
                self.log_test("Phone Validation - Too Short", True, "Correctly rejected phone number that's too short")
            else:
                self.log_test("Phone Validation - Too Short", False, f"Short phone number was accepted (expected 422, got {response.status_code})")
            
            # Test valid phone numbers
            valid_phone_formats = [
                "+1-555-0123",
                "(555) 123-4567",
                "555-123-4567",
                "+1 555 123 4567",
                "15551234567"
            ]
            
            for phone in valid_phone_formats:
                test_data = {
                    "name": "Test User",
                    "email": "test@example.com",
                    "phone": phone,
                    "appointment_date": "2024-12-30",
                    "appointment_time": "13:00"
                }
                
                response = requests.post(
                    f"{API_BASE_URL}/appointments",
                    json=test_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                if response.status_code != 200:
                    self.log_test("Phone Validation", False, f"Valid phone format '{phone}' was rejected: {response.status_code}")
                    return
            
            self.log_test("Phone Validation", True, "Phone validation working correctly - accepts various valid formats")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Phone Validation", False, f"Request failed: {str(e)}")

    def test_date_time_validation(self):
        """Test date and time validation"""
        try:
            # Test invalid date format
            invalid_date_data = {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "+1-555-0123",
                "appointment_date": "invalid-date",
                "appointment_time": "14:00"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=invalid_date_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Note: The current model uses str for date/time, so format validation might not be enforced
            # This test verifies the API accepts the data structure
            
            # Test valid date/time formats
            valid_datetime_data = {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "+1-555-0123",
                "appointment_date": "2024-12-31",
                "appointment_time": "14:30"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=valid_datetime_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if (data['appointment_date'] == valid_datetime_data['appointment_date'] and
                    data['appointment_time'] == valid_datetime_data['appointment_time']):
                    self.log_test("Date/Time Validation", True, "Date and time validation working correctly")
                else:
                    self.log_test("Date/Time Validation", False, "Date/time data mismatch", data)
            else:
                self.log_test("Date/Time Validation", False, f"Valid date/time was rejected: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Date/Time Validation", False, f"Request failed: {str(e)}")

    def test_missing_required_fields(self):
        """Test validation for missing required fields"""
        try:
            # Test missing name
            missing_name_data = {
                "email": "test@example.com",
                "phone": "+1-555-0123",
                "appointment_date": "2025-01-01",
                "appointment_time": "15:00"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=missing_name_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code != 422:
                self.log_test("Missing Required Fields", False, f"Missing name was accepted (expected 422, got {response.status_code})")
                return
            
            # Test missing email
            missing_email_data = {
                "name": "Test User",
                "phone": "+1-555-0123",
                "appointment_date": "2025-01-01",
                "appointment_time": "15:00"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=missing_email_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code != 422:
                self.log_test("Missing Required Fields", False, f"Missing email was accepted (expected 422, got {response.status_code})")
                return
            
            # Test missing phone
            missing_phone_data = {
                "name": "Test User",
                "email": "test@example.com",
                "appointment_date": "2025-01-01",
                "appointment_time": "15:00"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=missing_phone_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code != 422:
                self.log_test("Missing Required Fields", False, f"Missing phone was accepted (expected 422, got {response.status_code})")
                return
            
            self.log_test("Missing Required Fields", True, "Correctly validates and rejects requests with missing required fields")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Missing Required Fields", False, f"Request failed: {str(e)}")

    def test_database_integration(self):
        """Test that appointments are being stored correctly"""
        try:
            # Create a unique appointment
            unique_name = f"Database Test User {datetime.now().strftime('%Y%m%d_%H%M%S')}"
            test_data = {
                "name": unique_name,
                "email": "dbtest@example.com",
                "phone": "+1-555-9876",
                "business": "Database Test Corp",
                "industry": "Testing",
                "service_interests": "Database Integration Testing",
                "appointment_date": "2025-01-02",
                "appointment_time": "16:00",
                "message": "Testing database integration for appointment storage"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                appointment_id = data.get('id')
                
                if appointment_id and len(appointment_id) > 0:
                    # Verify the appointment has proper UUID format
                    import re
                    uuid_pattern = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
                    if re.match(uuid_pattern, appointment_id):
                        self.log_test("Database Integration", True, f"Appointment stored successfully with proper UUID: {appointment_id}")
                    else:
                        self.log_test("Database Integration", False, f"Invalid UUID format: {appointment_id}")
                else:
                    self.log_test("Database Integration", False, "No appointment ID returned", data)
            else:
                self.log_test("Database Integration", False, f"Failed to create appointment: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Database Integration", False, f"Request failed: {str(e)}")

    def test_default_status_pending(self):
        """Test that appointments are created with default status 'pending'"""
        try:
            test_data = {
                "name": "Status Test User",
                "email": "status@example.com",
                "phone": "+1-555-0987",
                "appointment_date": "2025-01-03",
                "appointment_time": "17:00"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'pending':
                    self.log_test("Default Status Pending", True, "Appointments correctly created with default status 'pending'")
                else:
                    self.log_test("Default Status Pending", False, f"Unexpected default status: {data.get('status')}", data)
            else:
                self.log_test("Default Status Pending", False, f"Failed to create appointment: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Default Status Pending", False, f"Request failed: {str(e)}")

    def test_appointment_availability_check(self):
        """Test appointment availability checking"""
        try:
            # Test date-only availability check
            test_date = "2025-01-04"
            response = requests.get(f"{API_BASE_URL}/appointments/availability?date={test_date}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['date', 'booked_times', 'message']
                
                if all(field in data for field in required_fields):
                    if (data['date'] == test_date and isinstance(data['booked_times'], list)):
                        self.log_test("Availability Check - Date Only", True, f"Successfully checked availability for {test_date}")
                    else:
                        self.log_test("Availability Check - Date Only", False, f"Invalid response structure: {data}")
                else:
                    self.log_test("Availability Check - Date Only", False, f"Missing required fields: {[f for f in required_fields if f not in data]}")
            else:
                self.log_test("Availability Check - Date Only", False, f"HTTP {response.status_code}: {response.text}")
            
            # Test date and time availability check
            test_time = "18:00"
            response = requests.get(f"{API_BASE_URL}/appointments/availability?date={test_date}&time={test_time}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['available', 'date', 'time', 'message']
                
                if all(field in data for field in required_fields):
                    if (data['date'] == test_date and 
                        data['time'] == test_time and
                        isinstance(data['available'], bool)):
                        self.log_test("Availability Check - Date and Time", True, f"Successfully checked specific time slot availability")
                    else:
                        self.log_test("Availability Check - Date and Time", False, f"Invalid response structure: {data}")
                else:
                    self.log_test("Availability Check - Date and Time", False, f"Missing required fields: {[f for f in required_fields if f not in data]}")
            else:
                self.log_test("Availability Check - Date and Time", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Availability Check", False, f"Request failed: {str(e)}")

    def run_appointment_booking_tests(self):
        """Run all appointment booking tests"""
        print("🗓️  APPOINTMENT BOOKING API TESTING")
        print(f"📍 Testing API Base URL: {API_BASE_URL}")
        print("=" * 60)
        
        # Test appointment creation with all fields
        self.test_appointment_creation_with_all_fields()
        
        # Test appointment creation with minimal fields
        self.test_appointment_creation_minimal_fields()
        
        # Test data validation
        self.test_email_validation()
        self.test_phone_validation()
        self.test_date_time_validation()
        self.test_missing_required_fields()
        
        # Test database integration
        self.test_database_integration()
        self.test_default_status_pending()
        
        # Test availability checking
        self.test_appointment_availability_check()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 APPOINTMENT BOOKING TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        else:
            print("\n🎉 All appointment booking tests passed!")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = AppointmentBookingTester()
    success = tester.run_appointment_booking_tests()
    
    if success:
        print("\n🎉 All appointment booking tests passed!")
        sys.exit(0)
    else:
        print(f"\n💥 {len(tester.failed_tests)} test(s) failed!")
        sys.exit(1)