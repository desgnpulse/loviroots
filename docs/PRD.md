# Lovi — Product Requirements Document

**Version:** 1.0  
**Date:** 2026-06-24  
**Domain:** loviroots.com  
**Status:** Draft

---

## 1. Overview

**Lovi** is a natural skincare brand rooted in African heritage. Its flagship product, **Lovi Shea Butter**, is a 100% natural moisturiser formulated with shea butter, aloe vera, and coconut oil. The Lovi website (loviroots.com) serves as the brand's primary commercial and editorial presence: it sells products directly to consumers, tells the brand story, and publishes skincare education content.

---

## 2. Problem Statement

Natural skincare consumers — especially those who value African-sourced ingredients — are underserved by brands that either over-complicate their products with unnecessary additives or strip the cultural story from the product entirely. Lovi fills this gap with a clean, honest product and a brand identity that celebrates that heritage without apology.

The website must reflect this clearly: no clutter, no ambiguity, one primary action per page. Visitors should be able to understand the brand, trust the product, and buy — or sign up — within the first 30 seconds.

---

## 3. Goals

| Priority | Goal |
|----------|------|
| P0 | Generate direct product sales via the website |
| P0 | Capture email leads from visitors not ready to buy |
| P1 | Establish brand credibility through editorial/blog content |
| P1 | Enable customer reviews and social proof on product pages |
| P2 | Build a foundation for product line expansion |

---

## 4. Non-Goals (v1)

- No marketplace integrations (Amazon, Jumia, etc.) at launch
- No subscription / auto-replenishment feature at launch
- No multi-currency or international shipping at launch
- No customer accounts / loyalty programme at launch
- No live chat or AI support bot at launch

---

## 5. Target Users

### Primary — The Conscious Buyer
- Age: 22–40, male or female
- Actively reads ingredient labels
- Willing to pay a small premium for clean, natural products
- Discovers brands via Instagram, TikTok, word-of-mouth
- Buys on mobile, researches on desktop

### Secondary — The Gift Buyer
- Age: 25–45
- Buying for a partner, parent, or friend
- Needs clear product descriptions and fast checkout
- Likely to arrive from a shared link or social post

---

## 6. Core Features

### 6.1 Shop / Product Catalog

- Display all available products with photo, name, short description, price
- Product detail page: full description, ingredients list, size variants (100g / 250g / 500g), usage instructions, customer reviews
- Stock status visible (in stock / low stock / out of stock)
- Add-to-cart without leaving the product page

### 6.2 Ordering — Hybrid (WhatsApp Default + Web Checkout)

Two purchasing paths exist simultaneously. WhatsApp is the **default, prominently featured** CTA; web checkout is the **secondary option** for customers who prefer card or a structured checkout experience.

#### Path A — WhatsApp (Default)

1. Customer selects product + size on the product page
2. Clicks the primary **"Order via WhatsApp"** button (green, full-width on mobile)
3. WhatsApp opens with a pre-filled message:
   > "Hi Lovi! I'd like to order: [Product Name] – [Size]. Please assist."
4. Customer sends → Lovi team replies with M-Pesa payment instructions
5. Customer pays, sends confirmation screenshot
6. Lovi team confirms, packs, and ships

**Implementation:**
- Button uses `https://wa.me/{LOVI_WHATSAPP_NUMBER}?text={encodedMessage}`
- Product name + selected size are injected into the encoded message dynamically
- WhatsApp number in `.env` — never hardcoded
- Appears on: product detail page (primary CTA), cart summary (primary CTA)

#### Path B — Web Checkout (Secondary)

1. Customer clicks **"Checkout online"** (secondary, text link or outlined button below the WhatsApp CTA)
2. Enters name, email, delivery address, phone
3. Pays via M-Pesa STK push or card (Intasend / Pesapal — TBD)
4. Order confirmation email sent automatically
5. Order lands in admin queue for manual packing

**UI hierarchy (product page):**
```
[ Order via WhatsApp ]   ← primary, prominent
  or checkout online →   ← secondary, subdued
```

**Why hybrid:**
- WhatsApp is universal in the EA market and allows conversational upselling
- Web checkout captures customers who prefer privacy, card payments, or a paper trail
- Both paths converge at the same self-fulfillment workflow on the Lovi side

### 6.3 Cart

- Local state only (no server-side cart in v1)
- Consolidates multiple products/sizes before ordering
- "Order via WhatsApp" on cart generates a single multi-item message:
  > "Hi Lovi! I'd like to order:\n- Lovi Shea Butter 250g x2\n- Lovi Shea Butter 100g x1\nPlease assist."
- "Checkout online" on cart proceeds to the standard checkout page

### 6.3 Email Capture

- Hero CTA on homepage: "Be first to know — join the Lovi list"
- Inline capture forms on: homepage hero, blog post footers, exit-intent popup (desktop only)
- Integration: Mailchimp or Brevo (TBD)
- Confirmation email sent on signup; no double opt-in required for v1

### 6.4 Blog / Editorial

- Skincare tips, ingredient education, brand stories
- Categories: Ingredients, Routines, Brand, Community
- Author and publish date shown
- Social share buttons (WhatsApp, Instagram, Twitter/X)
- Blog posts link to relevant products in-body

### 6.5 Customer Reviews

- Reviews collected per product (name, rating 1–5, body text)
- Average star rating shown on product listing and detail pages
- Moderated before publishing (admin approves)
- Post-purchase review request email triggered 7 days after order shipped

### 6.6 Admin / Order Management

- Simple admin dashboard: order list, order detail, mark as shipped
- Manual entry of tracking / dispatch notes per order
- No automated shipping label generation in v1

---

## 7. Pages

| Page | Purpose |
|------|---------|
| `/` | Homepage — brand story, hero product, email capture, featured blog posts |
| `/products` | Product catalog / shop |
| `/products/[slug]` | Product detail page |
| `/cart` | Cart summary — WhatsApp (primary) + checkout online (secondary) |
| `/checkout` | Address + payment (web checkout path) |
| `/order-confirmation` | Post-purchase confirmation (web checkout path) |
| `/about` | Brand story, values, founder note |
| `/how-to-use` | Usage guide, visual routine |
| `/blog` | Article index |
| `/blog/[slug]` | Article detail |
| `/contact` | Contact form + social links |
| `/admin` | Order management (protected) |

---

## 8. User Flows

### Purchase Flow (WhatsApp)
```
Homepage / Product listing → Product detail → Select size → "Order via WhatsApp"
→ WhatsApp opens (pre-filled message) → Customer sends → Lovi team replies with M-Pesa details
→ Customer pays → Lovi confirms + ships
```

### Purchase Flow (Web Checkout)
```
Product detail / Cart → "Checkout online" → Address + payment form → M-Pesa STK push / card
→ Payment confirmed → Order confirmation email → Admin queue
```

### Multi-item Purchase Flow
```
Product pages → Add to cart (local) → Cart summary → WhatsApp (default) or checkout online
```

### Email Capture Flow
```
Homepage / Blog → CTA form → Confirmation email → Welcome sequence (Mailchimp/Brevo)
```

### Admin Order Flow
```
WhatsApp message received → Lovi team processes manually → Packs & ships
→ Logs order in /admin panel → Marks as shipped → Follows up on WhatsApp
```

---

## 9. Technical Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Next.js (App Router) + TypeScript | SSR/SSG for SEO; App Router for layouts |
| Styling | TailwindCSS v4 | Utility-first, matches design system approach |
| CMS | Headless WordPress + WPGraphQL | Blog + product content managed by non-devs |
| Auth | NextAuth.js | Admin-only session; no customer accounts in v1 |
| Ordering (primary) | WhatsApp wa.me deep links | Default CTA; zero gateway complexity |
| Ordering (secondary) | Pesapal (M-Pesa STK push + card) | Web checkout for customers who prefer it |
| Email | Resend (transactional) + Brevo (marketing) | Order confirmations + email capture sequences |
| Hosting | Hetzner VPS + Nginx + Docker + PM2 | Standard Jay stack |
| CDN / SSL | Cloudflare Full Strict + certbot | DNS managed via Cloudflare |
| Domain | loviroots.com | Registered |

---

## 10. Design System

**Colors:**
- Ivory `#F8F4EC` — backgrounds, cards
- Earth Brown `#4A2E1F` — headings, CTAs
- Fresh Green `#8DBE77` — accents, badges
- Gold `#D6AD60` — highlights, star ratings

**Typography:**
- Headlines: Playfair Display
- Body: Inter

**Principles:**
- Mobile-first. Designed for 375px viewport, scaled up.
- One primary action per page — every page has a single dominant CTA.
- No modal overlays on product pages — everything inline.
- Images: clean natural backdrops (wood, linen, clay); diverse models.

---

## 11. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance (mobile) | ≥ 85 |
| First Contentful Paint | < 2s on 4G |
| Core Web Vitals | All green |
| Uptime | 99.9% (Hetzner VPS + PM2 keep-alive) |
| SEO | Structured data on product + blog pages; sitemap.xml; robots.txt |
| Accessibility | WCAG 2.1 AA |
| Security | No secrets in code; HTTPS only; admin route protected; form inputs sanitised |

---

## 12. Launch Phases

### Phase 1 — MVP (Month 1–2)
- [ ] Brand kit finalised (name updated to Lovi throughout)
- [ ] Packaging & label production complete
- [ ] Next.js site scaffolded, design system implemented
- [ ] Homepage, About, Products, Product detail, Cart, Checkout live
- [ ] WhatsApp Business number set up and linked in site config
- [ ] Payment gateway integrated and tested (M-Pesa STK push + card) for web checkout path
- [ ] Email capture live (Brevo/Mailchimp connected)
- [ ] Blog CMS set up in WordPress (3 seed articles)
- [ ] Admin order dashboard live
- [ ] Hetzner VPS provisioned, Nginx + Docker + PM2 configured
- [ ] Domain pointed to Hetzner, Cloudflare Full Strict SSL active
- [ ] Production deployment live

### Phase 2 — Marketing Rollout (Month 3–4)
- [ ] Instagram and TikTok accounts live, linked from site
- [ ] Blog publishing cadence: 2 articles/month
- [ ] First email campaign to captured list
- [ ] Customer review system live (post-purchase email trigger)
- [ ] Influencer seeding — send product, collect UGC

### Phase 3 — Growth (Month 5+)
- [ ] Product line expansion (Tea Tree, Vanilla, Hair variants)
- [ ] Subscription / bundle pricing
- [ ] Retail distribution page (stockist locator)
- [ ] Customer accounts (order history, saved address)

---

## 13. Open Questions

| # | Question | Owner | Target |
|---|----------|-------|--------|
| 1 | ~~Payment gateway — Intasend or Pesapal?~~ **Pesapal** ✓ | — | Closed |
| 2 | ~~Marketing email tool — Brevo or Mailchimp?~~ **Brevo** ✓ | — | Closed |
| 3 | WhatsApp Business number confirmed and verified? | Jay | Phase 1 |
| 3 | Will WordPress be self-hosted or managed (WP.com)? | Jay | Phase 1 |
| 4 | Shipping rates — flat fee or weight-based? | Jay | Phase 1 |
| 5 | Launch market — Kenya only, or EA-wide from day one? | Jay | Phase 1 |

---

## 14. Out of Scope (Deferred)

- Mobile app (iOS / Android)
- Loyalty / rewards programme
- Wholesale / B2B ordering
- Multi-language support
- Third-party marketplace listings
- Automated shipping labels / 3PL integration

---

*This document is the single source of truth for the Lovi website build. Changes must be versioned and noted below.*

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-06-24 | Initial PRD — brand renamed from Lovy to Lovi |
