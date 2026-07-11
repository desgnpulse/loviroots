# Lovi Homepage — Fable Exploration: "Body Temperature"

Prototype: `docs/loviroots-index-fable.html` (self-contained; open directly in a browser —
images resolve relatively to `../public/images/`).

## Creative thesis

The current live homepage ("Quiet Restoration") is a good quiet-editorial page — but its
concept is a mood. This round is built on a **mechanism**: the one physical truth of
unrefined shea is that it is *solid at room temperature and turns to silk at skin
temperature*. That fact is simultaneously the sensory promise, the purity proof (nothing
added to soften it artificially), and the usage instruction. So the entire page is
organised around temperature:

- **Headline is the whole pitch in eight words** — "Solid at 24°. Silk at 37°." The word
  *Silk* is set in Fraunces and literally softens after load, animating the font's SOFT
  variable axis from 0→100 while warming to amber. A typeface that melts, for a butter
  that melts.
- **The page warms as you scroll.** Backgrounds ramp ivory → sand → parchment → deep
  cacao, peaking at the order section, which is labelled `37.5°C — BODY TEMPERATURE ·
  YOU'RE HERE`. Conversion happens at body heat; the palette makes the funnel physical.
- **A fixed temperature rail** (desktop) and a live readout in the header (all sizes)
  track scroll progress as a rising °C reading, 23.6° → 37.5°. Decorative, aria-hidden,
  cheap (one rAF-throttled scroll handler).
- **The state-change triptych** (Solid / Melting / Sealed) replaces the old "ritual"
  section — same instructional content (scoop, warm, press), but told through the
  product's physics and the three strongest photos: butter in jar → whipped on
  terracotta → bare skin.
- **The ingredient list as a manifesto.** "Butyrospermum parkii." set at ~6rem italic,
  then an actual back-of-jar INCI label card (mono type, dashed rules) listing what is
  *not* in it. The label — normally the most boring artefact in skincare — becomes the
  hero of trust.

Type moved from Playfair Display to **Fraunces** (variable: opsz + SOFT + WONK axes give
it the buttery, hand-hewn quality Playfair lacks, and the SOFT axis *is* the concept),
Inter retained for body, Space Mono added for temperature/data/label voice. Palette keeps
the brand tokens (ivory, earth, gold; leaf green ceded to a deep accessible WhatsApp
green) and adds molten amber `#C97B3D` + cacao `#211309` as the warm end of the ramp —
sampled from the photography itself.

## What changed vs. the live homepage, and why

| Live page | This round | Why |
|---|---|---|
| Mood headline ("Quiet Restoration.") | Mechanism headline ("Solid at 24°. Silk at 37°.") | Says what the product *does* in the first second; the 30-second rule starts at word one |
| Numbered micro-sections (01/02/03) | Temperature-labelled sections (24.1° → 37.5°) | Same editorial discipline, but the numbers now mean something |
| Ritual steps as a text grid | State-change triptych with photography | The instruction and the proof of purity become one section; photos carry the sensory load |
| Ingredient truth as three text columns | Giant INCI line + rendered jar label | A label you can read is worth three paragraphs about honesty |
| All-light page | Light → dark warm ramp, order section on cacao | Gives the single product moment maximum contrast and focus; the green CTA is unmissable on cacao |
| Static WhatsApp links | Size selector (100g/250g/500g) that rewrites the wa.me deep link + price live | Implements the PRD's product-page CTA spec on the homepage itself |
| No persistent mobile CTA | Sticky bottom "Order via WhatsApp" bar on mobile | The primary action stays a thumb away; auto-hides while the hero or order CTA is already on screen to avoid doubling |
| No social proof handling | Explicit zero-review pattern ("Reviews open with our first deliveries — be first") | PRD wants reviews eventually; this designs the empty state honestly instead of faking stars |

Kept from the live page (it works): the hero photograph, "From KES 350 · Delivered across
Kenya", the WhatsApp message format, the journal section concept, the email-capture
close, generous whitespace and one action per section.

## Hard-rule compliance — confirmed

- **WhatsApp primary, checkout secondary, never inverted.** Green filled `Order via
  WhatsApp` button at every purchase moment (hero, order section, sticky mobile bar,
  header pill). "or checkout online →" appears once, in the order section, as a subdued
  uppercase text link below the button — exactly the PRD's `[primary] / or checkout
  online →` hierarchy. Verified visually in headless renders at 1440px and 375px.
- **One primary action per section.** Hero: WhatsApp. Order: WhatsApp. Story: "Read the
  Loviroots story". Journal: "All entries". Email: "Join the Lovi list". The header
  pill and sticky bar repeat the *same* action, they don't compete with it.
- **Mobile-first.** Checked at 375×667: single column, full-width CTAs, nav collapses
  (single-scroll page + sticky order bar cover navigation), safe-area padding on the
  sticky bar, images sized with width/height attributes, below-fold images lazy-loaded.
- **The retired brand name appears nowhere.** Case-insensitive grep on the output:
  zero hits. Loviroots used only in legal/about/footer contexts; Lovi everywhere
  customer-facing.
- **No fake testimonials/stats.** No reviews, counts, or "10,000 happy customers"
  anywhere. The review slot is a designed empty state. Journal cards are realistic
  editorial placeholders consistent with the PRD's blog categories.
- **No invented infrastructure claims in copy.** Payment copy says "M-Pesa and cards" /
  "online checkout" — no gateway names.
- **Accessibility.** Semantic landmarks, h1→h2→h3 hierarchy, skip link, alt text on all
  photography, visually-hidden label on the email input, focus-visible outlines, radio
  fieldset with legend for sizes, decorative elements aria-hidden, contrast checked on
  every text/background pair (dropped the live page's 25%-opacity micro-labels for
  `#7A614E`-class values that clear WCAG at small sizes).
- **prefers-reduced-motion.** Kills the marquee, badge rotation, reveals (forced
  visible), scroll smoothing, and renders the hero "Silk" in its final soft/amber state.
- **Verified headless** (Chrome `--headless=new`): all 9 image paths resolve, zero
  console/JS errors, desktop + mobile full-page screenshots reviewed section by section.

## Proportionate ideas beyond this HTML

- **The temperature system is a packaging/brand asset**, not just a web gimmick: "Solid
  at 24°. Silk at 37°." belongs on the jar label, and the 37° seal (the rotating badge)
  could be the brand's certification-style mark on social and packaging.
- **wa.me message could carry the selected size AND price** ("…– 250g (KES 750)") so the
  WhatsApp thread starts with zero back-and-forth; trivial change in the deep-link
  builder when this ports to `page.tsx`.
- **Batch numbers on the label card** ("Batch 07 · pressed June") once real batches
  exist — small-batch honesty is cheap, credible social proof before reviews arrive.
- **Exit-intent email capture (desktop)** from the PRD is compatible with this design;
  reuse the `#list` form in a non-modal slide-in to respect the "no modal overlays"
  principle.

## Open items / deliberately not done

- **Prices for 250g (KES 750) and 500g (KES 1,300) are placeholders** — only 100g/KES
  350 is corroborated by the live site. Confirm before any port.
- **WhatsApp number is `254700000000`** — production must read
  `NEXT_PUBLIC_WHATSAPP_NUMBER`; noted in an HTML comment at the top of the file.
- **Followed the live page's single-ingredient story** (100% Butyrospermum parkii), which
  contradicts PRD §1 ("shea butter, aloe vera, and coconut oil") and the product
  taxonomy's Skin Butter blend. Evidence > docs: the live implementation is newer and
  more considered, and "one ingredient" is the stronger brand position — but this needs
  a principal decision before launch, because the INCI label section is only honest if
  the jar really is pure shea. Flagging rather than hedging the design.
- **No cart, no product grid, no multi-product nav** — the PRD's taxonomy doc lists a
  wider range (castor oil, comfort oil), but this is the homepage for the flagship;
  "Browse the shop →" is the exit for range-seekers.
- **Did not build A/B or analytics scaffolding into the prototype** — this is a design
  artefact; instrumentation belongs in the Next.js port, not inline script.
- **Hero copy claims "packed in small batches in Kenya"** — consistent with the brand's
  home-made origins in the taxonomy doc, but confirm the actual packing location before
  this ships as fact.
