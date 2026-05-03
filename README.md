# MANITO

Bilingual storefront + admin scaffold inspired by `https://manitosilk.com/`.

## Stack
- Next.js App Router (TypeScript)
- Material UI
- Lucide Icons
- Localized content in English (`en`) and Vietnamese (`vi`)
- Next.js API routes (`app/api/*`)

## Routes
- Storefront:
  - `/en`, `/vi`
  - `/[locale]/category/[...slug]`
  - `/[locale]/products/[slug]`
  - `/[locale]/cart`
  - `/[locale]/wishlist`
  - `/[locale]/my-account`
  - `/[locale]/search`
- Admin:
  - `/[locale]/admin`
  - `/[locale]/admin/products`
  - `/[locale]/admin/categories`
  - `/[locale]/admin/orders`
  - `/[locale]/admin/customers`
  - `/[locale]/admin/content`
  - `/[locale]/admin/media`
  - `/[locale]/admin/settings`

## API
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/categories`
- `GET /api/content`
- `GET,POST /api/cart`
- `GET,POST /api/wishlist`
- `GET /api/orders`
- `PATCH /api/orders/:id/status`

## Run
```bash
npm install
npm run dev
```

## Project memory docs
See `docs/clone-manitosilk/` and `docs/superpowers/plans/`.
