import { Play, Music } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedSection from '../ui/AnimatedSection'
import heroBackground from '../../assets/images/hero-background.png'

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <AnimatedSection>
          {/* FH Monogram */}
          <div className="w-14 h-14 border border-accent/50 rounded-sm flex items-center justify-center mb-6">
            <span className="font-display text-2xl text-accent leading-none">FH</span>
          </div>

          {/* Title */}
          <h1
            id="hero-title"
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide text-primary leading-none mb-4"
          >
            FOREVER
            <br />
            HUMAN
          </h1>

          {/* Gold accent line */}
          <div className="w-16 h-0.5 bg-accent mb-6" />

          {/* Subtitle */}
          <p className="text-base md:text-lg text-secondary max-w-lg leading-relaxed mb-10">
            Conversations about discipline, identity, growth, and becoming the person
            you're capable of becoming.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button href="#latest-episode" variant="primary" icon={<Play size={16} />}>
              Watch Latest Episode
            </Button>
            <Button href="#" variant="secondary" icon={<Music size={16} />}>
              Listen on Spotify
            </Button>
            <Button href="#about" variant="secondary">
              About the Show
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default HeroSection
