# CLAUDE.md

Friday deliverable for Round Robin (Engineering track): the Vello **ProviderCard**, built against the
Vello Design System. Parent-folder `CLAUDE.md` (`design/CLAUDE.md`) still governs — its five rules
and the "Vello is not real; planted flaws stay catalogued" rule apply here.

## Commands

`npm run dev` · `npm run lint` · `npm run typecheck` · `npm test` · `npm run build` · `npm run verify` (all four).

## Layout

- `src/components/ProviderCard/` — the component, its CSS (every non-token value sits in one
  `UNRESOLVED` block), and tests (semantics, content, axe, CSS guardrail).
- `src/vello-ds/` — the design system, vendored: token CSS verbatim, four components ported to TS.
  `src/vello-ds/README.md` records provenance and every deviation.
- `docs/fidelity-audit.md`, `docs/unresolved-questions.md` — the audit and the open questions.
- `public/reference/provider-card-screenshot.png` — the screen that was handed off.

## Sources of truth

Design system: https://vello-design-system.vercel.app/docs/index.html (bundle at `/_ds_bundle.js`,
tokens at `/tokens/*.css`). Prototype: https://vello-product.vercel.app/prototype.html (the card is
`NeighborCard` in `flow-home.jsx` + `flow.css` `.nb*`). Read the source behind a screen before
measuring the screen.

## Guardrail

> Before implementing UI from a design system, map every visual value to an existing token. Never
> invent unresolved values. After implementation, audit token usage, semantics, keyboard access,
> focus states, labels, and contrast.

How it is enforced here: every value in `ProviderCard.css` is either a `var(--token)` or a `--pc-*`
custom property inside the `UNRESOLVED` block with its observed value, source and nearest token;
`ProviderCard.test.tsx` fails on any hex colour or any px literal outside that block; the audit in
`docs/` is the post-implementation pass.
