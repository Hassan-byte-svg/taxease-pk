# Design notes

Change the product name in `lib/brand.ts`. Change colors in both `tailwind.config.ts` and `app/globals.css`. The CSS variables are what the site actually uses.

## Color

| Token | Light | Dark |
| --- | --- | --- |
| Background | `#F8FAFC` | `#0B1220` |
| Text | `#0F172A` | `#E2E8F0` |
| Muted text | `#475569` | `#94A3B8` |
| Card | `#FFFFFF` | `#111827` |
| Border | `#E2E8F0` | `#334155` |
| Primary | `#0F766E` | `#14B8A6` |
| Primary hover | `#115E59` | `#0F766E` |
| Accent | `#F59E0B` | `#F59E0B` |
| Success | `#16A34A` | `#4ADE80` |
| Warning | `#F59E0B` | `#F59E0B` |
| Error | `#DC2626` | `#F87171` |

The footer stays `#0B1220` in both themes so the bottom of the page reads as one dark band. Success, warning, and error are fills for chips and status. Body text stays slate so small labels keep contrast.

## Type

English uses Inter. Urdu uses Noto Nastaliq Urdu, with a taller line height so the script does not collide. Headings are semibold. Body copy is 16–18px.

## Space

Layout steps are multiples of 8px. Cards are `rounded-2xl`. Buttons are `rounded-xl`. The page column is 1200px (`max-w-[75rem]`). Section padding on the home page will be 96px on desktop when those sections are built.

## Motion

The mobile menu slides in from the side. Scroll-linked motion is off when the system asks for reduced motion.
