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

### 🌟 Page Sections
- **Hero**: Immersive presentation featuring the host's background portrait, branding, and quick-action links to major podcast platforms.
- **Latest Episode**: Large feature area showing the newest episode with show notes, play buttons, and tags.
- **Episodes Grid**: Interactive filtering grid listing older episodes by topic or tag (e.g., *Mindset*, *Science*, *Human Nature*).
- **Topics**: Visual tag grid highlighting the primary themes discussed on the podcast.
- **Quote**: A full-width testimonial/quote block with parallax/scroll motion.
- **About**: Profile and background narrative about the host.
- **Gallery**: Dynamic carousel/grid showcasing workspace, studio, and outdoor personal brand photos.
- **Books & Thoughts (Side-by-Side)**:
  - **Books**: Custom horizontal slider highlighting books that changed the host's perspective.
  - **Latest Thoughts**: Clean card list of recent blog posts or newsletter entries.
- **Newsletter Sign-up**: A premium opt-in form with success state animations.
- **Footer**: Unified navigation links, social icons, and copyright.

---

## 🛠️ Technology Stack

- **Framework**: React 18+ (Functional Components with Hooks)
- **Tooling**: Vite (for lightning-fast HMR and bundling)
- **Language**: TypeScript (Strict typing for components and data interfaces)
- **Styling**: Tailwind CSS v4 (Sleek utilities and optimized runtime)
- **Animations**: Framer Motion (Smooth scroll/fade entry-effects and transitions)
- **Icons**: Lucide React (Clean vector iconography)
- **Routing**: React Router (Route infrastructure ready for expansion)
