# ProviderCard — fidelity audit

Component: `src/components/ProviderCard/` · Reference: `public/reference/provider-card-screenshot.png`
Sources checked: the design system bundle and its five token files, the prototype's `flow-home.jsx`, `flow-shared.jsx` and `flow.css`.

**The screen is not the design system's ProviderCard.** It is the prototype's home-screen card. The design system card reads as a booking row: miles, review count, hourly price, Book button. The prototype card reads as a browse row: walking minutes, "from" price, no button, and tapping anywhere on the card opens the provider. I built the prototype card with the design system's tokens. Whether it becomes an official variant is a design decision. Side-by-side comparison in `unresolved-questions.md`, question 1.

## Tokens used correctly
Every colour, font family, weight, radius, shadow, duration and the focus ring come from `--*` tokens. The sizes that do not are in the table below.

## Drift found and fixed
| What I found | What I did |
|---|---|
| Uses raw numbers where a token exists: 8px, 4px, weights 500/600/700, 12px, 14px, and `--green-700` instead of its alias `--text-brand`. | Replaced each with the token. Looks the same. |
| Draws its own verified shield and places it over the avatar. | Used the avatar's built-in verified option. Same pixels. |
| Draws its own Available badge in coral. The text fails contrast at 4.10:1. | First pass (`Friday/practice5.3.md`): kept coral, darkened the text, 13.97:1. Final: the design system's green badge, 5.70:1. It is the badge the system's own ProviderCard uses. Coral is still an option; the first pass is the recipe. |
| Uses sizes that match no token: 15px padding, 17px name, 13.5px service text, 3/9/10px spacing, chip padding and border. | Kept exactly as drawn. Each one is listed once in the `UNRESOLVED` block of `ProviderCard.css` with its nearest token. Rounding them is a design call, not mine. |
| The design system itself uses raw numbers: 14px gap, 1.5px border, 26px chevron, 64px avatar. | Kept as is. In the stylesheet each one carries a note saying it comes from the design system, not the prototype. |
| Rows never wrap. The prototype renders inside a fixed 375px phone frame, so it never meets a narrower screen. In my test at 360px and 320px wide, the rating spilled past the card edge and the name broke in two beside the Available badge. | Both rows wrap. No breakpoint, so the card works in any container. At the design system's app width, 430px, nothing changes. Checked at 320, 360, 390 and 430px. |

Nothing was invented. The hover lift is in both the prototype and the design system.
A test fails if a raw colour appears anywhere in the stylesheet, or a pixel value appears outside the `UNRESOLVED` block.

## Where the design system contradicts itself
Not fixed here. Both sides are the design system, so only design can pick one.

| The rule | What happens |
|---|---|
| Card: "A clickable card must be a link or button, not a div with onClick." and "Do not place two competing actions inside a tappable card." | The system's own ProviderCard is a div with a hover lift and a Book button inside. The prototype card follows the rule with one button and nothing nested inside it. This build follows it with one link. |
| Typography: "Do not use display type below 30px." | The system's own ProviderCard sets the name in the display font at 20px. The prototype does it at 17px. |
| Typography: "Do not set body copy below 14px anywhere in product." | The prototype's service text is 13.5px. This one is on the prototype. It nearly settles question 3: the system already said 14. |

## Accessibility found and fixed
Rule numbers come from the Web Content Accessibility Guidelines, the standard used to check accessibility. Level AA is the level most products are held to.

| Issue | Rule | Fix |
|---|---|---|
| The prototype's card is a button, but tapping it moves to another screen. | 4.1.2 Name, Role, Value | A link. An article when there is nowhere to go. |
| Focus shows the browser's default ring, not the system's. | 2.4.7 Focus Visible | `--focus-ring` on keyboard focus. |
| Available text is 4.10:1. Level AA needs 4.5:1. | 1.4.3 Contrast | See the badge row above. |
| The photo's alt text repeats the name shown next to it. | 1.1.1 Non-text Content | Empty alt. The name is already there. |
| Stars have a label on a plain span, which the accessibility spec for web apps does not allow, and the five star icons are not hidden from screen readers. | 1.3.1 Info and Relationships | Icons hidden. Screen readers hear "4.9 out of 5 stars". |
| The card's name for screen readers is every word inside it. | 2.4.4 Link Purpose | The link's name is the provider's name. |
| The hover lift ignores the reduced-motion setting. | 2.3.3 Animation from Interactions | With reduced motion on, the lift is off. The shadow and border change stay. |

The component also runs through axe, an automated accessibility checker, as part of the tests. It reports no problems. axe cannot measure colour contrast inside the test runner, so I computed contrast by hand from the token values: all text is 5:1 or better. Stars and chevron are decorative and hidden from screen readers.

## Unresolved
Ten questions for design in `unresolved-questions.md`. The values sit in `ProviderCard.css` between `BEGIN UNRESOLVED` and `END UNRESOLVED`.

## Verification
`npm run verify` runs lint, typecheck, 18 tests and the build. All pass. Rendered and checked in Chrome at 320, 360, 390 and 430px.
