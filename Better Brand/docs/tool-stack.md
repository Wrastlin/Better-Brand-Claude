# Tool Stack Documentation

> Last updated: 2026-02-22
> Status: Pending audit results from MCP verification agent

## Quick Reference

| Tool | What We Use It For | Connected? | Docs |
|------|--------------------|------------|------|
| **Claude Code** | Dev, automation, agentic ops | Yes (native) | — |
| **Nano Banana Pro** | Image generation/editing | Pending | [docs](#nano-banana-pro) |
| **Apify** | Web scraping, prospecting, YouTube | Pending | [docs](#apify) |
| **Stripe** | Payments, invoicing, subscriptions | Pending | [docs](#stripe) |
| **GitHub** | Code hosting, deployment | Pending | [docs](#github) |
| **Google Workspace** | Drive, Sheets, Calendar, Gmail | Pending | [docs](#google) |
| **Firecrawl** | Web scraping, search | Pending | [docs](#firecrawl) |
| **Instantly** | Cold email at scale | TBD | [docs](#instantly) |
| **Higgsfield** | AI video generation | TBD | [docs](#higgsfield) |
| **InfoForge** | Outreach domain infra | TBD | [docs](#infoforge) |
| **GeminiMD** | Website design system | Local file | See GEMINI.md |

_This file will be fully populated after the MCP audit completes._

---

## Tool Details

### Nano Banana Pro
- **Purpose:** Generate and edit images for content, website, client deliverables
- **MCP Tools:** generate_image, edit_image, describe_image
- **Cost:** TBD
- **Notes:** TBD after audit

### Apify
- **Purpose:** Web scraping, YouTube content extraction, prospect list building
- **MCP Tools:** search-actors, call-actor, get-actor-output, etc.
- **Cost:** Usage-based
- **Key Actors:** TBD (YouTube scraper, website scraper, etc.)

### Stripe
- **Purpose:** Client invoicing, payment collection, subscription management
- **MCP Tools:** create_customer, create_invoice, create_payment_link, etc.
- **Cost:** 2.9% + $0.30 per transaction
- **Notes:** TBD after audit

### GitHub
- **Purpose:** Website hosting, version control, deployment
- **MCP Tools:** create_repository, push_files, create_pull_request, etc.
- **Notes:** TBD after audit

### Google
- **Purpose:** File storage (Drive), data tracking (Sheets), scheduling (Calendar), email (Gmail)
- **MCP Tools:** Via Zapier integration
- **Notes:** TBD after audit

### Firecrawl
- **Purpose:** Web scraping for research and prospecting
- **MCP Tools:** firecrawl_scrape, firecrawl_search, firecrawl_map, etc.
- **Notes:** TBD after audit

### Instantly
- **Purpose:** Cold email at scale — domain warmup, sequence management, deliverability
- **Connection:** Web/API (not MCP)
- **Setup needed:** TBD

### Higgsfield
- **Purpose:** AI video generation for content and client deliverables
- **Connection:** API/CLI (not MCP)
- **Setup needed:** TBD

### InfoForge
- **Purpose:** Outreach domain infrastructure management
- **Connection:** Web (not MCP)
- **Setup needed:** TBD
