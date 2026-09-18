# Vendored Vello Design System

There is no npm package for the Vello Design System; it ships as a browser
bundle. Everything in this folder is copied from the live system so the
component never hardcodes a value the system already names.

| Path | Source (fetched 2026-09-18) | Changed? |
|---|---|---|
| `styles.css` | https://vello-design-system.vercel.app/styles.css | verbatim |
| `tokens/fonts.css` | https://vello-design-system.vercel.app/tokens/fonts.css | verbatim |
| `tokens/colors.css` | https://vello-design-system.vercel.app/tokens/colors.css | verbatim |
| `tokens/typography.css` | https://vello-design-system.vercel.app/tokens/typography.css | verbatim |
| `tokens/spacing.css` | https://vello-design-system.vercel.app/tokens/spacing.css | verbatim |
| `tokens/base.css` | https://vello-design-system.vercel.app/tokens/base.css | verbatim |
| `components/Avatar.tsx` + `.css` | `_ds_bundle.js` → `components/display/Avatar.jsx` | ported to TS; see header |
| `components/Badge.tsx` + `.css` | `_ds_bundle.js` → `components/display/Badge.jsx` | ported to TS; see header |
| `components/Rating.tsx` + `.css` | `_ds_bundle.js` → `components/display/Rating.jsx` | ported to TS; see header |
| `components/VerifiedMark.tsx` | `_ds_bundle.js` → `components/display/VerifiedBadge.jsx` | ported to TS; glyphs verbatim |

Component CSS is copied verbatim from each component's `*_CSS` string in the
bundle, including the system's own hardcoded pixel values (Avatar `64px`,
Badge `11px` / `4px 9px`, Rating `14px`). Those are upstream decisions and
are listed in `docs/fidelity-audit.md`, not silently retokenised here.

Deliberate deviations from the bundle are accessibility fixes only, and each
one is documented in the file header of the component that carries it.
