#!/usr/bin/env python3
"""
Deduplicate Instantly.ai import to keep only 1 email per company.
Prioritize: non-generic emails, then shortest email.
"""

import csv
import re

def is_generic_email(email):
    """Check if email is generic (info@, contact@, etc.)"""
    generic_prefixes = [
        'info@', 'contact@', 'hello@', 'support@', 'sales@',
        'admin@', 'office@', 'mail@', 'inquiries@', 'inquiry@',
        'general@', 'customerservice@', 'service@', 'help@'
    ]
    email_lower = email.lower()
    return any(email_lower.startswith(prefix) for prefix in generic_prefixes)

def score_email(email):
    """
    Score email quality (lower is better).
    Prioritize: personal emails > generic emails, shorter > longer
    """
    score = 0
    
    # Generic emails get penalty
    if is_generic_email(email):
        score += 1000
    
    # Length as tiebreaker (shorter is better)
    score += len(email)
    
    return score

def main():
    print("=" * 100)
    print("DEDUPLICATING INSTANTLY.AI IMPORT - 1 EMAIL PER COMPANY")
    print("=" * 100)
    print()
    
    instantly_file = '/Users/aaron/BetterWebsite Contacts Official/INSTANTLY_AI_IMPORT.csv'
    
    print(f"Reading: {instantly_file}")
    
    # Read all rows
    all_rows = []
    with open(instantly_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            all_rows.append(row)
    
    print(f"  Loaded {len(all_rows):,} rows (emails)")
    print()
    
    # Group by company (using website as unique identifier)
    companies = {}
    
    for row in all_rows:
        website = row['website'].strip()
        company_name = row['company_name'].strip()
        
        # Use website as key (most reliable unique identifier)
        key = website if website else company_name
        
        if key not in companies:
            companies[key] = []
        
        companies[key].append(row)
    
    print(f"Found {len(companies):,} unique companies")
    print()
    
    # For each company, keep only the best email
    print("Selecting best email for each company...")
    
    deduped_rows = []
    companies_with_multiple = 0
    total_emails_removed = 0
    
    for company_key, rows in companies.items():
        if len(rows) > 1:
            companies_with_multiple += 1
            total_emails_removed += len(rows) - 1
            
            # Score each email and pick the best one
            scored_rows = []
            for row in rows:
                email = row['email']
                score = score_email(email)
                scored_rows.append((score, row))
            
            # Sort by score (lower is better) and take the best
            scored_rows.sort(key=lambda x: x[0])
            best_row = scored_rows[0][1]
            deduped_rows.append(best_row)
            
            # Log if we removed multiple emails
            if len(rows) > 2:
                print(f"  {rows[0]['company_name']}: {len(rows)} emails → kept {best_row['email']}")
        else:
            # Only one email for this company
            deduped_rows.append(rows[0])
    
    print()
    print(f"  ✓ {companies_with_multiple:,} companies had multiple emails")
    print(f"  ✓ Removed {total_emails_removed:,} duplicate emails")
    print(f"  ✓ Kept {len(deduped_rows):,} unique companies")
    print()
    
    # Save deduplicated file
    output_file = '/Users/aaron/BetterWebsite Contacts Official/INSTANTLY_AI_IMPORT_DEDUPED.csv'
    
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(deduped_rows)
    
    print(f"✓ Saved: {output_file}")
    print()
    
    # Summary
    print("=" * 100)
    print("✅ DEDUPLICATION COMPLETE!")
    print("=" * 100)
    print()
    print(f"Before:  {len(all_rows):,} emails")
    print(f"After:   {len(deduped_rows):,} emails (1 per company)")
    print(f"Removed: {total_emails_removed:,} duplicate emails")
    print()
    print("Email Selection Priority:")
    print("  1. Personal emails (not info@, contact@, etc.)")
    print("  2. Shorter email addresses (more likely to be personal)")
    print()
    print("Benefits:")
    print("  ✓ No duplicate outreach to same company")
    print("  ✓ Better sender reputation")
    print("  ✓ More professional approach")
    print("  ✓ Higher response rates")
    print()
    print(f"🚀 Use INSTANTLY_AI_IMPORT_DEDUPED.csv for your campaign!")
    print()

if __name__ == '__main__':
    main()

