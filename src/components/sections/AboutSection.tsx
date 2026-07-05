import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import aboutPortrait from '../../assets/images/about-portrait2.png'
import codingNighttime from '../../assets/images/coding-nighttime.png'
import brazilBackdrop from '../../assets/images/brazil-backdrop.png'
import readingRooftop from '../../assets/images/reading-rooftop.png'

function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="About Drake" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Text Content */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col justify-center">
              <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-5">
                Father. Veteran. Builder. Student of life.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                I'm Drake — a father, Air Force veteran, software engineer, and creator behind Forever Human.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                After 12 years in the military, years in tech, and a lot of life lived between discipline,
                failure, growth, fatherhood, and starting over, I realized something simple:
              </p>
              <p className="text-primary font-medium leading-relaxed mb-1 italic">
                Most of us are not broken.
              </p>
              <p className="text-primary font-medium leading-relaxed mb-4 italic">
                We're becoming.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                Forever Human was built for that process. This show is about the conversations
                we usually have in private — discipline, identity, purpose, relationships, growth,
                pressure, rebuilding, and what it really takes to become the person you keep
                saying you want to be.
              </p>
              <p className="text-primary font-medium leading-relaxed mb-1 italic">
                Not from a place of perfection.
              </p>
              <p className="text-primary font-medium leading-relaxed mb-4 italic">
                From a place of progress.
              </p>
              <p className="text-secondary leading-relaxed mb-6">
                Because being human means learning, falling short, adjusting, and still choosing to move forward.
              </p>
              <div>
                <Button href="#" variant="primary" className="text-sm">
                  More About The Show
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Image Grid */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={aboutPortrait}
                  alt="Drake — host of Forever Human"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={codingNighttime}
                  alt="Drake coding at night"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={brazilBackdrop}
                  alt="Drake in Brazil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={readingRooftop}
                  alt="Drake reading on a rooftop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
