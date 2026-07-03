import { Play, Music } from 'lucide-react'
import Button from '../ui/Button'
import AnimatedSection from '../ui/AnimatedSection'
import heroBackground from '../../assets/images/hero-background.png'
import foreverHumanLogo from '../../assets/images/main-logo-img.png'

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
          {/* Hidden h1 for SEO/accessibility */}
          <h1 id="hero-title" className="sr-only">Forever Human Podcast</h1>

          {/* Logo — sole hero title, large and left-aligned */}
          <img
            src={foreverHumanLogo}
            alt="Forever Human"
            style={{
              width: 'clamp(700px, 80vw, 1400px)',
              minWidth: '700px',
              maxWidth: 'none',
              height: 'auto',
              filter: 'invert(72%) sepia(45%) saturate(520%) hue-rotate(4deg) brightness(100%)',
              marginBottom: '1.5rem',
            }}
          />

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
