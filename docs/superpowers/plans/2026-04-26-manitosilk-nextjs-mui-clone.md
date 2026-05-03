# MANITO Clone (Next.js + MUI + Lucide + Next API) Implementation Plan

> For agentic workers: execute tasks in order, preserving bilingual EN/VI coverage for all user-facing and admin-facing content.

## Goal
Build a bilingual MANITO-inspired storefront and admin in a single Next.js App Router project, with API routes in-app.

## Architecture
- Route-based locale design: `/en` and `/vi`.
- Shared localized domain content model for products/categories/site content.
- MUI component system + Lucide icons.
- Next API routes for catalog/content/cart/wishlist/orders.

## Tasks
1. Scaffold Next.js + TS + MUI + Lucide base.
2. Build localized content model and dictionaries.
3. Implement storefront routes with bilingual content.
4. Implement admin routes with bilingual operational UI.
5. Implement colocated API routes.
6. Save source analysis and decisions into markdown memory docs.
7. Validate route coverage, localization coverage, and API response shapes.
