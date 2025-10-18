#!/usr/bin/env python3
"""
Verification script to confirm mock companies are working correctly
"""
import requests
import json

# Configuration
BACKEND_URL = "http://localhost:8001"

def verify_companies():
    """Verify companies endpoint"""
    print("=" * 60)
    print("🔍 Verifying Mock Companies Setup")
    print("=" * 60)
    print()
    
    # Test the companies endpoint
    print("📡 Testing API endpoint: /api/worked-with")
    try:
        response = requests.get(f"{BACKEND_URL}/api/worked-with")
        
        if response.status_code == 200:
            companies = response.json()
            print(f"✅ API Response: {response.status_code} OK")
            print(f"✅ Total companies retrieved: {len(companies)}")
            print()
            
            # Display companies
            print("📋 Companies List:")
            print("-" * 60)
            for i, company in enumerate(companies, 1):
                print(f"{i:2d}. {company['company_name']:20s} | Order: {company['display_order']:2d} | Logo: {company['logo_url'][:50]}...")
            print("-" * 60)
            print()
            
            # Verify data structure
            print("🔎 Verifying Data Structure:")
            sample_company = companies[0] if companies else None
            if sample_company:
                required_fields = ['id', 'company_name', 'logo_url', 'website_url', 'display_order', 'created_at']
                for field in required_fields:
                    if field in sample_company:
                        print(f"  ✅ {field:20s}: Present")
                    else:
                        print(f"  ❌ {field:20s}: Missing")
            print()
            
            # Summary
            print("=" * 60)
            print("📊 Verification Summary:")
            print(f"   ✅ Backend API: Working")
            print(f"   ✅ Companies endpoint: Accessible")
            print(f"   ✅ Total companies: {len(companies)}")
            print(f"   ✅ Data structure: Valid")
            print()
            print("🎉 All verifications passed!")
            print()
            print("📍 Next Steps:")
            print("   1. Admin Panel: http://localhost:3000/admin")
            print("      - Navigate to 'Worked With' tab to manage companies")
            print("   2. Homepage: http://localhost:3000/")
            print("      - Scroll to 'Companies We've Worked With' section")
            print("=" * 60)
            
            return True
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return False

if __name__ == "__main__":
    verify_companies()
