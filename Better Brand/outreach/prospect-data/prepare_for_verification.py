#!/usr/bin/env python3
"""
Prepare emails for MillionVerifier and create template for re-import.
"""

import csv

def main():
    print("=" * 100)
    print("PREPARING EMAILS FOR MILLIONVERIFIER")
    print("=" * 100)
    print()
    
    # Read the database
    input_file = '/Users/aaron/BetterWebsite Contacts Official/BUSINESSES_WITH_EMAILS_CLEANED.csv'
    
    print(f"Reading: {input_file}")
    
    businesses = []
    all_emails = []
    email_to_businesses = {}  # Map email to business info
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            businesses.append(row)
            
            emails_str = row['emails']
            if emails_str and emails_str != 'No valid emails found':
                # Split by comma
                emails = [e.strip() for e in emails_str.split(',')]
                
                for email in emails:
                    if email and '@' in email:
                        all_emails.append(email)
                        
                        # Map email to business details
                        if email not in email_to_businesses:
                            email_to_businesses[email] = []
                        email_to_businesses[email].append(row)
    
    print(f"  Loaded {len(businesses):,} businesses")
    print(f"  Found {len(all_emails):,} total emails")
    print(f"  Unique emails: {len(email_to_businesses):,}")
    print()
    
    # Create email list for MillionVerifier (simple CSV with just emails)
    verification_file = '/Users/aaron/BetterWebsite Contacts Official/EMAILS_FOR_VERIFICATION.csv'
    
    with open(verification_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['email'])  # Header
        for email in sorted(set(all_emails)):
            writer.writerow([email])
    
    print(f"✓ Created: {verification_file}")
    print(f"  Contains {len(set(all_emails)):,} unique emails")
    print()
    
    print("=" * 100)
    print("NEXT STEPS:")
    print("=" * 100)
    print()
    print("1. Upload EMAILS_FOR_VERIFICATION.csv to MillionVerifier")
    print("   → https://www.millionverifier.com/")
    print()
    print("2. Download the verified results CSV from MillionVerifier")
    print("   → It will have columns like: email, result, free, role, etc.")
    print()
    print("3. Save the verified CSV as 'VERIFIED_EMAILS.csv' in this folder")
    print()
    print("4. Run the re-import script (I'll create this next)")
    print()
    print("The system will:")
    print("  • Match verified emails back to businesses")
    print("  • Keep only 'ok', 'catch_all', or 'valid' emails")
    print("  • Remove invalid/disposable/role emails")
    print("  • Create Instantly.ai format (1 row per email)")
    print()

if __name__ == '__main__':
    main()

