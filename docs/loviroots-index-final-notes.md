# loviroots-index-final.html — refinement notes

Source: `loviroots-index-fable.html` ("Body Temperature," round one — the chosen
direction). This is a **targeted craft pass only**: remove italics, replace
with a non-italic treatment that preserves the same emphasis/voice. Nothing
else was touched.

## What "italic" meant in this file

Fraunces was loaded with both the upright (`0,...`) and italic (`1,...`) axis
ranges (`ital,opsz,wght,SOFT,WONK@0,...;1,...`), and four places used it:

1. **Hero "Silk" melt** (`h1 .melt`) — `font-style: italic`, animating its
   `SOFT` variation axis from 0 → 100 on load. This was the signature
   interaction: the word visually "melting" as the page loads.
2. **Ingredient manifesto headline** (`.inci`, "*Butyrospermum parkii.*") —
   static italic display type.
3. **Section-header emphasis** (`h2 em`, e.g. "*Three states.*") — static
   italic.
4. **Story pull-quote emphasis** (`#story blockquote em`, "*We jarred it.*")
   — static italic.

## What replaced it

All four now use **upright "warmed type"** — the same idea (borrowed weight,
softened terminals, looser rhythm, warmer color = emphasis), built entirely
from Fraunces' non-italic variable axes plus letter-spacing and color. No
`font-style: italic` remains anywhere in the file. The Google Fonts request
was trimmed to drop the italic axis range entirely (smaller font payload,
and removes any possibility of a browser italic fallback).

### 1. Hero "Silk" — the signature melt, redesigned

This was the one that mattered. The old version leaned on `font-style:
italic` *plus* a SOFT-axis ramp. The new version drops the slant and instead
animates three axes together so the word visibly changes state on load,
the same way shea does in your hand:

**Solid state (0–900ms, on page load):**
- `font-variation-settings: "opsz" 144, "wght" 640, "SOFT" 0, "WONK" 0`
- `letter-spacing: -.03em` (tight, dense, held together)
- Ink-dark color (inherited `--ink`)

**Warmed state (transitions in over 2.2s, same easing/timing as before):**
- `font-variation-settings: "opsz" 144, "wght" 400, "SOFT" 100, "WONK" 1`
- `letter-spacing: .045em` (loosens — the word visibly "gives way")
- Color shifts to `--amber`

So "Silk" now starts **heavier and tighter** than "Solid" (a held, dense
lump) and animates to **lighter, looser, warmer, and slightly wonky**
(giving way, spreading, going liquid) — weight loss + loosening kerning +
color warm, standing in for the italic slant. It's a bigger, more legible
"before/after" than the original (which only moved the SOFT axis), and it
reads unmistakably as melting rather than as a font swap.

The trigger logic, timing (900ms delay, 2.2s ease), and `prefers-reduced-motion`
fallback (jump straight to the warmed end-state) are unchanged — only the
CSS the JS toggles was redesigned.

### 2. Ingredient manifesto ("Butyrospermum parkii.")

Was static italic display type. Now set permanently in the **melted
end-state** of the same system used in the hero — light weight (420),
`SOFT 100`, `WONK 1`, loosened tracking (`+.015em` instead of the old
`-.01em`). Reads as the "settled," fully-melted register appropriate for a
manifesto about what's *inside* the jar — visually continuous with the hero
without duplicating its animation.

### 3 & 4. Section-header and pull-quote emphasis (`em`)

Both were plain italic with a SOFT/WONK bump. Now explicitly `font-style:
normal` plus the same non-italic warmed treatment: `SOFT 100`, `WONK 1`, and
color pushed to the section's accent (`--amber` for "Three states.",
`--gold` for "We jarred it." in the dark story section). Emphasis now reads
through weight/color/form instead of slant, consistent with the hero and
the manifesto.

## What was NOT touched

- Structure, layout, grid, section order — unchanged.
- Temperature-gauge scroll mechanism (`.temp-rail`, `#tempFill`, `#tempRead`,
  `#tempSm`, the scroll listener) — unchanged, verified still functioning
  (23.6° → 37.5° across scroll).
- State-change triptych (`#states`, the three cards) — unchanged.
- Functional size selector (`fieldset.sizes`, price/WhatsApp deep-link JS)
  — unchanged.
- Color system (`--ivory/--sand/--amber/--gold/--earth/--cacao` etc.) —
  unchanged; the melt effect now *uses* `--amber` more visibly but no token
  values were altered.
- Real product photography and all `<img>` usage — unchanged.
- Rotating melting-point badge SVG, ticker, footer, journal, email capture,
  mobile sticky bar — unchanged.

## Verification performed

Headless-browser check (Playwright + system Chrome) at desktop (1440×900)
and mobile (390×844):

- **Console/JS errors:** zero on both viewports.
- **Italic sweep:** computed `font-style` checked on every element in the
  DOM at both viewports — zero elements report anything other than
  `normal`. No italic (or oblique) rendering remains anywhere on the page.
- **"Silk" phase-change confirmed functioning:**
  - Mobile, captured mid-load before the warm trigger fires:
    `font-variation-settings: "SOFT" 0, "WONK" 0, "opsz" 144, "wght" 640`,
    `letter-spacing: -1.44px`, dark ink color, `warmed` class absent.
  - After the 900ms delay + 2.2s transition completes, both viewports
    converge on: `"SOFT" 100, "WONK" 1, "opsz" 144, "wght" 400`,
    `letter-spacing: ~5.2px` (desktop) / `~2.2px` (mobile, scaled with
    `clamp()` type size), amber color (`rgb(201,123,61)`).
  - This is a real, animated, multi-axis transition — not a static swap —
    confirmed via screenshots at both widths showing "Silk" clearly
    lighter, looser, and warmer-colored than "Solid."
- **`em` emphasis spot-check:** "Three states." and "We jarred it." both
  render `font-style: normal` with accent coloring (amber / gold
  respectively) at both viewports.
- **Regression check:** temperature reading at bottom of scroll = 37.5° on
  both viewports (scroll mechanism intact).
- Screenshots captured at both widths for visual confirmation of the hero
  moment.

## Files

- New: `/home/jay/dev/lovi/docs/loviroots-index-final.html`
- Unchanged (reference): `/home/jay/dev/lovi/docs/loviroots-index-fable.html`,
  `/home/jay/dev/lovi/docs/loviroots-index-fable-v2.html`
