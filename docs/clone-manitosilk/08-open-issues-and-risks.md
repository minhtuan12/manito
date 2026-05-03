# Open Issues & Risks

- Full pixel parity with WordPress/WooCommerce interactions is not complete yet.
- Checkout/payment gateway flow remains a shell; no real payment integration.
- Cart/wishlist/order persistence is in-memory only.
- Locale switch currently flips between `/en` and `/vi`; per-path preservation can be improved in client navigation logic.
- External image/font dependencies rely on remote source availability.
