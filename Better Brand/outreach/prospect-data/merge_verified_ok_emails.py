#!/usr/bin/env python3
"""
Merge verified OK emails and create Instantly.ai format.
"""

import csv

def main():
    print("=" * 100)
    print("MERGING VERIFIED OK EMAILS")
    print("=" * 100)
    print()
    
    # Read verified OK emails
    verified_file = '/Users/aaron/BetterWebsite Contacts Official/EMAILS_FOR_VERIFICATION_OK_ONLY_MILLIONVERIFIER.COM.csv'
    
    print(f"Reading verified OK emails from: {verified_file}")
    
    verified_emails = set()
    
    with open(verified_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get('email', '').strip()
            if email:
                verified_emails.add(email.lower())
    
    print(f"  ✓ Loaded {len(verified_emails):,} verified OK emails")
    print()
    
    # Read business database
    database_file = '/Users/aaron/BetterWebsite Contacts Official/BUSINESSES_WITH_EMAILS_CLEANED.csv'
    
    print(f"Reading business database: {database_file}")
    
    businesses = []
    with open(database_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            businesses.append(row)
    
    print(f"  Loaded {len(businesses):,} businesses")
    print()
    
    # Match verified emails to businesses
    print("Matching verified emails to businesses...")
    
    updated_businesses = []
    total_verified_count = 0
    businesses_with_verified = 0
    
    for business in businesses:
        emails_str = business['emails']
        
        if not emails_str or emails_str == 'No valid emails found':
            continue
        
        # Split and check each email
        original_emails = [e.strip() for e in emails_str.split(',')]
        verified_only = []
        
        for email in original_emails:
            if email.lower() in verified_emails:
                verified_only.append(email)
        
        if verified_only:
            business['emails'] = ', '.join(verified_only)
            business['email_count'] = str(len(verified_only))
            updated_businesses.append(business)
            total_verified_count += len(verified_only)
            businesses_with_verified += 1
    
    print(f"  ✓ {businesses_with_verified:,} businesses have verified emails")
    print(f"  ✓ {total_verified_count:,} total verified emails")
    print()
    
    # Save updated database with only verified emails
    output_db = '/Users/aaron/BetterWebsite Contacts Official/DATABASE_VERIFIED_EMAILS_ONLY.csv'
    
    with open(output_db, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(updated_businesses)
    
    print(f"✓ Saved: {output_db}")
    print(f"  Contains {len(updated_businesses):,} businesses with verified emails")
    print()
    
    # Create Instantly.ai format (1 row per email)
    print("Creating Instantly.ai format (1 email per row)...")
    
    instantly_rows = []
    
    for business in updated_businesses:
        emails_str = business['emails']
        emails = [e.strip() for e in emails_str.split(',')]
        
        # Create one row per email
        for email in emails:
            # Clean up address
            address_parts = []
            if business['street']:
                address_parts.append(business['street'])
            if business['city']:
                address_parts.append(business['city'])
            if business['state']:
                address_parts.append(business['state'])
            if business['country']:
                address_parts.append(business['country'])
            
            full_address = ', '.join(address_parts)
            
            instantly_rows.append({
                'email': email,
                'first_name': '',
                'last_name': '',
                'company_name': business['business_name'],
                'website': business['website'],
                'phone': business['phone'],
                'address': full_address,
                'city': business['city'],
                'state': business['state'],
                'country': business['country'],
                'category': business['category'],
                'rating': business['rating'],
                'reviews': business['reviews'],
                'platform': business['platform'],
                'google_maps_url': business['google_maps_url'],
                'custom_field_1': '',
                'custom_field_2': '',
                'custom_field_3': '',
            })
    
    instantly_file = '/Users/aaron/BetterWebsite Contacts Official/INSTANTLY_AI_IMPORT.csv'
    
    with open(instantly_file, 'w', encoding='utf-8', newline='') as f:
        fieldnames = [
            'email', 'first_name', 'last_name', 'company_name', 'website', 'phone',
            'address', 'city', 'state', 'country', 'category', 'rating', 'reviews',
            'platform', 'google_maps_url', 'custom_field_1', 'custom_field_2', 'custom_field_3'
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(instantly_rows)
    
    print(f"✓ Saved: {instantly_file}")
    print(f"  Contains {len(instantly_rows):,} rows (1 email per row)")
    print()
    
    # Calculate statistics
    emails_per_business = total_verified_count / businesses_with_verified if businesses_with_verified > 0 else 0
    
    # Summary
    print("=" * 100)
    print("✅ MERGE COMPLETE!")
    print("=" * 100)
    print()
    print(f"Original businesses:               {len(businesses):,}")
    print(f"Businesses with verified emails:   {len(updated_businesses):,}")
    print(f"Total verified emails:             {total_verified_count:,}")
    print(f"Average emails per business:       {emails_per_business:.1f}")
    print()
    print(f"Instantly.ai rows created:         {len(instantly_rows):,}")
    print()
    print("Verification Results:")
    print(f"  • Started with:     8,381 emails")
    print(f"  • Verified OK:      {len(verified_emails):,} emails ({len(verified_emails)/8381*100:.1f}%)")
    print(f"  • Invalid/removed:  {8381 - len(verified_emails):,} emails")
    print()
    print("Files created:")
    print(f"  1. DATABASE_VERIFIED_EMAILS_ONLY.csv")
    print(f"     → {len(updated_businesses):,} businesses")
    print(f"     → Only verified OK emails")
    print(f"     → Same format as original database")
    print()
    print(f"  2. INSTANTLY_AI_IMPORT.csv")
    print(f"     → {len(instantly_rows):,} rows")
    print(f"     → 1 email per row")
    print(f"     → All business details included")
    print(f"     → Ready to import to Instantly.ai")
    print()
    print("🚀 Ready to import INSTANTLY_AI_IMPORT.csv to Instantly.ai!")
    print()

if __name__ == '__main__':
    main()

