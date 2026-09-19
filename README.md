# Vello ProviderCard

The Vello home-screen provider card, built on the Vello Design System.

## Run it

Needs Node 20 or newer.

```sh
npm install
npm run dev
```

Open the URL the terminal prints. The demo shows four cards and the reference screenshot. Resize the window down to 320px to see the mobile layout.

```sh
npm run verify
```

Runs lint, typecheck, tests and build. It should end with `built in` and no errors.

## What to review

1. Open `docs/fidelity-audit.md`. It lists every value that differs from the screen and why.
2. Open `docs/unresolved-questions.md`. Ten decisions only design can make. Each one is a quick pick.
3. Compare the demo against `public/reference/provider-card-screenshot.png`.

## Notes for the design team

- The screen is the prototype's NeighborCard, not the design system's ProviderCard. The two differ (Book button, miles, badge colour). I followed the screen for layout and the design system for tokens.
- The Available badge is green, not coral. The coral fails WCAG AA contrast (4.10:1, minimum 4.5:1). Green is the design system's brand variant at 5.70:1. A darker coral text also passes (13.97:1) and is documented in the audit if you prefer coral.
- Values that sit on no token (15px padding, 17px name, 13.5px service text) are kept exactly as drawn. They are not rounded to the nearest token. That call is yours. The demo has a checkbox that previews the nearest-token version.
- The card wraps its rows on narrow screens. Nothing clips down to 320px. At 430px it matches the screen.
- The whole card is one link. Tapping anywhere opens the provider.

## Where things are

| Path | What |
|---|---|
| `src/components/ProviderCard/` | The component, its CSS and tests |
| `src/vello-ds/` | Design system tokens and components, copied with a record of every change |
| `docs/fidelity-audit.md` | Token drift, accessibility fixes, corrections |
| `docs/unresolved-questions.md` | Open decisions for design |
| `public/reference/` | The screen that was handed off |

## Guardrail

Every value in the card's CSS is a design token, or sits in one marked block with its source and nearest token. A test fails if any colour or pixel value appears outside that block.
