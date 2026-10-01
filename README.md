# Byteex Product Page

Responsive product landing page for Byteex, implemented from the supplied Figma design. Page content is managed in Sanity Studio, so editors can update copy, images, sliders, reviews, FAQs, and calls to action without changing the frontend code.

**Live demo:** [byteex-product-page-one.vercel.app](https://byteex-product-page-one.vercel.app/)

**Repository:** [ParkhomenkoAlex/byteex-product-page](https://github.com/ParkhomenkoAlex/byteex-product-page)

## Tech stack

- React 19 and TypeScript
- Vite
- Sanity Studio and `@sanity/client`
- CSS Modules for component-scoped styling
- Poppins via `@fontsource/poppins`
- ESLint, Prettier, and pnpm

## Features

- Responsive Figma-based product page for mobile, tablet, desktop, and large displays
- CMS-driven header, hero, benefits, logo strip, editorial content, FAQs, reviews, CTA sections, and footer details
- Interactive image sliders with keyboard-accessible controls and reduced-motion support
- Drag/swipe logo and review-preview strips
- FAQ accordion that keeps one item open at a time
- Review carousel with synchronized two-row avatar previews, dynamic CMS ratings, and responsive 1/2/3-card layouts
- Shared CTA button component and visible keyboard focus states

## Prerequisites

- Node.js 20 or newer
- pnpm 10 or newer
- A Sanity account is required to access and manage the Sanity Studio.

## Installation

Clone the repository and install the frontend dependencies:

```bash
git clone https://github.com/ParkhomenkoAlex/byteex-product-page.git
cd byteex-product-page
pnpm install
```

Install the Studio dependencies separately:

```bash
cd sanity
pnpm install
cd ..
```

Create `.env.local` in the repository root for the frontend:

```dotenv
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

These values identify the public Sanity project and dataset used by the product page. They can be found in `sanity/sanity.config.ts` or in the Sanity project settings. Do not add tokens to this frontend environment file.

## Local development

Run the React app from the repository root:

```bash
pnpm dev
```

Run Sanity Studio in a separate terminal:

```bash
pnpm --dir sanity dev
```

Vite prints the local page URL when it starts. Sanity Studio normally runs at `http://localhost:3333`.

## Quality checks and builds

From the repository root:

```bash
pnpm lint
pnpm build
pnpm format:check
```

To format the frontend files:

```bash
pnpm format
```

For Sanity Studio:

```bash
pnpm --dir sanity exec eslint .
pnpm --dir sanity build
```

## Sanity CMS

The Studio lives in [`sanity/`](./sanity). Its schema definitions are in [`sanity/schemaTypes/`](./sanity/schemaTypes).

The main document types are:

- Header
- Hero Section
- Top Benefits
- Talk About Section
- How to Order
- Reviews Section
- FAQ Section
- Info Banner
- Final CTA

These documents control all page copy and visual assets, including image slider ordering, review avatars and ratings, FAQ entries, CTA labels/links, payment logos, shipping information, and the service-information row.

## Deployment

The production frontend is deployed on Vercel at [byteex-product-page-one.vercel.app](https://byteex-product-page-one.vercel.app/). Sanity Studio can be deployed with the `pnpm --dir sanity deploy` command after authenticating with the appropriate Sanity account.

## Project structure

```text
src/
  components/       Page sections and their local sliders/styles
  lib/sanity.ts     Sanity client configuration
  App.tsx           Section composition and page order
sanity/
  schemaTypes/      CMS document schemas
  sanity.config.ts  Studio configuration
public/             Static public assets
```

Each page section keeps its React component, CSS Module, GROQ query, and TypeScript content type together. This keeps CMS data requirements close to the UI that consumes them while avoiding a premature shared query layer.

## Notes for reviewers

- Frontend source: [`src/`](./src)
- Sanity Studio: [`sanity/`](./sanity)
- Start the app with `pnpm dev` and the Studio with `pnpm --dir sanity dev`
- Production version: [byteex-product-page-one.vercel.app](https://byteex-product-page-one.vercel.app/)
