# TaxEase PK

Filing and tax analytics for Pakistani individuals and small businesses. The product name lives in `lib/brand.ts`.

This pass is the layout shell: design tokens, sticky navigation, footer, English and Urdu (right-to-left), and dark mode. Marketing, the calculator, accounts, and the dashboard come in later passes.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). English is `/en` and Urdu is `/ur`.

```bash
npm run lint
npm run format
```

## Folder map

| Path | Role |
| --- | --- |
| `app/[locale]` | Pages. `en` and `ur` share one tree. |
| `components/layout` | Header, footer, and page shell. |
| `components/ui` | Shared controls such as buttons. |
| `components/providers` | Theme provider. |
| `i18n` | Locale routing and request config. |
| `messages` | `en.json` and `ur.json`. |
| `lib/brand.ts` | Product name and support contacts. |
| `tailwind.config.ts` | Color tokens. Runtime values are CSS variables in `app/globals.css`. |

## Plugging in a real API

Route handlers will live under `app/api`. Shared clients will live under `lib`. Swap the mock handlers for Supabase or a Node service without changing page components, as long as the function signatures stay the same. No API is wired in this pass.
