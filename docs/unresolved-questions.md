# ProviderCard — unresolved questions

Not answerable from the Vello references. Each one is a quick pick.

1. **Source of truth:** the design system's ProviderCard or the prototype's home-screen card? → **design system / prototype / make the prototype card an official variant**

   | | Design system ProviderCard | Prototype card (built here) |
   |---|---|---|
   | Distance | `0.4 mi`, map-pin icon | `6 min walk`, footprints icon |
   | Rating | `4.9 (213)`, with review count | `4.9`, no count |
   | Price | `$28 per hr`, large, on the right | `from $24 / walk`, small, in the text |
   | Action | Book button inside the card | Chevron. The whole card opens the provider |
   | Service | `Dog walker · 3 yrs` | One-sentence bio |
   | Skill chips | `Brings supplies`, `Pet first-aid` | None |
   | Name size | 20px | 17px |
   | Available badge | Green | Coral |

   The design system's Minimal example already says "drop price and distance in contexts where they are already known", so it expects variants. The home subtitle says "minutes away", so walking minutes match the copy.
2. **Name size:** keep 17px, or snap to `--text-md` 18 / `--text-lg` 20? → **17 / 18 / 20**
3. **Service text:** keep 13.5px or snap to `--text-sm` 14? → **13.5 / 14**
4. **Card padding:** keep 15px or `--space-4` 16? → **15 / 16**
5. **Walk-time chip:** new Badge variant (tinted + bordered, mono), or reuse `Badge brand`? → **new / reuse**
6. **Distance:** walk minutes or miles by default? → **walk / miles**. This is a product decision, not a visual one: miles come from straight-line distance, walking minutes need a route calculation or a stored value.
7. **Price copy:** keep "from", or "$24 · per walk" like the design system? → **from / design system**
8. **Review count:** show "(213)" on the home screen? → **yes / no**
9. **Featured card:** where does the "promoted" label go? → **above card / inside card / none**
10. **"Available":** means now, today, or this week? → **now / today / week**
11. **Call to action:** how does a user know the card can be opened? Today the only hint is the small grey chevron, and it is too faint: 2.82:1, when the minimum for an interface hint is 3:1. The design system does allow a Book button here (its pattern "Card navigates, one action escapes" shows exactly that), but on the home screen it would put booking before trust, which the brief and the interviews argue against. That makes it a product decision, not a visual one. → **darker chevron (`--text-muted`, 4.32:1) / add a "View profile" label / both / keep as is**
