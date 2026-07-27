import { Check, Star, Rocket, Wrench, ShieldAlert } from 'lucide-react'
import AnimatedSection from '../../ui/AnimatedSection'
import Button from '../../ui/Button'

interface ServiceOffer {
  title: string
  description: string
  icon: React.ReactNode
  highlighted?: boolean
  features: string[]
  ctaLabel: string
  ctaVariant: 'primary' | 'secondary'
  ctaHref: string
}

const services: ServiceOffer[] = [
  {
    title: 'Creator Launch',
    description: 'Build the foundation.',
    icon: <Rocket className="w-5 h-5 text-accent" />,
    features: [
      'Creator kickoff session',
      'Discord/community setup',
      'Essential bots & commands',
      'Creator roadmap',
      'Initial technical support',
    ],
    ctaLabel: 'Learn More',
    ctaVariant: 'secondary',
    ctaHref: '/creators/apply?service=launch',
  },
  {
    title: 'Creator Build',
    description: 'Build the creator and the system together.',
    icon: <Wrench className="w-5 h-5 text-accent" />,
    highlighted: true,
    features: [
      'Everything in Creator Launch',
      'Custom bot & automation support',
      'Community architecture',
      'Creator strategy sessions',
      'Extended technical support',
    ],
    ctaLabel: 'Apply',
    ctaVariant: 'primary',
    ctaHref: '/creators/apply?service=build',
  },
  {
    title: 'Creator Partner',
    description: 'Ongoing support as your platform grows.',
    icon: <ShieldAlert className="w-5 h-5 text-sky-400" />,
    features: [
      'Ongoing creator strategy',
      'Accountability',
      'Technical improvements',
      'Automation & systems',
      'Community growth support',
    ],
    ctaLabel: 'Apply',
    ctaVariant: 'secondary',
    ctaHref: '/creators/apply?service=partner',
  },
]

function CreatorServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-bg border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3 block">
              SUPPORT TIERS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-primary mb-4">
              How We Help
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-secondary text-base md:text-lg leading-relaxed">
              Different creators need different levels of support. Start where you are.
            </p>
          </div>
        </AnimatedSection>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, idx) => (
            <AnimatedSection key={service.title} delay={idx * 0.1}>
              <div
                className={`relative h-full rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  service.highlighted
                    ? 'bg-card border-2 border-accent/70 shadow-2xl shadow-accent/5 ring-1 ring-accent/30 scale-102 lg:-translate-y-2'
                    : 'bg-card border border-border hover:border-accent/30'
                }`}
              >
                {/* Highlighted Badge */}
                {service.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent text-bg text-[11px] font-semibold uppercase tracking-wider shadow-md">
                    <Star size={12} className="fill-bg" />
                    <span>POPULAR OFFERING</span>
                  </div>
                )}

                <div>
                  {/* Title & Description */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-3xl tracking-wide uppercase text-primary">
                      {service.title}
                    </h3>
                    <div className="p-2.5 rounded-lg bg-bg border border-border">
                      {service.icon}
                    </div>
                  </div>

                  <p className="text-accent text-sm font-medium mb-6">
                    {service.description}
                  </p>

                  <div className="w-full h-px bg-border/80 mb-6" />

                  {/* Bullet Features */}
                  <div className="mb-8">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary/70 block mb-4">
                      WHAT'S INCLUDED:
                    </span>
                    <ul className="space-y-3.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-secondary text-sm">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-accent/10 text-accent border border-accent/30 flex items-center justify-center mt-0.5">
                            <Check size={10} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-border/60">
                  <Button
                    href={service.ctaHref}
                    variant={service.ctaVariant}
                    className="w-full justify-center"
                  >
                    {service.ctaLabel}
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CreatorServicesSection
