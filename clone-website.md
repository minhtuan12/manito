---
name: website-cloner
description: >
  Clone any website by scanning and analyzing a live URL, then rebuilding it faithfully in a
  chosen tech stack. Use this skill whenever the user wants to replicate, recreate, clone, copy,
  or port an existing website to a different framework or technology. Triggers include: "clone this
  site", "recreate this website", "port to React/Vue/Next.js", "rebuild this page in Tailwind",
  "copy the design of this URL", "scrape and rebuild", or any request that combines a URL with a
  desired tech stack. Also trigger when the user wants to produce a pixel-perfect or
  "inspired-by" reproduction of an existing web page, even without mentioning "clone" explicitly.
---

# Website Cloner Skill

Scan a live URL, analyze its structure and design, then reproduce it faithfully in whatever
tech stack the user specifies.

---

## Workflow Overview

```
1. Clarify → 2. Fetch & Analyze → 3. Plan → 4. Build → 5. Refine
```

---

## Step 1 — Clarify Before Fetching

Before doing anything, confirm these four inputs. If they are already stated in the user's
message, skip asking and proceed directly.

| Input | What to capture |
|---|---|
| **Target URL** | The page(s) to clone |
| **Tech stack** | Framework + styling (see supported stacks below) |
| **Fidelity level** | Pixel-perfect vs. design-inspired vs. structural only |
| **Scope** | Single page, multi-page, full site with routing? |

If any are missing, ask for all of them in one message — never ask one at a time.

---

## Step 2 — Fetch & Analyze the Target

### 2a. Retrieve the page

Use `web_fetch` to retrieve the HTML of the target URL.

```
web_fetch(url, html_extraction_method="markdown")
```

If the URL is JavaScript-heavy (SPA), note that `web_fetch` returns the initial HTML; acknowledge
any dynamic content that may be missing.

### 2b. Collect visual reference

Use `image_search` or instruct the user to paste a screenshot if the page is auth-gated.

### 2c. Extract and document these properties

Go through the fetched content and systematically extract:

**Layout & Structure**
- Overall layout pattern (grid, flexbox, sidebar, hero, cards, etc.)
- Number of distinct sections / components
- Navigation structure (top nav, sidebar, hamburger, tabs)
- Footer structure

**Typography**
- Font families (check `<link>` tags for Google Fonts / Typekit)
- Font sizes and weights for headings, body, captions
- Line heights and letter spacing where notable

**Color Palette**
- Primary, secondary, accent, background, text colors
- Gradients and their direction/stops
- Border and shadow colors

**Spacing & Sizing**
- Dominant spacing unit (8px grid? 4px? rem-based?)
- Max-width containers
- Padding/margin patterns on sections

**Interactive Elements**
- Hover states (buttons, links, cards)
- Animations and transitions
- Modals, dropdowns, accordions

**Assets**
- Images: placeholder or reconstruct with similar dimensions + alt text
- Icons: identify icon library (Heroicons, Lucide, FontAwesome, etc.) or recreate as SVG
- Illustrations: describe and recreate or use a placeholder

**Responsive Breakpoints**
- Identify mobile/tablet/desktop behavior from meta viewport and media queries in `<style>` tags

---

## Step 3 — Plan the Component Architecture

Before writing any code, produce a brief plan:

```
Components identified:
  - <Navbar> — sticky, logo left, links right, mobile hamburger
  - <HeroSection> — full-width bg image, headline, CTA button
  - <FeatureGrid> — 3-col on desktop, 1-col on mobile, icon + title + description
  - <TestimonialCarousel> — auto-rotating, dots indicator
  - <Footer> — 4-column links + social icons + copyright

Data / content:
  - Hardcode real copy from the fetched page where possible
  - Use placeholder images with correct aspect ratios

Routing (if multi-page):
  - List routes and corresponding components
```

Show this plan to the user and get a quick confirmation or correction before building.

---

## Step 4 — Build by Tech Stack

Read the relevant section below for your target stack.

---

### Stack: React + Tailwind (`.jsx` artifact)

- Use functional components with hooks.
- Style exclusively with Tailwind utility classes.
- For colors not in the default palette, use inline `style` or `[#hex]` arbitrary values.
- Import icons from `lucide-react` where applicable.
- Compose a single root `App` component that renders all sections.
- Use `useState` for interactive elements (mobile menu open/close, carousel index, etc.).
- Keep everything in one `.jsx` file unless the user asks for a multi-file project.

```jsx
// Example shell
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function App() {
  return (
    <div className="font-sans bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
```

---

### Stack: Next.js (file output)

- Use App Router conventions (`app/page.tsx`, `app/layout.tsx`).
- Mark interactive components with `"use client"`.
- Use `next/image` for optimized images.
- Use `next/font` if Google Fonts are detected.
- Create a `tailwind.config.ts` that extends the palette with extracted brand colors.
- Output files to `/mnt/user-data/outputs/<project-name>/`.

File structure to produce:
```
<project-name>/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   └── ...
├── tailwind.config.ts
└── package.json
```

---

### Stack: Vue 3 + Tailwind (`.vue` / file output)

- Use `<script setup>` Composition API.
- Use `ref` and `computed` for reactive state.
- Compose a root `App.vue` that imports section components.
- Use Tailwind for all styling.

---

### Stack: Plain HTML + CSS (`.html` artifact)

- Single-file output with `<style>` block.
- Use CSS custom properties for the color palette:
  ```css
  :root {
    --color-primary: #1a56db;
    --color-text: #111827;
    --font-heading: 'Inter', sans-serif;
  }
  ```
- Use CSS Grid and Flexbox — no external CSS framework.
- Link Google Fonts via `<link>` in `<head>`.
- Inline SVG icons where needed.

---

### Stack: Svelte (`.svelte` / file output)

- Use `<script>` with Svelte stores for shared state.
- Use scoped `<style>` blocks or Tailwind.
- Single `App.svelte` root composing sub-components.

---

### Stack: Angular (file output)

- Use standalone components (`standalone: true`).
- Use Angular Signals for reactive state.
- Use Angular Material or Tailwind depending on the original site's UI library.
- Output a proper Angular project scaffold.

---

## Step 5 — Fidelity Checklist

Before presenting output, verify:

- [ ] Color palette matches (primary, accent, backgrounds, text)
- [ ] Font families and weights are correct
- [ ] Spacing and layout proportions feel right
- [ ] All sections from the original are present
- [ ] Navigation is functional (links, mobile toggle)
- [ ] Responsive behavior: stacks correctly on narrow viewport
- [ ] Interactive states exist (hover, focus, active)
- [ ] Real copy from the original is used (not Lorem Ipsum) where fetchable
- [ ] Images have correct aspect ratios (even if placeholder)
- [ ] Animations/transitions are approximated

---

## Handling Common Challenges

### JavaScript-heavy SPAs
`web_fetch` returns initial HTML only. Inform the user that dynamically loaded content
(lazy-loaded sections, API-driven data) will need to be stubbed with placeholder data.
Ask the user to paste a screenshot or describe the missing sections.

### Auth-gated pages
If the URL returns a login wall, ask the user to paste the HTML source directly
(DevTools → right-click → "View Page Source" → copy).

### Complex animations (GSAP, Framer Motion)
Recreate simpler CSS equivalents. Call out specifically which animations were approximated
and offer to implement closer versions if desired.

### Custom icon sets
If icons are from a proprietary set not available via CDN, recreate them as inline SVGs
or substitute the closest Lucide / Heroicons equivalent.

### Multi-page sites
For sites with more than one page, ask if the user wants all pages or just the landing page.
If multiple pages: generate a component/page per route and add a client-side router
(React Router, Next.js routing, Vue Router, etc.).

---

## Output Conventions

- **Single-page → artifact**: Output as a `.jsx` or `.html` artifact rendered inline.
- **Multi-file project → filesystem**: Write to `/mnt/user-data/outputs/<project-name>/`
  and call `present_files` on the directory.
- Always include a brief summary of what was cloned and what was approximated or skipped.
- Offer a follow-up prompt suggestion, e.g.:
  > "Want me to add real routing, connect a CMS, or make this responsive for a specific breakpoint?"

---

## Quick Reference — Stack Selection Guide

| User says… | Recommended stack |
|---|---|
| "React", "JSX", no routing needed | React + Tailwind `.jsx` artifact |
| "Next.js", "SSR", "SEO", multi-page | Next.js App Router + Tailwind |
| "Vue", "Nuxt" | Vue 3 + Tailwind |
| "plain HTML", "no framework", "vanilla" | HTML + CSS single file |
| "Svelte", "SvelteKit" | Svelte / SvelteKit |
| "Angular" | Angular standalone components |
| No preference stated | Ask — default to React + Tailwind for SPAs, Next.js for multi-page |
