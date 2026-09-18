# ProviderCard — fidelity audit

Component: `src/components/ProviderCard/` · Reference: `public/reference/provider-card-screenshot.png`
Sources read: the design system's component bundle, its five token files, and the prototype's `flow-home.jsx` + `flow.css`.

**The screen is not the design system's ProviderCard.** It is the prototype's `NeighborCard`. The design system's version has a Book button, distance in miles, and a green badge. I used the screen for layout and the design system for tokens.

## Tokens used correctly
Card surface, border, radius, hover/featured shadows, motion, name (display font, bold, ink), service (body), price (mono), chips (pill), stars (amber), chevron colours, focus ring — all from `--*` tokens.

## Drift found → fixed
| Drift | Fix |
|---|---|
| Hardcoded values that equal a token (8px, 4px, 700/600/500, 14px, 12px, `--green-700`) | Replaced with the token. No visual change. |
| Verified shield drawn by hand | Design system `<Avatar verified>` — same pixels. |
| Available badge drawn by hand, orange (accent) | Design system `<Badge variant="brand" size="sm" dot>` — what the design system's ProviderCard specifies. Green now. |
| Off-scale values: padding 15px, name 17px, service 13.5px, spacing 3/9/10px, chip padding/border/tint | Kept as drawn, each declared once as `--pc-*` in the `UNRESOLVED` block of `ProviderCard.css`. Not snapped — that is a design decision. |
| The design system's own hardcodes (14px gap, 1.5px border, 26px chevron, 64px avatar) | Kept verbatim, labelled `DS` in the stylesheet. |

A test fails on any hex colour or px literal outside the `UNRESOLVED` block.

## Accessibility found → fixed
| Issue | Fix |
|---|---|
| Card is a `<button>` that navigates | `<a href>` (`<article>` when there is no link) |
| No focus style | `:focus-visible` → `--focus-ring` |
| Badge contrast 4.10:1 (fails) | Brand variant 5.70:1 |
| Avatar alt repeats the name | `alt=""` |
| Stars: invalid `aria-label`, 5 exposed SVGs | Stars hidden; "4.9 out of 5 stars" spoken |
| Link name is the whole card text | `aria-labelledby` → the name (`<h3>`) |
| Hover is motion-only | Border/shadow change + `prefers-reduced-motion` |

axe: 0 violations. All other text ≥ 5:1.

## Unresolved
See `unresolved-questions.md`. Values live in `ProviderCard.css` between `BEGIN UNRESOLVED` / `END UNRESOLVED`.

## Verification
`npm run lint` · `npm run typecheck` · `npm test` (18 pass) · `npm run build` — all pass.
