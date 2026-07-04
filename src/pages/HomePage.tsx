import HeroSection from '../components/sections/HeroSection'
import LatestEpisodeSection from '../components/sections/LatestEpisodeSection'
import EpisodeGridSection from '../components/sections/EpisodeGridSection'
import TopicsSection from '../components/sections/TopicsSection'
import QuoteSection from '../components/sections/QuoteSection'
import AboutSection from '../components/sections/AboutSection'
import GallerySection from '../components/sections/GallerySection'
import BooksSection from '../components/sections/BooksSection'
import ThoughtsSection from '../components/sections/ThoughtsSection'
import { useYouTubeEpisodes } from '../hooks/useYouTubeEpisodes'

// ─── Home Page ─────────────────────────────────────────────────────────────────
// YouTube integration:
//   The useYouTubeEpisodes() hook fetches live data from /api/youtube (proxied
//   through the Vite middleware in vite.config.ts). It returns:
//     - featuredEpisode: the newest video → passed to LatestEpisodeSection
//     - episodes: the next 6 newest videos → passed to EpisodeGridSection
//
//   On failure, the hook silently falls back to static data from
//   src/data/episodes.ts. The sections also have their own internal fallbacks
//   if no props are provided.
// ────────────────────────────────────────────────────────────────────────────────

function HomePage() {
  const { featuredEpisode, episodes } = useYouTubeEpisodes()

  return (
    <>
      <HeroSection />
      <LatestEpisodeSection episode={featuredEpisode} />
      <EpisodeGridSection episodes={episodes} />
      <TopicsSection />
      <QuoteSection />
      <AboutSection />
      <GallerySection />

      {/* Books + Thoughts side by side on desktop */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <BooksSection />
            <ThoughtsSection />
          </div>
        </div>
      </section>

      {/* <NewsletterSection /> */}
    </>
  )
}

export default HomePage
