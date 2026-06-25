import { episodes } from '../../data/episodes'
import EpisodeCard from '../ui/EpisodeCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

function EpisodeGridSection() {
  return (
    <section id="episodes" className="py-16 md:py-24" aria-labelledby="episodes-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Latest Episodes"
            actionLabel="View All Episodes"
            actionHref="#"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default EpisodeGridSection
