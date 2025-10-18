# Database Seeding Instructions

## Overview
The application uses an in-memory mock database for development. To populate it with demo data:

## Option 1: Using the API Endpoint (Recommended)

1. **Login to Admin Panel**
   - Go to the admin panel: `/admin`
   - Login with credentials:
     - Email: `toiral.dev@gmail.com`
     - Password: `testadmin`

2. **Call the Seed Endpoint**
   Open browser console (F12) and run:
   ```javascript
   fetch('/api/admin/seed-data', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
     }
   })
   .then(res => res.json())
   .then(data => {
     console.log('Seeding result:', data);
     alert('Database seeded! Refresh the page to see the data.');
   });
   ```

3. **Refresh the Page**
   - Reload the admin panel to see the seeded data
   - Navigate to "Testimonials" and "Worked With" tabs

## Option 2: Using cURL

```bash
# Get token
TOKEN=$(curl -s -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"toiral.dev@gmail.com","password":"testadmin"}' | python -c "import sys, json; print(json.load(sys.stdin)['access_token'])")

# Seed database
curl -X POST http://localhost:8001/api/admin/seed-data \
  -H "Authorization: Bearer $TOKEN"
```

## What Gets Seeded

### Testimonials (5 items)
- TechStart Inc.
- GreenEnergy Solutions
- PropertyMax Realty
- FinanceFirst Capital
- SolarTech Innovations

### Worked With Companies (10 items)
- Microsoft
- Apple
- Google
- Amazon
- Tesla
- Netflix
- Meta
- Salesforce
- Adobe
- IBM

## Important Notes

⚠️ **Mock Database Limitation**: The application uses an in-memory mock database. Data will be lost when:
- The backend server restarts
- The container restarts
- You deploy new code

💡 **For Production**: Configure a real Firebase Firestore database to persist data permanently.

## Verify Data

After seeding, verify the data:

```bash
# Check testimonials
curl http://localhost:8001/api/testimonials

# Check companies
curl http://localhost:8001/api/worked-with
```

## Admin Panel Access

Once seeded, you can:
1. View data in admin panel tabs
2. Edit existing testimonials/companies
3. Delete items
4. Add new items
5. All changes persist until server restart
