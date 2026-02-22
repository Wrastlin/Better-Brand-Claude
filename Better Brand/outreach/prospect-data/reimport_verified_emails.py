#!/usr/bin/env python3
"""
Re-import verified emails from MillionVerifier and create Instantly.ai format.
"""

import csv

def main():
    print("=" * 100)
    print("RE-IMPORTING VERIFIED EMAILS")
    print("=" * 100)
    print()
    
    # Read verified emails from MillionVerifier
    verified_file = '/Users/aaron/BetterWebsite Contacts Official/VERIFIED_EMAILS.csv'
    
    print(f"Reading verified emails from: {verified_file}")
    
    verified_emails = {}
    total_verified = 0
    
    try:
        with open(verified_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                email = row.get('email', '').strip().lower()
                result = row.get('result', '').strip().lower()
                
                # MillionVerifier results: ok, catch_all, unknown, invalid, disposable, role
                # We want to keep: ok, catch_all
                if result in ['ok', 'catch_all', 'valid']:
                    verified_emails[email] = result
                    total_verified += 1
        
        print(f"  ✓ Loaded {total_verified:,} verified emails (ok/catch_all/valid)")
    except FileNotFoundError:
        print(f"  ✗ ERROR: {verified_file} not found!")
        print()
        print("Please:")
        print("  1. Upload EMAILS_FOR_VERIFICATION.csv to MillionVerifier")
        print("  2. Download the results")
        print("  3. Save as 'VERIFIED_EMAILS.csv' in this folder")
        print("  4. Run this script again")
        return
    
    print()
    
    # Read business database
    database_file = '/Users/aaron/BetterWebsite Contacts Official/BUSINESSES_WITH_EMAILS_CLEANED.csv'
    
    print(f"Reading business database: {database_file}")
    
    businesses = []
    with open(database_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            businesses.append(row)
    
    print(f"  Loaded {len(businesses):,} businesses")
    print()
    
    # Update businesses with only verified emails
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
        if updated_businesses:
            fieldnames = list(updated_businesses[0].keys())
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
            instantly_rows.append({
                'email': email,
                'first_name': '',  # Can be filled later or left empty
                'last_name': '',   # Can be filled later or left empty
                'company_name': business['business_name'],
                'website': business['website'],
                'phone': business['phone'],
                'address': f"{business['street']}, {business['city']}, {business['state']} {business['country']}".strip().strip(','),
                'city': business['city'],
                'state': business['state'],
                'country': business['country'],
                'category': business['category'],
                'rating': business['rating'],
                'reviews': business['reviews'],
                'platform': business['platform'],
                'google_maps_url': business['google_maps_url'],
                'custom_field_1': '',  # Add custom fields as needed
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
    
    # Summary
    print("=" * 100)
    print("SUMMARY")
    print("=" * 100)
    print()
    print(f"Total businesses processed:        {len(businesses):,}")
    print(f"Businesses with verified emails:   {len(updated_businesses):,}")
    print(f"Total verified emails:             {total_verified_count:,}")
    print(f"Rows for Instantly.ai:             {len(instantly_rows):,}")
    print()
    print("Files created:")
    print(f"  1. DATABASE_VERIFIED_EMAILS_ONLY.csv  - Updated business database")
    print(f"  2. INSTANTLY_AI_IMPORT.csv            - Ready for Instantly.ai import")
    print()
    print("Instantly.ai format:")
    print("  • 1 row = 1 email address")
    print("  • All business details copied to each row")
    print("  • Empty first_name/last_name fields (can be enriched)")
    print("  • Custom fields available for segmentation")
    print()
    print("✅ Ready to import to Instantly.ai!")
    print()

if __name__ == '__main__':
    main()

