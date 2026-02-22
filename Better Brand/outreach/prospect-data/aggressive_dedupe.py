#!/usr/bin/env python3
"""
Aggressive deduplication for Instantly.ai import.
Removes duplicate companies by name and base domain.
"""

import csv
from urllib.parse import urlparse

def get_base_domain(url):
    """Extract base domain from URL (e.g., nhacademy.net)"""
    if not url:
        return ""
    try:
        netloc = urlparse(url).netloc
        if not netloc:
            # Try prepending http if missing
            netloc = urlparse("http://" + url).netloc
        
        # Remove www.
        domain = netloc.replace('www.', '')
        return domain.lower().strip()
    except:
        return url.lower().strip()

def clean_company_name(name):
    """Normalize company name for better matching"""
    if not name:
        return ""
    # Remove common suffixes and normalize
    name = name.lower().strip()
    # Remove punctuation for better matching
    name = "".join(e for e in name if e.isalnum() or e.isspace())
    return name

def main():
    print("=" * 100)
    print("🚀 AGGRESSIVE DEDUPLICATION - 1 EMAIL PER ENTIRE ENTITY")
    print("=" * 100)
    
    input_file = '/Users/aaron/BetterWebsite Contacts Official/INSTANTLY_AI_IMPORT_FINAL.csv'
    
    all_rows = []
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            all_rows.append(row)
    
    print(f"Current leads: {len(all_rows):,}")
    
    # Track duplicates using three keys
    seen_domains = {}
    seen_names = {}
    
    final_leads = []
    removed_by_domain = 0
    removed_by_name = 0
    
    for row in all_rows:
        domain = get_base_domain(row['website'])
        name = clean_company_name(row['company_name'])
        
        # 1. Check if we've seen this domain
        if domain and domain in seen_domains:
            removed_by_domain += 1
            continue
            
        # 2. Check if we've seen this company name (ignoring location differences)
        # This catches "New Horizon Academy - Location A" vs "New Horizon Academy - Location B"
        # We look for exact matches or names that start with the same brand
        is_duplicate_name = False
        for seen_name in seen_names:
            # If the name is exactly the same or very similar
            if name == seen_name or (len(name) > 10 and name.startswith(seen_name)) or (len(seen_name) > 10 and seen_name.startswith(name)):
                is_duplicate_name = True
                break
        
        if is_duplicate_name:
            removed_by_name += 1
            continue
            
        # If it passes both, it's a new unique entity
        final_leads.append(row)
        if domain: seen_domains[domain] = True
        if name: seen_names[name] = True

    print(f"  ✓ Removed {removed_by_domain:,} leads with duplicate base domains")
    print(f"  ✓ Removed {removed_by_name:,} leads with duplicate company names")
    print(f"  ✓ Kept {len(final_leads):,} unique entities")
    print()
    
    # Save the final cleaned file
    output_file = '/Users/aaron/BetterWebsite Contacts Official/INSTANTLY_AI_IMPORT_FINAL_V2.csv'
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(final_leads)
    
    print(f"✓ Saved: {output_file}")
    print()
    print("=" * 100)
    print("✅ AGGRESSIVE CLEANUP COMPLETE!")
    print("=" * 100)

if __name__ == '__main__':
    main()

