# Lovi — Sprint 0: Init Plan
# Created: 2026-06-24

## OBJECTIVE
Scaffold Next.js 15 app with design system, core pages, WhatsApp ordering,
and Pesapal web checkout — ready for production deployment on Hetzner.

## STEP 0: Environment Setup
- [ ] pnpm init + Next.js 15 (App Router, TypeScript, TailwindCSS v4)
- [ ] next.config.ts — set output: 'standalone'
- [ ] .env.example with all required keys (no values)
- [ ] Configure ESLint + Prettier + Husky pre-commit (lint + typecheck)
- [ ] Set git remote + push main

## STEP 1: Design System
- [ ] globals.css — Tailwind v4 config with Lovi color tokens
  - Ivory #F8F4EC, Earth Brown #4A2E1F, Fresh Green #8DBE77, Gold #D6AD60
- [ ] fonts.ts — load Playfair Display (headlines) + Inter (body) via next/font
- [ ] Base layout: Header (logo + nav) + Footer
- [ ] Reusable: Button (primary = green WhatsApp, secondary = outlined)
- [ ] Reusable: ProductCard, StarRating, ReviewCard

## STEP 2: Core Pages
- [ ] / — Homepage: hero, email capture CTA, featured products, blog teaser
- [ ] /about — Brand story, values, founder note
- [ ] /how-to-use — Usage guide
- [ ] /contact — Contact form + social links
- [ ] /products — Product catalog grid
- [ ] /products/[slug] — Product detail: images, variants, reviews, WhatsApp CTA + checkout online link
- [ ] /cart — Cart summary with WhatsApp (primary) + checkout online (secondary)
- [ ] /checkout — Address form + Pesapal payment (web path)
- [ ] /order-confirmation — Post-purchase thank you (web path)

## STEP 3: WhatsApp Ordering
- [ ] useWhatsAppOrder hook — builds encoded wa.me URL from product/cart state
- [ ] WhatsApp CTA button component (green, full-width mobile)
- [ ] Cart consolidation — multi-item message builder
- [ ] Test links on real device (WhatsApp must open with pre-filled text)

## STEP 4: WordPress / WPGraphQL CMS
- [ ] Install WordPress (local or staging) + WPGraphQL plugin
- [ ] Define Product and BlogPost custom post types
- [ ] Next.js GraphQL client (graphql-request or urql)
- [ ] /blog page — list posts from WP
- [ ] /blog/[slug] — article detail from WP
- [ ] /products — list products from WP
- [ ] /products/[slug] — product detail from WP (ISR revalidation)

## STEP 5: Email Capture
- [ ] Brevo account set up, list created
- [ ] EmailCapture component (name + email form)
- [ ] API route POST /api/subscribe — calls Brevo API, returns success/error
- [ ] Wire to homepage hero + blog post footer
- [ ] Confirmation email triggered in Brevo on subscribe

## STEP 6: Pesapal Web Checkout
- [ ] Pesapal sandbox account + API keys
- [ ] API routes: POST /api/checkout/initiate, GET /api/checkout/callback (IPN)
- [ ] Checkout page: name, email, phone, address → M-Pesa STK or card
- [ ] Order confirmation page on successful payment
- [ ] Resend transactional email on order confirmed
- [ ] Admin email notification on new order

## STEP 7: Admin Panel
- [ ] NextAuth.js — credentials provider, admin-only session
- [ ] /admin route group with layout (session-protected)
- [ ] Order list: WhatsApp orders (manual entry) + web checkout orders (from Pesapal IPN)
- [ ] Order detail: mark as shipped, add notes
- [ ] Customer review moderation queue

## STEP 8: Deployment
- [ ] Hetzner VPS provisioned
- [ ] Docker image build + docker-compose for local prod test
- [ ] Nginx config: proxy :3000, SSL termination
- [ ] Cloudflare DNS pointed to Hetzner IP, Full Strict SSL
- [ ] certbot SSL cert
- [ ] PM2 ecosystem.config.js
- [ ] Deploy sequence documented in .claude/CLAUDE.md
- [ ] GitHub Actions CI: lint + typecheck on push

## DONE WHEN
- [ ] Homepage renders at loviroots.com with live product data from WP
- [ ] WhatsApp order button opens pre-filled message on mobile
- [ ] Pesapal sandbox checkout completes end-to-end
- [ ] Admin can log in and see orders
- [ ] Blog posts render from WordPress
- [ ] Email capture saves subscriber to Brevo list
