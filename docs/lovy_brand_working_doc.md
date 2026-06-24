## LOVY SKINCARE BRAND – MASTER WORKING DOCUMENT

---

### 1. BRAND IDENTITY

**Brand Name:** Lovy
**Flagship Product:** Lovy Shea Butter
**Tagline:** "Nature's Touch, Lovingly Yours"

**Target Audience:**
- Men and Women (18–45)
- Skin- and hair-conscious consumers
- Preference for natural, African-sourced beauty products

**Brand Values:**
- Purity: 100% natural ingredients
- Simplicity: No fluff, no fillers
- Cultural pride: African heritage in every jar
- Consistency: Same love, every batch

**Tone of Voice:**
- Warm, clear, witty
- Never condescending or overly technical
- Celebrate natural beauty and everyday wellness

**Color Palette:**
- Ivory (#F8F4EC)
- Earth Brown (#4A2E1F)
- Fresh Green (#8DBE77)
- Gold Accent (#D6AD60)

**Typography:**
- Headlines: Playfair Display or similar
- Body: Inter or Open Sans

---

### 2. VISUAL DIRECTION

**Logo Usage:**
- Circle variant for stickers (1 inch diameter)
- Full-width variant for rectangular labels (260mm x 38mm)

**Image Style:**
- Clean, natural backdrops (wood, linen, clay)
- Diverse models (men and women, glowing skin)

**Packaging:**
- Rectangular label includes: Product name, benefits, ingredients, usage, company info
- Circular label includes: Logo only or logo + tagline

---

### 3. PRODUCT LINE (Initial Launch)

**Lovy Shea Butter**
- Ingredients: Shea butter, aloe vera, coconut oil
- Available Sizes: 100g, 250g, 500g

**Future Variants:**
- Shea + Tea Tree (acne-prone)
- Shea + Vanilla (fragrance lovers)
- Shea for Hair

---

### 4. WEBSITE OVERVIEW

**Tech Stack:**
- CMS: Headless WordPress (via WPGraphQL)
- Frontend: Next.js + TailwindCSS
- Hosting: Vercel
- Auth: NextAuth + WP User API

**Core Pages:**
- Home
- About
- Products / Shop
- How to Use
- Blog
- Contact / Support

**Key Features:**
- Mobile-first design
- Fast-loading images
- Customer reviews/testimonials
- Blog: Skincare tips, routines, benefits of natural ingredients

---

### 5. DEVELOPMENT GUARDRAILS

**Frontend Rules:**
- Use TypeScript
- TailwindCSS only for styling
- No inline styles unless dynamic
- Components must be modular and reusable
- All console.logs or debug code wrapped in `if (process.env.NODE_ENV !== 'production')`

**Backend/API Rules:**
- Authenticated GraphQL endpoints only
- Use JWT for session tokens
- No hardcoded secrets or keys – use `.env` files
- Use WP as a content layer only – no frontend logic in WP

**CI/CD + DevOps:**
- Use Vercel preview deployments
- Husky pre-commit hook for lint/tests
- GitHub Actions for builds

**Testing:**
- Use Playwright or Cypress for UI testing
- Unit tests with Vitest or Jest

---

### 6. TEAM ROLES & DEPARTMENTS

**Brand & Creative:**
- Approves visuals, packaging, and copy

**Product Development:**
- R&D, sourcing, and formulation

**Marketing & Social:**
- Launch strategy, campaigns, influencers

**Web Development:**
- Handles Next.js site and integrations

**Sales & Customer Support:**
- Manages eCommerce backend, order fulfillment

---

### 7. LAUNCH ROADMAP

**PHASE 1 – MVP (Month 1–2)**
- Brand kit finalization
- Packaging & label production
- First 3 batches produced
- Website soft launch

**PHASE 2 – Marketing Rollout (Month 3–4)**
- Instagram soft launch
- Test campaign ads
- Influencer seeding

**PHASE 3 – Sales Scaling (Month 5+)**
- Retail distribution
- Subscription bundles
- Product expansion

---

### 8. DOCUMENT VERSIONS

Use version control on this document. Departments should request updates via [Notion/Craft/Google Docs] comments or tickets.

**Version 1.0 – May 2025**

