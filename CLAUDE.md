# Loviroots (short: Lovi)
# Natural skincare brand website (loviroots.com) — WhatsApp-first product sales, email capture, blog

## 0. WHAT THIS PROJECT IS
Lovi is an EA-market skincare brand. The site sells Lovi Shea Butter direct to consumers,
captures email leads, and publishes skincare editorial content. WhatsApp is the default
ordering channel; Pesapal (M-Pesa + card) is the secondary web checkout path.
Full PRD: docs/PRD.md

## 1. CURRENT STATE
Sprint 0 — Project scaffolded. Nothing built yet.
Active plan: .claude/plans/lovi-init.md

## 2. STACK
Next.js 15 (App Router) + TypeScript   — frontend
TailwindCSS v4                          — styling
Headless WordPress + WPGraphQL          — CMS (blog + product content)
NextAuth.js                             — admin-only auth (no customer accounts in v1)
Pesapal                                 — web checkout: M-Pesa STK push + card
Brevo                                   — marketing email (capture sequences)
Resend                                  — transactional email (order confirmation)
WhatsApp wa.me deep links               — primary ordering CTA
Hetzner VPS + Nginx + Docker + PM2     — hosting
Cloudflare Full Strict + certbot        — CDN + SSL
loviroots.com                           — domain (registered)

## 3. KEY CONVENTIONS
- Registered brand: LOVIROOTS. Short name customers use: LOVI. Never "Lovy".
- Use Loviroots in: About page, company bio, legal copy, formal contexts.
- Use Lovi in: product names, casual copy, social, conversational CTAs.
- WhatsApp CTA is always the primary button; "checkout online" sits below it as secondary
- No customer DB in v1 — WordPress/MySQL is CMS only; orders managed via WhatsApp + admin panel
- Admin route (/admin) is the only protected route in v1
- next.config.ts must set output: 'standalone' for Docker/PM2 deploy
- WhatsApp number in .env as NEXT_PUBLIC_WHATSAPP_NUMBER — never hardcoded

## 4. DELIVERABLES / ENTRY POINTS
loviroots.com        — public brand + shop
loviroots.com/admin  — order management (protected, admin only)
loviroots.com/blog   — editorial / skincare content (sourced from WP)
