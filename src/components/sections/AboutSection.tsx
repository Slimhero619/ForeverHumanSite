import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import aboutPortrait from '../../assets/images/about-portrait.png'
import galleryCity from '../../assets/images/gallery-city.png'
import galleryStudio from '../../assets/images/gallery-studio.png'
import galleryWorkspace from '../../assets/images/gallery-workspace.png'

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
              <p className="text-secondary leading-relaxed mb-4">
                I'm a husband, father, Air Force veteran, software engineer, and creator.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                Forever Human was built from the belief that we're all a work in progress.
                Through raw conversations and real stories, this show is about becoming the
                best version of yourself — and helping others do the same.
              </p>
              <p className="text-secondary leading-relaxed mb-6">
                We're here to grow, to lead, and to leave something meaningful behind.
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
                  src={galleryCity}
                  alt="City skyline"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={galleryStudio}
                  alt="Podcast studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={galleryWorkspace}
                  alt="Workspace"
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
