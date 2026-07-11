# Lovi Homepage — Fable Exploration, Round Two: "The Family Formulary"

Prototype: `docs/loviroots-index-fable-v2.html` (self-contained; open directly in a browser —
images resolve relatively to `../public/images/`). Additive to round one; nothing else touched.

## Creative thesis

Round one ("Body Temperature") was built on **physics** — a mechanism, a gauge, a phase
change. Round two is built on **memory**: the homepage is a family formulary — a book of
recipes handed down across generations, now pressed into jars. Every design decision comes
from the book, not the lab:

- **The page is set like a book.** Roman-numeral chapters (Chapter I · The Shelf → Chapter
  V · The List), gilt fleurons, fine ledger rules, a drop cap in the story, a colophon in
  the footer ("Set in Cormorant & Newsreader, like a good book"). Paper grain via one tiny
  tiled `feTurbulence` SVG on a fixed layer — no image weight.
- **Photographs are tipped in, not laid out.** Every photo sits on a cream mount with tape
  strips and a handwritten Caveat caption, like plates pasted into a family album. Hovering
  straightens them.
- **The ingredients are a botanical index.** Five hand-drawn SVG specimen plates — shea
  (the base), aloe (the calm), coconut (the softener), herbs (the tradition), essential
  oils (the signature) — with Latin names where honest and "grown & gathered" where a Latin
  name would be a lie. The drawings ink themselves in on scroll (`pathLength="1"` +
  dashoffset transitions).
- **The order section is a recipe card.** "Recipe No. 01 — Lovi Shea Butter": description,
  a three-step "To use" in lowercase roman numerals, and a size ledger with dotted leaders.
  Selecting a size draws a rough ochre ink circle around it — the family's pen choosing
  from the ledger — and rewrites the wa.me deep link, the button price, and the sticky bar.
- **A rubber-stamp brand mark** ("LOVI · BY FAMILY RECIPE") inked over the hero photo's
  corner, and a hand-drawn double underline that draws itself under "handed down" in the
  headline. Handwritten ochre marginalia throughout ("start smaller than you think — it
  goes far").
- **Email capture is "The list at the back of the book"** — the metaphor closes the page
  instead of a generic newsletter block.

Type system: **Cormorant Garamond** (display — old formulary title pages), **Newsreader**
(body — book text), **Caveat** (the hand in the margins), **Inter** (buttons/labels only —
the "shop layer" stays crisp and unmistakably clickable against the book world). Palette:
parchment `#F7F1E5`, warm reading ink `#2B2118`, botanical moss `#47663F`, stamp ochre
`#A0431F`, gilt `#B98F3E` (ornament only, never text), deep accessible green `#0B6B45` for
the WhatsApp CTA.

## How it differs from round one, specifically

| Round one ("Body Temperature") | Round two ("The Family Formulary") |
|---|---|
| Organizing idea: a physical **mechanism** (24°→37° phase change) | Organizing idea: **inheritance** (recipes handed down, now in jars) |
| Sections labelled by rising temperature | Sections as book chapters, Roman numerals + fleurons |
| Light→dark warm colour ramp, order section on cacao | All-light paper world; contrast comes from ink, not darkness |
| Fraunces (melting SOFT axis) + Space Mono data voice | Cormorant Garamond + Newsreader + Caveat handwriting voice |
| Single ingredient as the whole story; INCI label as hero | Five-ingredient shelf as the story; botanical specimen index as hero |
| Temperature rail / live °C readout | Self-drawing ink: underlines, specimen plates, size-circling |
| State-change photo triptych | Tipped-in album plates with tape and handwritten captions |
| 37° rotating seal badge | Rubber stamp "BY FAMILY RECIPE" over the photo corner |

No temperature, no phase change, no gauge, no dark ramp anywhere in round two.

## Hard-rule compliance — verified

- **WhatsApp primary, checkout secondary, never inverted.** Filled green `Order via
  WhatsApp` at the hero and on the recipe card (full-width, with live price); sticky
  mobile bar repeats the same action. "or checkout online → M-Pesa & card" appears once,
  as a subdued uppercase text line under the button — exactly the PRD hierarchy. Verified
  visually at 1440px and 375px.
- **One primary action per section.** Hero: WhatsApp. Recipe: WhatsApp. Story: "Read the
  Loviroots story". Journal: "All entries". List: "Join the Lovi list". Header "Order ↓"
  and the sticky bar are wayfinding to the same action, not competitors.
- **Mobile-first.** Checked at 375px full-page: single column, full-width CTA (compacted
  type ≤430px so it never wraps), specimen plates collapse to art-left/text-right rows,
  journal cards become horizontal index cards, sticky order bar with bookmark ribbon and
  safe-area padding, tape/tilt effects kept subtle, hero margin note hidden.
- **Corrected multi-ingredient story.** The lede names all five ingredient families; the
  specimen index is the page's biggest section; copy states explicitly that "different
  products take different measures" and that "the full list for each recipe lives on its
  jar". The flagship description matches PRD §1 (shea + coconut + aloe). No purity-of-one
  claim anywhere (grepped for "only ingredient", "100%", "nothing else": zero).
- **Naming.** "Lovi" everywhere customer-facing; "Loviroots" only in the story section,
  footer brand block, and legal line. Retired name: zero hits (case-insensitive grep).
- **No fake social proof.** No reviews, stars, counts, or testimonials. Handwritten
  captions are brand voice describing the photos, not quoted customers.
- **No infrastructure vendors in copy** (grepped): payment copy says "M-Pesa & card".
- **Accessibility.** Semantic landmarks, skip link, h1→h2→h3, alt text on all six photos,
  fieldset/legend + real radios for sizes (focus ring on the size name via `:has`),
  visually-hidden email label, decorative SVGs `aria-hidden`, focus-visible outlines,
  contrast: secondary ink `#5D4C3B` on parchment ≈ 6.5:1, CTA green ≈ 7:1 with cream text,
  gold never used for text.
- **prefers-reduced-motion.** Reveals forced visible, all ink strokes pre-drawn (including
  the size circle), tilt-hover and bar transitions dropped, smooth scroll off.
- **Verified headless** (Chrome `--headless=new`): all 6 image paths resolve, zero page
  console errors, full-page renders reviewed at 1440px and 375px section by section.
  Issues found and fixed during review: stamp/caption collision, coconut drawing legibility,
  dash-cap dot artifacts on unselected size rings, CTA wrap at 375px, hidden-state bookmark
  ribbon peeking above the viewport, hero note touching the edge.

## Proportionate ideas beyond this HTML

- **The stamp is a packaging asset.** "LOVI · BY FAMILY RECIPE" works as the jar-lid seal
  and social watermark; the specimen drawings work as per-ingredient icons on labels and
  as a per-product "what's in this recipe" strip on product detail pages.
- **"Recipe No. NN" is a product taxonomy.** Numbering the line as formulary entries gives
  every future product (oils, hair blends) a built-in naming system and a collectible logic
  ("which recipes do you have?") — cheap brand equity before reviews exist.
- **The specimen index becomes the product-detail ingredient section** in the Next.js
  port — same plates, filtered per product, driven from WP product content.
- **wa.me message carries size + price** (implemented here), so the WhatsApp thread starts
  with zero back-and-forth.
- **Journal "margins" pattern** ports directly to the blog index: index cards with ruled
  lines are a distinctive, ownable article-card style.

## Open items / deliberately not done

- **Prices for 250g (KES 750) and 500g (KES 1,300) are placeholders** — only 100g/KES 350
  is corroborated. Flagged in the HTML header comment; confirm before any port.
- **WhatsApp number is `254700000000`** — production reads `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- **"Herbs" and "essential oils" are named generically on purpose.** Which herbs/oils are
  actually in the flagship is unconfirmed; the design gives them roles ("the tradition",
  "the signature") without inventing species. Fill in real botanicals when formulations
  are documented.
- **Generational claims kept general.** "Passed from one generation to the next" mirrors
  the brief's stated brand truth; no generation counts, founding dates, or named ancestors
  were invented.
- **No reviews module, even as an empty state** — round one already designed that pattern;
  repeating it here would converge the two rounds. The recipe card stays clean; reviews
  slot naturally under it later.
- **No cart/product grid/multi-product nav** — homepage for the flagship; "Browse the
  shop →" is the exit for range-seekers.
- **No analytics/A-B scaffolding** — design artefact; instrumentation belongs in the port.
- **First journal card reuses the label-close-up photo** (`post-pregnancy.jpg` — filenames
  and contents don't always match in `/images/blog/`). It illustrates an article about
  reading labels generally; it should not be presented as a Lovi jar anywhere else.
