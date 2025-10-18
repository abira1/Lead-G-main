"""
Seed script to populate the database with demo testimonials and companies
This will transfer the hardcoded demo data from frontend to the actual database
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import firebase_db
from models import Testimonial, WorkedWithCompany
from datetime import datetime
import uuid

def seed_testimonials():
    """Seed demo testimonials into the database"""
    demo_testimonials = [
        {
            "company_name": "TechStart Inc.",
            "author": "Sarah Johnson - CEO & Founder",
            "testimonial": "LeadG transformed our lead generation completely. Within 3 months, we saw a 250% increase in qualified leads. Their telemarketing team is professional and truly understands our industry.",
            "logo_url": "https://logo.clearbit.com/techstars.com"
        },
        {
            "company_name": "GreenEnergy Solutions",
            "author": "Michael Rodriguez - VP of Sales",
            "testimonial": "The government contracting expertise LeadG provided was exceptional. They helped us secure $2.5M in federal contracts. Their team knows the ins and outs of the procurement process.",
            "logo_url": "https://logo.clearbit.com/greenenergysolutions.com"
        },
        {
            "company_name": "PropertyMax Realty",
            "author": "Emily Chen - Director of Marketing",
            "testimonial": "Our real estate leads increased by 180% after partnering with LeadG. Their social media marketing and targeted telemarketing campaigns generated high-quality prospects consistently.",
            "logo_url": "https://logo.clearbit.com/remax.com"
        },
        {
            "company_name": "FinanceFirst Capital",
            "author": "David Thompson - Managing Partner",
            "testimonial": "LeadG's hard money lending lead generation service is outstanding. They understand our target market and consistently deliver qualified borrowers. ROI has been phenomenal.",
            "logo_url": "https://logo.clearbit.com/capitalfirst.com"
        },
        {
            "company_name": "SolarTech Innovations",
            "author": "Lisa Martinez - Business Development Manager",
            "testimonial": "Working with LeadG has been a game-changer for our solar installation business. Their appointment setting service book 40+ qualified meetings monthly. Highly recommended!",
            "logo_url": "https://logo.clearbit.com/solarcity.com"
        }
    ]
    
    print("Seeding testimonials...")
    for testimonial_data in demo_testimonials:
        testimonial = Testimonial(
            id=str(uuid.uuid4()),
            created_at=datetime.utcnow(),
            **testimonial_data
        )
        
        doc_ref = firebase_db.get_collection('testimonials').document(testimonial.id)
        doc_ref.set(testimonial.dict())
        print(f"✓ Added testimonial: {testimonial.company_name}")
    
    print(f"\n✅ Successfully seeded {len(demo_testimonials)} testimonials")

def seed_worked_with_companies():
    """Seed demo 'Worked With' companies into the database"""
    demo_companies = [
        {
            "company_name": "Microsoft",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            "website_url": "https://www.microsoft.com",
            "display_order": 1
        },
        {
            "company_name": "Apple",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            "website_url": "https://www.apple.com",
            "display_order": 2
        },
        {
            "company_name": "Google",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            "website_url": "https://www.google.com",
            "display_order": 3
        },
        {
            "company_name": "Amazon",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            "website_url": "https://www.amazon.com",
            "display_order": 4
        },
        {
            "company_name": "Tesla",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
            "website_url": "https://www.tesla.com",
            "display_order": 5
        },
        {
            "company_name": "Netflix",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            "website_url": "https://www.netflix.com",
            "display_order": 6
        },
        {
            "company_name": "Meta",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
            "website_url": "https://www.meta.com",
            "display_order": 7
        },
        {
            "company_name": "Salesforce",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
            "website_url": "https://www.salesforce.com",
            "display_order": 8
        },
        {
            "company_name": "Adobe",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg",
            "website_url": "https://www.adobe.com",
            "display_order": 9
        },
        {
            "company_name": "IBM",
            "logo_url": "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
            "website_url": "https://www.ibm.com",
            "display_order": 10
        }
    ]
    
    print("\nSeeding worked with companies...")
    for company_data in demo_companies:
        company = WorkedWithCompany(
            id=str(uuid.uuid4()),
            created_at=datetime.utcnow(),
            **company_data
        )
        
        doc_ref = firebase_db.get_collection('worked_with_companies').document(company.id)
        doc_ref.set(company.dict())
        print(f"✓ Added company: {company.company_name}")
    
    print(f"\n✅ Successfully seeded {len(demo_companies)} companies")

def clear_collections():
    """Clear existing data from collections"""
    print("\nClearing existing data...")
    
    # Clear testimonials
    testimonials_docs = firebase_db.get_collection('testimonials').get()
    for doc in testimonials_docs:
        doc.reference.delete()
    print(f"✓ Cleared {len(testimonials_docs)} testimonials")
    
    # Clear worked with companies
    companies_docs = firebase_db.get_collection('worked_with_companies').get()
    for doc in companies_docs:
        doc.reference.delete()
    print(f"✓ Cleared {len(companies_docs)} companies")

if __name__ == "__main__":
    print("=" * 60)
    print("Lead G - Database Seed Script")
    print("=" * 60)
    
    # Ask user if they want to clear existing data
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == '--clear':
        clear_collections()
    
    # Seed the data
    seed_testimonials()
    seed_worked_with_companies()
    
    print("\n" + "=" * 60)
    print("✅ Database seeding completed successfully!")
    print("=" * 60)
    print("\nYou can now:")
    print("1. View the data in the admin panel")
    print("2. See it displayed on the website")
    print("3. Edit/delete items through the admin interface")
    print("\nTo clear and re-seed, run: python seed_data.py --clear")
