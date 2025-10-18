#!/usr/bin/env python3
"""
Script to add mock companies to the Lead G application
via the admin API
"""
import requests
import json
import sys

# Configuration
BACKEND_URL = "http://localhost:8001"
ADMIN_EMAIL = "toiral.dev@gmail.com"
ADMIN_PASSWORD = "testadmin"

# Mock companies data with real company logos from Clearbit
MOCK_COMPANIES = [
    {
        "company_name": "Microsoft",
        "logo_url": "https://logo.clearbit.com/microsoft.com",
        "website_url": "https://www.microsoft.com",
        "display_order": 1
    },
    {
        "company_name": "Apple",
        "logo_url": "https://logo.clearbit.com/apple.com",
        "website_url": "https://www.apple.com",
        "display_order": 2
    },
    {
        "company_name": "Google",
        "logo_url": "https://logo.clearbit.com/google.com",
        "website_url": "https://www.google.com",
        "display_order": 3
    },
    {
        "company_name": "Amazon",
        "logo_url": "https://logo.clearbit.com/amazon.com",
        "website_url": "https://www.amazon.com",
        "display_order": 4
    },
    {
        "company_name": "Meta",
        "logo_url": "https://logo.clearbit.com/meta.com",
        "website_url": "https://www.meta.com",
        "display_order": 5
    },
    {
        "company_name": "Tesla",
        "logo_url": "https://logo.clearbit.com/tesla.com",
        "website_url": "https://www.tesla.com",
        "display_order": 6
    },
    {
        "company_name": "Netflix",
        "logo_url": "https://logo.clearbit.com/netflix.com",
        "website_url": "https://www.netflix.com",
        "display_order": 7
    },
    {
        "company_name": "Salesforce",
        "logo_url": "https://logo.clearbit.com/salesforce.com",
        "website_url": "https://www.salesforce.com",
        "display_order": 8
    },
    {
        "company_name": "Adobe",
        "logo_url": "https://logo.clearbit.com/adobe.com",
        "website_url": "https://www.adobe.com",
        "display_order": 9
    },
    {
        "company_name": "IBM",
        "logo_url": "https://logo.clearbit.com/ibm.com",
        "website_url": "https://www.ibm.com",
        "display_order": 10
    },
    {
        "company_name": "Oracle",
        "logo_url": "https://logo.clearbit.com/oracle.com",
        "website_url": "https://www.oracle.com",
        "display_order": 11
    },
    {
        "company_name": "Samsung",
        "logo_url": "https://logo.clearbit.com/samsung.com",
        "website_url": "https://www.samsung.com",
        "display_order": 12
    }
]

def get_admin_token():
    """Login and get admin token"""
    print(f"🔐 Logging in as admin: {ADMIN_EMAIL}")
    
    response = requests.post(
        f"{BACKEND_URL}/api/admin/login",
        json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        },
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 200:
        data = response.json()
        token = data.get('access_token')
        print(f"✅ Login successful! Token received.")
        return token
    else:
        print(f"❌ Login failed: {response.status_code}")
        print(f"   Response: {response.text}")
        sys.exit(1)

def add_company(token, company_data):
    """Add a single company"""
    print(f"➕ Adding company: {company_data['company_name']}...")
    
    response = requests.post(
        f"{BACKEND_URL}/api/worked-with",
        json=company_data,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"   ✅ Added successfully! ID: {result.get('id', 'N/A')}")
        return True
    else:
        print(f"   ❌ Failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return False

def get_existing_companies(token):
    """Get list of existing companies"""
    print("\n📋 Checking existing companies...")
    
    response = requests.get(
        f"{BACKEND_URL}/api/worked-with",
        headers={
            "Content-Type": "application/json"
        }
    )
    
    if response.status_code == 200:
        companies = response.json()
        print(f"   Found {len(companies)} existing companies")
        return companies
    else:
        print(f"   ⚠️  Could not fetch existing companies: {response.status_code}")
        return []

def main():
    print("=" * 60)
    print("🏢 Lead G - Mock Companies Creator")
    print("=" * 60)
    print()
    
    # Step 1: Get admin token
    token = get_admin_token()
    print()
    
    # Step 2: Check existing companies
    existing_companies = get_existing_companies(token)
    existing_names = [c.get('company_name') for c in existing_companies]
    print()
    
    # Step 3: Add mock companies
    print(f"🚀 Adding {len(MOCK_COMPANIES)} mock companies...")
    print("-" * 60)
    
    added_count = 0
    skipped_count = 0
    failed_count = 0
    
    for company in MOCK_COMPANIES:
        # Skip if company already exists
        if company['company_name'] in existing_names:
            print(f"⏭️  Skipping: {company['company_name']} (already exists)")
            skipped_count += 1
            continue
        
        if add_company(token, company):
            added_count += 1
        else:
            failed_count += 1
    
    print()
    print("=" * 60)
    print("📊 Summary:")
    print(f"   ✅ Added: {added_count}")
    print(f"   ⏭️  Skipped: {skipped_count}")
    print(f"   ❌ Failed: {failed_count}")
    print(f"   📋 Total companies now: {len(existing_companies) + added_count}")
    print("=" * 60)
    print()
    
    if added_count > 0 or len(existing_companies) > 0:
        print("🎉 Mock companies are ready!")
        print(f"   Visit the homepage to see them in the 'Worked With' section")
        print(f"   Or check the admin panel: http://localhost:3000/admin")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
