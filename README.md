# Project: Digital Upstream

## 1. Goal

Build a professional portfolio and services website for Digital Upstream, focused on clarity, performance, accessibility, SEO, and responsiveness.

## 2. Tech Stack

- Framework: `Next.js` (App Router)
- Language: `TypeScript`
- Styling: `Tailwind CSS` (v4)
- UI: Use `shadcn/ui` components when they add value

## 3. Architecture & Styling

- Tailwind-first: Styling via utility classes in JSX; theme via CSS variables in `app/globals.css`.
- Fonts: **Fraunces** for headings, **Plus Jakarta Sans** for body text, **Instrument Serif** for blockquotes/buttons — all loaded via `next/font/google` with `display: swap`.
- Layout: Shared layout renders `Header`, page content, and `Footer`. Skip-to-content link included for accessibility.
- Assets: The logo lives in `public/digital-upstream-logo.png` and is used by a reusable `Logo` component.

## 4. Project Structure

- `app/layout.tsx`: Root layout, global fonts, metadata, header/footer, JSON-LD, accessibility.
- `app/page.tsx`: Blog listing page (hero featured post + latest grid + more stories).
- `app/blog/[slug]/page.tsx`: Individual blog article with reading progress, author, SEO metadata.
- `app/globals.css`: Tailwind v4 imports, CSS variables (light/dark OKLCH), prose typography, component styles.
- `app/work/`: Portfolio project pages.
- `lib/blog.ts`: BlogPost and BlogPostSummary types.
- `lib/db.ts`: Neon PostgreSQL database connection via `@neondatabase/serverless`.
- `components/Container.tsx`: Consistent responsive page width and padding.
- `components/Header.tsx`: Accessible header with logo and primary nav.
- `components/Footer.tsx`: Footer with copyright and links.
- `components/Logo.tsx`: Logo renderer using the SVG in `public/`.
- `components/ReadingProgress.tsx`: Client component for article reading progress bar.
- `lib/utils.ts`: `cn` helper for class merging.

## 5. Blog Content Format

All blog posts must be stored in the `blog` table with this exact frontmatter format (for cross-platform compatibility):

```
title: "[Article Title]"
slug: [url-friendly-slug]
meta_description: "[SEO meta description — max 155 chars]"
target_keywords: "[comma, separated, keywords]"
published_at: [YYYY-MM-DD]

[article body in markdown]
```

- **title**: Full article title, used in `<h1>` and page metadata.
- **slug**: URL-safe lowercase slug (e.g. `cursor-vs-copilot-vs-trae-in-2026`).
- **meta_description**: Max 155 characters, used for SEO and article subtitle.
- **target_keywords**: Comma-separated list for SEO targeting.
- **published_at**: Date in `YYYY-MM-DD` format (e.g. `2026-04-10`).
- **body**: Markdown content — headings use `##` and `###`, tables must be properly formatted.

## 6. Design System

- **Colors**: OKLCH-based light/dark theme with CSS custom properties in `globals.css`.
- **Typography scale**: Display (Fraunces, 48-72px) → Titles (Fraunces, 20-40px) → Meta (Plus Jakarta Sans, 12-14px).
- **Prose styles**: `prose-custom` class in globals.css handles article body rendering with proper font assignments for h2/h3/blockquote.
- **Components**: `symbiote-card` hover effect, `heading-stack` for title+subtitle layouts, `link-underline-rtl/hide-ltr` for animated underlines.

## 7. Principles & Best Practices

- DRY: Prefer reusable components and utilities.
- Type Safety: Strict TypeScript settings enabled.
- Performance: Font loading uses `swap`; images via `next/image`; minimal client-side JS.
- Accessibility: Semantic HTML, accessible nav, skip link, alt text, clear focus states.
- SEO: Meaningful titles/descriptions, Open Graph/Twitter metadata, JSON-LD structured data, theme color.
- Responsive: Mobile-first with Tailwind responsive modifiers.

## 8. Database

- Neon PostgreSQL via `@neondatabase/serverless`.
- Connection string in `DATABASE_URL` environment variable.
- Blog posts fetched server-side via `sql` tagged template from `lib/db.ts`.