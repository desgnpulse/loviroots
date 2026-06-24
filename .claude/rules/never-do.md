# Lovi — Project-Specific Never-Do Rules

❌ Never write "Lovy" — registered brand is Loviroots; Lovi is the accepted short name
❌ Never use Lovi where the registered name is required (legal, invoices, company bio, About page formal copy) — use Loviroots
❌ Never hardcode the WhatsApp number — always use NEXT_PUBLIC_WHATSAPP_NUMBER from .env
❌ Never store orders in a client-side-only state that survives page reload — cart is ephemeral local state only
❌ Never skip output: 'standalone' in next.config.ts — Docker deploy requires it
❌ Never call WPGraphQL with unauthenticated mutations — read-only public queries only on the frontend
❌ Never expose Pesapal consumer secret to the client — all Pesapal calls go through /api routes
❌ Never skip IPN signature verification on Pesapal callbacks — treat unverified callbacks as untrusted
❌ Never bypass NextAuth session check on /admin routes — every admin page must verify the session server-side
❌ Never publish a customer review without admin approval first — reviews are moderated before display
❌ Never use Vercel-specific features (Edge Runtime, Vercel KV, Vercel Blob) — deploy target is Hetzner
