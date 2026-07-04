# Forever Human — Podcast & Personal Brand Website

A premium, single-page web experience for the **Forever Human** podcast and personal brand. Built to match a high-fidelity visual design mockup with a cinematic dark theme, bold typography, smooth animations, and curated sections.

---

## 🚀 Live Development

To preview the project locally, run:
```bash
# Install dependencies
npm install

# Start the local development server
npm run dev

# Build the production application
npm run build
```

### 🔑 Environment Variables
The application queries Notion via a serverless API endpoint. Set up the following in a `.env.local` file at the root:
```env
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
```
*(Note: These are kept strictly server-side and never exposed to the frontend browser bundle).*

---

## 🎨 Design & Aesthetic

- **Theme**: Dark cinematic tone (`#0B0B0C` background, `#121214` cards).
- **Accents**: Premium gold (`#C9A15A`) for highlights, interactive states, and branding.
- **Typography**: 
  - **Display / Headings**: Oswald (all-caps, tracking-wide, bold display presence).
  - **Body / Interface**: Inter (highly readable modern sans-serif).
- **Motion**: Fluid scroll animations, hover micro-interactions, and section entries powered by **Framer Motion**.

---

## 🧩 Structure & Components

The application follows a modular, reusable, and responsive structure:

### 🌟 Page Sections & Views
- **Hero**: Full-screen cinematic landing featuring the Forever Human logo (`main-logo-img.png`) as the primary title element, gold-tinted via CSS filter to match the site accent color. Includes subtitle and CTA buttons for podcast platforms.
- **Latest Episode**: Large feature area showing the newest episode with show notes, play buttons, and tags.
- **Episodes Grid**: Interactive filtering grid listing older episodes by topic or tag (e.g., *Mindset*, *Science*, *Human Nature*).
- **Topics**: Visual tag grid highlighting the primary themes discussed on the podcast.
- **Quote**: A full-width testimonial/quote block with parallax/scroll motion.
- **About**: Detailed personal narrative about Drake — father, Air Force veteran, software engineer, and creator behind Forever Human.
- **Gallery**: Dynamic carousel/grid showcasing workspace, studio, and outdoor personal brand photos.
- **Books & Thoughts (Side-by-Side)**:
  - **Books**: Custom horizontal slider highlighting books that changed the host's perspective.
  - **Latest Thoughts**: Dynamic card list loading the **latest 3 published thoughts** directly from Notion.
- **All Thoughts Listing (`/thoughts`)**: Dedicated route showing all published thoughts queried from Notion. Features a return-to-home button, animations, categories, and loading/error feedback.
- **Newsletter Sign-up**: A premium opt-in form with success state animations (temporarily hidden).
- **Footer**: Unified navigation links, social icons (YouTube, Instagram, Email), and copyright.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Functional Components with Hooks)
- **Tooling**: Vite 8 (for lightning-fast HMR and bundling)
- **Language**: TypeScript (Strict typing for components and data interfaces)
- **Styling**: Tailwind CSS v4 (Sleek utilities and optimized runtime)
- **Animations**: Framer Motion (Smooth scroll/fade entry-effects and transitions)
- **Icons**: Lucide React (Clean vector iconography)
- **Routing**: React Router v7 (Route infrastructure for pages)
- **Integrations**: `@notionhq/client` (Official SDK for querying Notion database)

---

## 📋 Changelog

### 2026-07-04 — Newsletter & Navigation Update

#### UI/UX Clean-up
- Temporarily hid the `NewsletterSection` from the homepage to clean up page flow.
- Commented out the "Subscribe" CTA buttons in both the desktop navbar and mobile navigation menus.
- Re-routed the "Contact" navigation link from `#newsletter` to the mailto link (`mailto:slimzztv@outlook.com`) to prevent broken links.

### 2026-07-03 — Notion API Integration & Page Route

#### Backend & API
- Installed `@notionhq/client` v5 for Notion database connectivity.
- Created `/api/thoughts` serverless endpoint utilizing the new `notion.dataSources.query` API.
- Configured inline server middleware in `vite.config.ts` to mock and serve the `/api/thoughts` endpoint locally for the Vite dev server using `.env.local` bindings.
- Built a secure querying query that filters by `Status = Published` and sorts by `Date` descending.

#### Frontend Routing & Views
- Created the dedicated listing view: `ThoughtsPage` (`/thoughts`) showing all published thoughts.
- Integrated dynamic loading spinner (using CSS animation) and error handlers that display detailed API errors.
- Wired the `/thoughts` route into `App.tsx` routing logic.
- Redesigned `ThoughtCard` to display categories, UTC-formatted dates, excerpts, and gold featured badges.
- Updated `ThoughtsSection` on the homepage to pull dynamically from the API and list the top 3 items.

### 2026-07-03 — Branding & Content Refresh

#### Hero Section
- Replaced the plain-text `FOREVER HUMAN` heading with the transparent logo asset (`main-logo-img.png`).
- Logo is gold-tinted via CSS filter to match the site's accent color (`#C9A15A`).
- Scaled to fill the hero area responsively (`clamp(700px, 80vw, 1400px)`).

#### Navbar
- Hidden the FH monogram logo box; "FOREVER HUMAN" text remains as nav title.

#### Footer
- Hidden the FH monogram logo box to match Navbar.
- Replaced 7 placeholder social icons with 3 real linked icons: YouTube, Instagram, and Email.
- Removed the "Follow" heading from the social section.

#### About Section
- Rewrote the full bio with Drake's personal narrative including military background, purpose behind the show, and signature emphasis lines.
- Added "Father. Veteran. Builder. Student of life." tagline.

#### Navigation
- Removed "Start Here" from the nav items.
- Updated `socialLinks` with real URLs for YouTube, Instagram, and Email.
