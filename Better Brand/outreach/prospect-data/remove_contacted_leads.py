#!/usr/bin/env python3
"""
Remove already-contacted leads from the Instantly.ai import file.
"""

import csv

def main():
    print("=" * 100)
    print("REMOVING ALREADY-CONTACTED LEADS")
    print("=" * 100)
    print()
    
    # Read already-contacted emails from both files
    contacted_emails = set()
    
    # File 1: leads (1).csv
    leads_file = '/Users/aaron/BetterWebsite Contacts Official/leads (1).csv'
    print(f"Reading contacted leads from: {leads_file}")
    
    with open(leads_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get('Email', '').strip().lower()
            if email:
                contacted_emails.add(email)
    
    print(f"  ✓ Found {len(contacted_emails)} contacted emails")
    
    # File 2: Combined_analytics
    analytics_file = '/Users/aaron/BetterWebsite Contacts Official/Combined_analytics_1_8_2026, 10_55_07 AM.csv'
    print(f"Reading analytics from: {analytics_file}")
    
    analytics_count = 0
    with open(analytics_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get('Contact', '').strip().lower()
            if email:
                contacted_emails.add(email)
                analytics_count += 1
    
    print(f"  ✓ Found {analytics_count} additional emails")
    print(f"  ✓ Total unique contacted emails: {len(contacted_emails)}")
    print()
    
    # Read the deduplicated Instantly.ai file
    instantly_file = '/Users/aaron/BetterWebsite Contacts Official/INSTANTLY_AI_IMPORT_DEDUPED.csv'
    print(f"Reading Instantly.ai import: {instantly_file}")
    
    all_leads = []
    with open(instantly_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            all_leads.append(row)
    
    print(f"  ✓ Loaded {len(all_leads):,} leads")
    print()
    
    # Filter out contacted leads
    print("Filtering out already-contacted leads...")
    
    clean_leads = []
    removed_leads = []
    
    for lead in all_leads:
        email = lead['email'].strip().lower()
        if email in contacted_emails:
            removed_leads.append(lead)
        else:
            clean_leads.append(lead)
    
    print(f"  ✓ Removed {len(removed_leads)} already-contacted leads")
    print(f"  ✓ Kept {len(clean_leads):,} fresh leads")
    print()
    
    # Show some examples of removed leads
    if removed_leads:
        print("Examples of removed leads:")
        for i, lead in enumerate(removed_leads[:5], 1):
            print(f"  {i}. {lead['email']:50} - {lead['company_name']}")
        if len(removed_leads) > 5:
            print(f"  ... and {len(removed_leads) - 5} more")
        print()
    
    # Save the cleaned file
    output_file = '/Users/aaron/BetterWebsite Contacts Official/INSTANTLY_AI_IMPORT_FINAL.csv'
    
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(clean_leads)
    
    print(f"✓ Saved: {output_file}")
    print()
    
    # Summary
    print("=" * 100)
    print("✅ CLEANUP COMPLETE!")
    print("=" * 100)
    print()
    print(f"Original leads:           {len(all_leads):,}")
    print(f"Already contacted:        {len(removed_leads):,}")
    print(f"Fresh leads ready:        {len(clean_leads):,}")
    print()
    print("Benefits:")
    print("  ✓ Won't re-contact the same people")
    print("  ✓ Avoids looking unprofessional")
    print("  ✓ Protects sender reputation")
    print("  ✓ Focuses on fresh opportunities")
    print()
    print(f"🚀 Use INSTANTLY_AI_IMPORT_FINAL.csv for your campaign!")
    print()

if __name__ == '__main__':
    main()

