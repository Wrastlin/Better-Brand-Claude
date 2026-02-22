# MCP Tool Connection Audit — Better Brand Digital

**Date:** 2026-02-22
**Environment:** macOS Darwin 25.2.0, Claude Code (Opus 4.6)

## Health Score
- **Fully Working:** 4/11 (Apify, Stripe, Firecrawl, Brave Search)
- **Permission-Gated:** 6/11 (Nano Banana, Google/Zapier, Perplexity, Context7, Firebase, OpenRouter)
- **Broken:** 1/11 (GitHub — bad credentials)
- **Bonus services:** 5 additional (Shopify Dev, Claude in Chrome, Claude Preview, Unsplash, Zapier Tables)

## Action Items for Aaron
1. **CRITICAL** — GitHub PAT expired. Generate new one at https://github.com/settings/tokens
2. **MODERATE** — Permission-gated tools likely just need per-session approval when prompted
3. **LOW** — Stripe account named "Social Lectures Society" — may want separate BBD account

## Working Tools

| Service | Key Tools | Cost |
|---------|-----------|------|
| **Apify** | search-actors, call-actor, get-actor-output, rag-web-browser | ~$0.005/video (YouTube) |
| **Stripe** | 30+ tools: customers, invoices, products, payments, subscriptions | Free API calls |
| **Firecrawl** | scrape, search, map, crawl, extract, agent, browser | ~1 credit/page |
| **Brave Search** | web, local, video, image, news search | Included in plan |

## Permission-Gated (Need Approval)

| Service | Tools | Likely Fix |
|---------|-------|------------|
| **Nano Banana Pro** | generate_image, edit_image, describe_image | Approve when prompted |
| **Google (Zapier)** | ~35 tools (Sheets + Drive) | Approve when prompted |
| **Perplexity** | ask, research, reason, search | Approve when prompted |
| **Firebase** | Full suite (projects, apps, hosting, auth) | May need Firebase CLI login |
| **OpenRouter** | chat_completion, search/validate models | Approve when prompted |
| **Context7** | resolve-library-id, query-docs | Approve when prompted |

## Bonus Services

| Service | Use Case for BBD |
|---------|-----------------|
| **Shopify Dev** | E-commerce client builds |
| **Claude in Chrome** | Browser automation, QA |
| **Claude Preview** | Dev server preview, testing |
| **Unsplash** | Stock photography for content |
| **Zapier Tables** | Lightweight database/tracking |
