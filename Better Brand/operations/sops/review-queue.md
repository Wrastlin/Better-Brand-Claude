# SOP: Review Queue

## Purpose
Everything that needs Aaron's approval before going live flows through the review queue. Nothing gets published, sent, or committed without his sign-off.

## How It Works

### For Claude (staging items):
1. Create the deliverable (draft email, content post, prospect list, website update, etc.)
2. Save it to `/review-queue/` with a clear filename: `[TYPE]-[DESCRIPTION]-[DATE].md`
   - Types: `outreach`, `content`, `website`, `prospect`, `invoice`, `campaign`, `other`
   - Example: `outreach-cold-email-sequence-v1-2026-02-22.md`
3. Add a summary entry to the review queue section in `STATUS.md`
4. Flag it in the daily briefing

### For Aaron (reviewing items):
1. Check `/review-queue/` or the daily briefing
2. Open each item — context and the actual deliverable are in the file
3. Respond with: **approve**, **reject + reason**, or **revise + notes**
4. Claude processes the decision and moves the file to its final location

### After Review:
- **Approved** — Claude moves it to the appropriate folder and executes (sends, publishes, etc.)
- **Rejected** — Claude archives it in `/review-queue/archived/` with the reason
- **Revised** — Claude updates based on notes, re-stages for another review

## File Format
Every review queue item should include:
```
# [Type]: [Title]
**Date staged:** YYYY-MM-DD
**Priority:** High / Medium / Low
**Context:** [Why this exists, what it's for]
**Action needed:** [What happens when approved]

---

[The actual content/deliverable]
```
