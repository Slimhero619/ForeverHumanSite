import { MonitorPlay, Music, Headphones } from 'lucide-react'
import { featuredEpisode } from '../../data/episodes'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

function LatestEpisodeSection() {
  return (
    <section id="latest-episode" className="py-16 md:py-24" aria-labelledby="latest-episode-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Latest Episode" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="bg-card border border-border rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Thumbnail */}
            <div className="relative aspect-video lg:aspect-auto overflow-hidden">
              <img
                src={featuredEpisode.thumbnail}
                alt={featuredEpisode.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />

              {/* Episode badge */}
              <span className="absolute top-4 left-4 bg-accent text-bg text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                {featuredEpisode.number}
              </span>

              {/* Title overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  id="latest-episode-title"
                  className="font-display text-3xl md:text-4xl tracking-wide text-primary leading-tight"
                >
                  {featuredEpisode.title}
                </h3>
                <span className="inline-block mt-2 text-sm text-secondary/80 bg-bg/50 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                  {featuredEpisode.duration}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-secondary leading-relaxed mb-8 text-sm md:text-base">
                {featuredEpisode.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  href={featuredEpisode.youtubeUrl}
                  variant="secondary"
                  icon={<MonitorPlay size={16} />}
                  className="text-xs"
                >
                  Watch on YouTube
                </Button>
                <Button
                  href={featuredEpisode.spotifyUrl}
                  variant="secondary"
                  icon={<Music size={16} />}
                  className="text-xs"
                >
                  Listen on Spotify
                </Button>
                <Button
                  href={featuredEpisode.applePodcastsUrl}
                  variant="secondary"
                  icon={<Headphones size={16} />}
                  className="text-xs"
                >
                  Apple Podcasts
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default LatestEpisodeSection
