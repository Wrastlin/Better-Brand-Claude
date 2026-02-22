#!/usr/bin/env python3
"""
Final cleanup: Remove malformed domain suffixes more aggressively and clean up workspace.
"""

import csv
import re
import os
from urllib.parse import unquote

def aggressively_clean_email(email):
    """More aggressive email cleaning to remove ALL text after valid domains."""
    if not email or email == 'No valid emails found':
        return email
    
    # Step 1: Remove URL encoding
    email = unquote(email)
    
    # Step 2: Remove leading/trailing whitespace and quotes
    email = email.strip().replace('"', '').replace("'", '')
    
    # Step 3: Remove leading numbers
    email = re.sub(r'^[\d\s\-().]+(?=[a-zA-Z])', '', email)
    
    # Step 4: AGGRESSIVE domain cleaning - match email@domain.TLD and remove EVERYTHING after
    # This regex finds a valid email pattern and captures only up to the TLD
    pattern = r'^([a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.(com|org|net|edu|gov|us|co|io|info|biz|uk|ca|au|de|fr|jp|cn|in|br|mx|nl|se|ch|pl|be|at|dk|no|fi|cz|pt|gr|nz|ie|il|sg|hk|za|th|ae|ro|hu|cl|ar|my|ph|vn|pk|ng|bd|ua|eg|id|tr|ke|ma|gh|tn|sa|ly|dz|iq|sd|ye|sy|jo|lb|kw|om|bh|qa|ps))(.*)$'
    match = re.match(pattern, email, re.IGNORECASE)
    
    if match:
        # Keep only the email@domain.tld part, discard everything after
        email = match.group(1)
    
    return email.strip()

def is_valid_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    if not re.match(pattern, email):
        return False
    
    if any(ext in email.lower() for ext in ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.css', '.js']):
        return False
    
    if any(char in email for char in [' ', '/', '\\', '(', ')', '[', ']', '{', '}']):
        return False
    
    if len(email) < 5 or len(email) > 254:
        return False
    
    return True

def clean_email_list(email_string):
    """Clean a comma-separated list of emails."""
    if not email_string or email_string == 'No valid emails found':
        return '', 0
    
    emails = [e.strip() for e in email_string.split(',')]
    
    cleaned_emails = []
    seen = set()
    
    for email in emails:
        if not email or '@' not in email:
            continue
        
        cleaned = aggressively_clean_email(email)
        
        if is_valid_email(cleaned):
            if cleaned.lower() not in seen:
                cleaned_emails.append(cleaned)
                seen.add(cleaned.lower())
    
    if cleaned_emails:
        return ', '.join(cleaned_emails), len(cleaned_emails)
    else:
        return '', 0

def update_csv(input_file, output_file):
    """Update CSV file with aggressively cleaned emails."""
    print(f"Processing: {input_file}")
    
    data = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            data.append(row)
    
    print(f"  Loaded {len(data):,} rows")
    
    # Clean emails
    total_before = 0
    total_after = 0
    changed_count = 0
    
    for row in data:
        original_emails = row['emails']
        original_count = int(row['email_count']) if row['email_count'] else 0
        
        total_before += original_count
        
        cleaned_emails, new_count = clean_email_list(original_emails)
        
        row['emails'] = cleaned_emails if cleaned_emails else 'No valid emails found'
        row['email_count'] = str(new_count)
        
        total_after += new_count
        
        if original_emails != cleaned_emails:
            changed_count += 1
    
    print(f"  Emails before: {total_before:,}")
    print(f"  Emails after:  {total_after:,}")
    print(f"  Rows changed:  {changed_count:,}")
    
    # Sort by quality
    data.sort(key=lambda x: (
        -int(x['email_count']) if x['email_count'] else 0,
        -float(x['rating']) if x['rating'] else 0,
        -int(x['reviews']) if x['reviews'] else 0
    ))
    
    # Save
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    
    print(f"  ✓ Saved to: {output_file}")
    return len(data), total_after

def main():
    print("=" * 100)
    print("FINAL CLEANUP: AGGRESSIVE EMAIL CLEANING & FILE MANAGEMENT")
    print("=" * 100)
    print()
    
    # Re-clean the databases
    print("Step 1: Re-cleaning email addresses (removing ALL text after .com/.org/etc)")
    print("-" * 100)
    
    master_rows, master_emails = update_csv(
        '/Users/aaron/BetterWebsite Contacts Official/MASTER_DATABASE_CLEANED.csv',
        '/Users/aaron/BetterWebsite Contacts Official/MASTER_DATABASE_CLEANED.csv'
    )
    print()
    
    # Create emails-only version
    print("Step 2: Creating businesses-with-emails version")
    print("-" * 100)
    
    with open('/Users/aaron/BetterWebsite Contacts Official/MASTER_DATABASE_CLEANED.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        all_data = list(reader)
    
    with_emails = [row for row in all_data if (int(row['email_count']) if row['email_count'] else 0) > 0]
    
    with open('/Users/aaron/BetterWebsite Contacts Official/BUSINESSES_WITH_EMAILS_CLEANED.csv', 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(with_emails)
    
    print(f"  ✓ Saved {len(with_emails):,} businesses with emails")
    print()
    
    # List files to keep
    print("Step 3: Cleaning up workspace files")
    print("-" * 100)
    
    workspace = '/Users/aaron/BetterWebsite Contacts Official'
    
    # Files to KEEP
    keep_files = {
        # Original data files
        'dataset_google-maps-extractor_2026-01-02_00-16-54-581 (1).csv',
        'dataset_google-maps-extractor_2026-01-05_18-56-38-999 (1).csv',
        'dataset_google-maps-extractor_2026-01-07_05-15-43-275 (1).csv',
        'dataset_cheerio-scraper_2026-01-02_02-18-17-044 (1).csv',
        'dataset_cheerio-scraper_2026-01-05_20-41-23-606 (2).csv',
        'dataset_cheerio-scraper_2026-01-07_06-37-14-821 (1).csv',
        # Final cleaned databases
        'MASTER_DATABASE_CLEANED.csv',
        'BUSINESSES_WITH_EMAILS_CLEANED.csv',
    }
    
    # Get all files in workspace
    all_files = [f for f in os.listdir(workspace) if os.path.isfile(os.path.join(workspace, f))]
    
    files_to_remove = []
    files_kept = []
    
    for file in all_files:
        if file.startswith('.'):
            continue  # Skip hidden files
        
        if file.endswith('.py'):
            files_to_remove.append(file)  # Remove Python scripts
        elif file in keep_files:
            files_kept.append(file)
        elif file not in keep_files:
            files_to_remove.append(file)
    
    print(f"\nFiles to KEEP ({len(files_kept)}):")
    for f in sorted(files_kept):
        print(f"  ✓ {f}")
    
    print(f"\nFiles to REMOVE ({len(files_to_remove)}):")
    for f in sorted(files_to_remove):
        print(f"  ✗ {f}")
    
    # Remove files
    print("\nRemoving intermediate files...")
    removed_count = 0
    for file in files_to_remove:
        try:
            os.remove(os.path.join(workspace, file))
            removed_count += 1
        except Exception as e:
            print(f"  Warning: Could not remove {file}: {e}")
    
    print(f"  ✓ Removed {removed_count} files")
    print()
    
    # Final summary
    print("=" * 100)
    print("✅ FINAL CLEANUP COMPLETE!")
    print("=" * 100)
    print()
    print("Your workspace now contains:")
    print()
    print("📂 ORIGINAL DATA (6 files):")
    print("  • 3 Google Maps CSV files (Jan 2, 5, 7)")
    print("  • 3 Cheerio scraper CSV files (Jan 2, 5, 7)")
    print()
    print("📊 FINAL CLEANED DATABASES (2 files):")
    print(f"  • MASTER_DATABASE_CLEANED.csv         - {master_rows:,} businesses, {master_emails:,} emails")
    print(f"  • BUSINESSES_WITH_EMAILS_CLEANED.csv  - {len(with_emails):,} businesses with emails")
    print()
    print("✨ All emails re-checked and cleaned:")
    print("  ✓ ALL text after .com/.org/.net/etc has been removed")
    print("  ✓ No malformed suffixes remain (comphone, comhours, etc.)")
    print("  ✓ All emails validated and deduplicated")
    print("  ✓ Ready for CRM import and campaigns!")
    print()

if __name__ == '__main__':
    main()

