# Data Model & API

## Core types
- `Locale`: `en | vi`
- `LocalizedText`: `{ en: string; vi: string }`
- `Category`
- `Product`
- `SiteContent`

## Localization rule
- All visible content is modeled as localized text (EN/VI).
- Product titles/descriptions/details are bilingual.
- Storefront labels are bilingual via dictionaries.

## API contract
- `GET /api/products` -> `{ items, total }`
- `GET /api/products/:id` -> product by `id` or `slug`
- `GET /api/categories` -> `{ items, total }`
- `GET /api/content` -> localized homepage content blocks
- `GET,POST /api/cart` -> mock cart lines
- `GET,POST /api/wishlist` -> mock wishlist product IDs
- `GET /api/orders` -> mock orders
- `PATCH /api/orders/:id/status` -> update status
