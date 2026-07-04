import { episodes as staticEpisodes } from '../../data/episodes'
import type { Episode } from '../../types/content'
import EpisodeCard from '../ui/EpisodeCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

// ─── Episode Grid Section ──────────────────────────────────────────────────────
// Displays the "Latest Episodes" grid (typically 6 cards).
//
// YouTube integration:
//   The `episodes` prop is provided by HomePage via the useYouTubeEpisodes hook.
//   These are the 2nd–7th newest videos from the channel (index 1–6 of the API
//   response; index 0 is used by LatestEpisodeSection as the featured episode).
//
//   When YouTube data is unavailable, this falls back to the static data
//   from src/data/episodes.ts.
// ────────────────────────────────────────────────────────────────────────────────

interface EpisodeGridSectionProps {
  /** Episodes to display in the grid. Falls back to static data if not provided. */
  episodes?: Episode[]
}

function EpisodeGridSection({ episodes }: EpisodeGridSectionProps) {
  // Use the provided YouTube episodes, or fall back to static placeholder data
  const displayEpisodes = episodes ?? staticEpisodes

  return (
    <section id="episodes" className="py-16 md:py-24" aria-labelledby="episodes-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Latest Episodes"
            actionLabel="View All Episodes"
            actionHref="https://www.youtube.com/@foreverhumanpodcast"
            actionExternal
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default EpisodeGridSection
