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
- Fonts: Global sans font is `Plus Jakarta Sans` via `next/font/google` with `display: swap`.
- Layout: Shared layout renders `Header`, page content, and `Footer`. Skip-to-content link included for accessibility.
- Assets: The logo lives in `public/digital-upstream-logo.png` and is used by a reusable `Logo` component.

## 4. Project Structure

- `app/layout.tsx`: Root layout, global fonts, metadata, header/footer, accessibility.
- `app/page.tsx`: Clean, responsive landing page (hero + placeholder sections).
- `app/globals.css`: Tailwind imports and CSS variables (light/dark theme, font mapping).
- `components/Container.tsx`: Consistent responsive page width and padding.
- `components/Header.tsx`: Accessible header with logo and primary nav.
- `components/Footer.tsx`: Simple footer with copyright.
- `components/Logo.tsx`: Logo renderer using the SVG in `public/`.
- `lib/utils.ts`: `cn` helper for class merging.

## 5. Principles & Best Practices

- DRY: Prefer reusable components (`Container`, `Header`, `Footer`, `Logo`) and utilities.
- Separation of Concerns: Presentation components are lean; logic lives in hooks/utilities when needed.
- Type Safety: Strict TypeScript settings enabled.
- Performance: Font loading uses `swap`; images via `next/image`; minimal client-side JS.
- Accessibility: Semantic HTML, accessible nav, skip link, alt text, clear focus states.
- SEO: Meaningful titles/descriptions, Open Graph/Twitter metadata, theme color.
- Responsive: Mobile-first with Tailwind responsive modifiers; content scales from small to large screens.

## 6. Next Steps

- Add real project data and pages (Projects, Contact).
- Introduce shadcn/ui components where they simplify UI (buttons, cards, dialogs).
- Implement a contact form with proper validation and spam protection.
- Set up content (CMS or static data) for portfolio entries.