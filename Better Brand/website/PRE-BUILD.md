# BETTER BRAND DIGITAL — Website Pre-Build Package
> Created: 2026-02-22 | Status: AWAITING AARON'S APPROVAL

---

## 1. SITEMAP

This is a **cinematic single-page site** (GEMINI.md architecture) — the strongest format for a launch-phase agency. Every section is a scroll-triggered experience. No dead pages, no thin content.

```
betterbranddigital.com (or newtocoding.com)
│
├── NAVBAR ─────────── Floating pill, morphs on scroll
│   ├── Logo (BBD wordmark)
│   ├── Services
│   ├── Work
│   ├── Process
│   └── [CTA Button]
│
├── HERO ───────────── Full-bleed cinematic opening
│   ├── Background image + gradient overlay
│   ├── Headline (two-part: sans + serif)
│   ├── Subheadline
│   └── Primary CTA button
│
├── FEATURES ───────── 3 interactive micro-UI cards
│   ├── Card 1: Custom-Coded (Diagnostic Shuffler)
│   ├── Card 2: Design That Converts (Telemetry Typewriter)
│   └── Card 3: Full-Service (Cursor Protocol Scheduler)
│
├── PHILOSOPHY ─────── The Manifesto section
│   ├── Contrast statement (industry vs BBD)
│   └── Parallax texture background
│
├── PROTOCOL ───────── Sticky stacking cards (BBD's process)
│   ├── Step 1: Discovery & Strategy
│   ├── Step 2: Design & Build
│   └── Step 3: Launch & Grow
│
├── SOCIAL PROOF ──── (Portfolio / Testimonial)
│   └── Reliable Claim Solutions case study spotlight
│
├── PRICING ────────── Three-tier grid
│   ├── Starter ($2K-$5K)
│   ├── Professional ($5K-$10K) ← highlighted
│   └── Enterprise ($10K+)
│
└── FOOTER ─────────── Deep dark, rounded top
    ├── Brand + tagline
    ├── Nav links
    ├── Social links (LinkedIn, Instagram, Facebook)
    └── "System Operational" status indicator
```

### Why Single-Page?
- **Zero friction** — visitor never leaves the flow
- **Scroll = storytelling** — each section builds the case
- **Mobile-native** — single scroll is the natural mobile pattern
- **Fast** — one page load, everything cached
- **Expandable** — add /blog, /portfolio, /contact as separate routes later

---

## 2. WIREFRAMES

### A. NAVBAR — "The Floating Island"
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ╭───────────────────────────────────────────────────╮  │
│  │  BBD        Services   Work   Process   [Book →]  │  │
│  ╰───────────────────────────────────────────────────╯  │
│                                                         │
│  ↓ On scroll: glass background + border appears         │
│                                                         │
│  ╭───────────────────────────────────────────────────╮  │
│  │▒▒BBD▒▒▒▒▒▒Services▒▒▒Work▒▒▒Process▒▒▒[Book →]▒▒│  │
│  ╰───────────────────────────────────────────────────╯  │
│            ↑ backdrop-blur + subtle border               │
└─────────────────────────────────────────────────────────┘

MOBILE:
╭──────────────────╮
│ BBD          [☰]  │
╰──────────────────╯
      ↓ tap
╭──────────────────╮
│ BBD          [✕]  │
│                    │
│   Services         │
│   Work             │
│   Process          │
│                    │
│   [Book a Call →]  │
╰──────────────────╯
```

### B. HERO — "The Opening Shot"
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░ FULL BLEED IMAGE ░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░ + GRADIENT OVERLAY ░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                         │
│  Your brand deserves                    (Sans, bold)    │
│  better.                    (Massive Serif Italic)      │
│                                                         │
│  Custom-coded websites and digital strategy             │
│  that actually convert.                  (Body text)    │
│                                                         │
│  ╭─────────────────────╮                                │
│  │  Book a Free Call →  │                (Accent btn)   │
│  ╰─────────────────────╯                                │
│                                                    100vh│
└─────────────────────────────────────────────────────────┘

MOBILE:
╭────────────────────╮
│░░░░░░░░░░░░░░░░░░░░│
│░░░░ FULL BLEED ░░░░│
│░░░░ IMAGE ░░░░░░░░░│
│                     │
│ Your brand          │
│ deserves            │
│ better.             │
│                     │
│ Custom-coded sites  │
│ that convert.       │
│                     │
│ ╭─────────────────╮│
│ │ Book a Free Call ││
│ ╰─────────────────╯│
╰────────────────────╯
```

### C. FEATURES — "Interactive Functional Artifacts"
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   WHAT WE BUILD                          (Section tag)  │
│                                                         │
│  ╭─────────────────╮╭─────────────────╮╭──────────────╮│
│  │  CUSTOM-CODED   ││ DESIGN THAT     ││ FULL-SERVICE ││
│  │                 ││ CONVERTS        ││              ││
│  │  ┌───────────┐  ││                 ││  S M T W T F ││
│  │  │ Next.js   │  ││ ▌Live Feed •    ││  ■ □ □ ■ □ □ ││
│  │  │ React     │  ││ > Bounce rate   ││       ↑      ││
│  │  │ Tailwind  │  ││   dropped 47%_  ││   [cursor]   ││
│  │  └───────────┘  ││                 ││              ││
│  │  Shuffling cards││ Typewriter feed ││  Scheduler   ││
│  │                 ││                 ││              ││
│  │  No templates.  ││ Every pixel has ││ Strategy to  ││
│  │  No page        ││ a job. We track ││ launch to    ││
│  │  builders.      ││ what works.     ││ growth.      ││
│  │  Ever.          ││                 ││              ││
│  ╰─────────────────╯╰─────────────────╯╰──────────────╯│
│                                                         │
└─────────────────────────────────────────────────────────┘

MOBILE (stacked):
╭────────────────────╮
│ ╭────────────────╮ │
│ │ CUSTOM-CODED   │ │
│ │ ┌────────────┐ │ │
│ │ │ Next.js    │ │ │
│ │ │ React      │ │ │
│ │ │ Tailwind   │ │ │
│ │ └────────────┘ │ │
│ │ No templates.  │ │
│ │ Ever.          │ │
│ ╰────────────────╯ │
│                     │
│ ╭────────────────╮ │
│ │ CONVERTS       │ │
│ │ ▌Live Feed •   │ │
│ │ > Bounce rate  │ │
│ │   dropped 47%_ │ │
│ ╰────────────────╯ │
│         ...         │
╰────────────────────╯
```

### D. PHILOSOPHY — "The Manifesto"
```
┌─────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓ DARK BG + PARALLAX TEXTURE ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│                                                         │
│  Most agencies give you a template                      │
│  and call it custom.                     (Small, muted) │
│                                                         │
│  We write every line of code                            │
│  from scratch.               (Massive Serif, ACCENTED)  │
│                                                         │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└─────────────────────────────────────────────────────────┘
```

### E. PROTOCOL — "Sticky Stacking Archive"
```
┌─────────────────────────────────────────────────────────┐
│ SCROLL ↓ to reveal each card stacking on top            │
│                                                         │
│  ╭───────────────────────────────────────────────────╮  │
│  │  01                                               │  │
│  │                                                   │  │
│  │  DISCOVERY & STRATEGY     ◎ ← rotating motif     │  │
│  │                                                   │  │
│  │  We learn your business inside out.               │  │
│  │  Goals, audience, competitors — mapped.           │  │
│  ╰───────────────────────────────────────────────────╯  │
│                                                         │
│  ╭───────────────────────────────────────────────────╮  │
│  │  02                                               │  │
│  │                                                   │  │
│  │  DESIGN & BUILD           ═══ ← scanning line    │  │
│  │                                                   │  │
│  │  Custom code, cinematic design,                   │  │
│  │  conversion-optimized from day one.               │  │
│  ╰───────────────────────────────────────────────────╯  │
│                                                         │
│  ╭───────────────────────────────────────────────────╮  │
│  │  03                                               │  │
│  │                                                   │  │
│  │  LAUNCH & GROW            ∿∿∿ ← pulsing wave    │  │
│  │                                                   │  │
│  │  Go live, track performance,                      │  │
│  │  iterate based on real data.                      │  │
│  ╰───────────────────────────────────────────────────╯  │
└─────────────────────────────────────────────────────────┘
```

### F. PRICING
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  INVESTMENT                              (Section tag)  │
│                                                         │
│  ╭──────────╮  ╭═══════════════╮  ╭──────────╮         │
│  │ STARTER  │  ║ PROFESSIONAL  ║  │ ENTERPRISE│         │
│  │          │  ║  (FEATURED)   ║  │          │         │
│  │ $2-5K    │  ║   $5-10K      ║  │ $10K+    │         │
│  │          │  ║               ║  │          │         │
│  │ • Custom │  ║ • Everything  ║  │ • Full   │         │
│  │   site   │  ║   in Starter  ║  │   digital│         │
│  │ • Mobile │  ║ • SEO setup   ║  │   package│         │
│  │   ready  │  ║ • Analytics   ║  │ • Ongoing│         │
│  │ • 5-7    │  ║ • Content     ║  │   retainer│        │
│  │   days   │  ║   strategy    ║  │ • Priority│        │
│  │          │  ║ • 30-day      ║  │   support│         │
│  │ [Talk →] │  ║   support     ║  │          │         │
│  │          │  ║               ║  │ [Talk →] │         │
│  │          │  ║ [Book Now →]  ║  │          │         │
│  ╰──────────╯  ╰═══════════════╯  ╰──────────╯         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### G. FOOTER
```
┌─────────────────────────────────────────────────────────┐
│  ╭───────────────────────────────────────────────────╮  │
│  │                                                   │  │
│  │  BETTER BRAND           NAVIGATE      CONNECT     │  │
│  │  DIGITAL                Services       LinkedIn   │  │
│  │                         Work           Instagram  │  │
│  │  Design that            Process        Facebook   │  │
│  │  performs.              Pricing        Email      │  │
│  │                                                   │  │
│  │  ─────────────────────────────────────────────    │  │
│  │                                                   │  │
│  │  © 2026 Better Brand Digital   •  System Online   │  │
│  │                                   ● ← green dot   │  │
│  ╰───────────────────────────────────────────────────╯  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. THEME CONCEPTS

### ⬛ CONCEPT A — "MIDNIGHT LUXE" ← RECOMMENDED

**Why it fits BBD:** You're premium. You charge $2K-$10K. You position against templates and cheap agencies. Midnight Luxe says "private members' club" — exactly the feeling you want when a business owner lands on your site. Dark backgrounds make portfolio work POP. Gold accents = quality.

| Token | Value |
|-------|-------|
| Primary | Obsidian `#0D0D12` |
| Accent | Champagne Gold `#C9A84C` |
| Background | Ivory `#FAF8F5` |
| Text/Dark | Slate `#2A2A35` |
| Headings | Inter (tight tracking) |
| Drama font | Playfair Display Italic |
| Data font | JetBrains Mono |

**Hero Copy:**
> Your brand deserves _(Inter Bold)_
> **better.** _(Playfair Display Italic, massive)_

**Image Mood:** Dark marble surfaces, gold accents, architectural shadows, luxury workspace interiors, premium desk setups with code on screens.

**Philosophy Section:**
> "Most agencies give you a template and call it custom."
> "We write every line from **scratch.**"

**Vibe:** Think high-end architecture firm's website. Confident. Quiet luxury. The gold says "premium" without screaming it.

---

### 🟥 CONCEPT B — "BRUTALIST SIGNAL"

**Why it might fit BBD:** Aaron's brand voice is direct — "no templates, no fluff." Brutalist Signal is the visual equivalent of that. Paper-white backgrounds with signal-red accents are impossible to ignore. This says "we cut through the noise." It's bold, memorable, and unlike anything in the web design agency space.

| Token | Value |
|-------|-------|
| Primary | Paper `#E8E4DD` |
| Accent | Signal Red `#E63B2E` |
| Background | Off-white `#F5F3EE` |
| Text/Dark | Black `#111111` |
| Headings | Space Grotesk (tight tracking) |
| Drama font | DM Serif Display Italic |
| Data font | Space Mono |

**Hero Copy:**
> Build the _(Space Grotesk Bold)_
> **brand.** _(DM Serif Display Italic, massive)_

**Image Mood:** Concrete textures, clean workspaces, raw materials, architectural grids, high-contrast black and white photography.

**Philosophy Section:**
> "Most agencies decorate. Templates, stock photos, filler."
> "We **engineer** results."

**Vibe:** Think design studio meets newsroom. Raw honesty. Nothing hidden. The red cuts like a blade — draws the eye exactly where you want it.

---

### 🟣 CONCEPT C — "VAPOR CLINIC"

**Why it might fit BBD:** If Aaron wants to position as cutting-edge and tech-forward. BBD uses AI tools, automation, and modern frameworks — Vapor Clinic visualizes that. Deep void backgrounds with plasma purple say "we're from the future." This is the most distinctive option — nobody in the Wausau, WI market looks like this.

| Token | Value |
|-------|-------|
| Primary | Deep Void `#0A0A14` |
| Accent | Plasma Purple `#7B61FF` |
| Background | Ghost `#F0EFF4` |
| Text/Dark | Graphite `#18181B` |
| Headings | Sora (tight tracking) |
| Drama font | Instrument Serif Italic |
| Data font | Fira Code |

**Hero Copy:**
> Design beyond _(Sora Bold)_
> **templates.** _(Instrument Serif Italic, massive)_

**Image Mood:** Dark water, neon reflections, bioluminescence, abstract digital textures, futuristic interiors.

**Philosophy Section:**
> "Most agencies are stuck in 2019. Drag-and-drop builders. Cookie-cutter layouts."
> "We build with **precision.**"

**Vibe:** Think futuristic tech startup. Feels like stepping into a command center. The purple is distinctive — immediately separates BBD from every other agency in the market.

---

## 4. IMAGE STRATEGY

### Source: Unsplash (free, high-quality, real photographs)

Each theme uses different image searches:

| Section | Midnight Luxe | Brutalist Signal | Vapor Clinic |
|---------|--------------|-----------------|--------------|
| Hero BG | dark marble workspace | concrete texture minimal | dark water neon |
| Philosophy BG | gold architectural detail | raw paper texture | bioluminescence |
| Protocol cards | luxury interior shadow | industrial grid pattern | abstract digital |
| Texture overlays | marble grain | concrete grain | digital noise |

### Custom Images Needed (Nano Banana Pro — later):
1. **BBD Logo/Wordmark** — text-based mark in chosen theme colors
2. **Aaron headshot** — professional, on-brand (already have in `assets/headshots/`)
3. **Case study screenshots** — Reliable Claim Solutions before/after
4. **Social proof graphics** — testimonial cards, metric callouts

### Image Sizing:
| Placement | Desktop | Mobile |
|-----------|---------|--------|
| Hero background | 1920×1080 | 750×1334 |
| Philosophy parallax | 1920×800 | 750×600 |
| Card thumbnails | 600×400 | 375×250 |

---

## 5. CONTENT NEEDS (from Aaron)

Before build, ideally need:

### Must-Have:
- [x] Brand name — Better Brand Digital ✓
- [x] Services list — custom sites, automation, SEO ✓
- [x] Case study — Reliable Claim Solutions ✓
- [ ] **CTA destination** — Where does "Book a Call" go? (Calendly? Stripe? Contact form?)
- [ ] **Tagline approval** — "Design that performs" or suggest alternative

### Nice-to-Have (can add post-launch):
- [ ] Client testimonial quote (from Reliable Claim Solutions?)
- [ ] Aaron's headshot for About/footer
- [ ] Specific project metrics (load times, conversion rates, etc.)
- [ ] Blog/content section (Phase 6 — add later as /blog route)

---

## 6. TECHNICAL PLAN

| Aspect | Decision |
|--------|----------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v3.4.17 |
| Animations | GSAP 3 + ScrollTrigger |
| Icons | Lucide React |
| Fonts | Google Fonts (per theme) |
| Images | Unsplash (real URLs) |
| File structure | Single App.jsx + components/ if needed |
| Responsive | Mobile-first |
| Deployment | Ready for Vercel (or any static host) |

---

## DECISION TIME

Aaron needs to choose:

1. **Theme:** A (Midnight Luxe), B (Brutalist Signal), or C (Vapor Clinic)?
2. **Hero headline:** Use suggested copy or provide custom?
3. **CTA:** "Book a Free Call" / "See Our Work" / "Get a Free Audit" / Custom?
4. **Pricing:** Show tiers on site or use "Let's Talk" approach?
5. **Tagline:** "Design that performs" / "Your brand deserves better" / Custom?

---

_This document is the blueprint. Once Aaron approves a direction, we build. No more planning — straight to code._
