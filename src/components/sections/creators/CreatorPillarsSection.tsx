import { UserCheck, Layers, Target, Check } from 'lucide-react'
import AnimatedSection from '../../ui/AnimatedSection'
import SectionHeading from '../../ui/SectionHeading'

interface PillarItem {
  icon: React.ReactNode
  title: string
  accentColor: 'gold' | 'sky' | 'gold'
  items: string[]
}

const pillars: PillarItem[] = [
  {
    icon: <UserCheck className="w-6 h-6 text-accent" />,
    title: 'Creator Development',
    accentColor: 'gold',
    items: [
      'Mindset & Confidence',
      'Discipline & Consistency',
      'Accountability & Growth',
    ],
  },
  {
    icon: <Layers className="w-6 h-6 text-sky-400" />,
    title: 'Creator Systems',
    accentColor: 'sky',
    items: [
      'Discord & Community Structure',
      'Bots & Automation',
      'Creator Workflows',
    ],
  },
  {
    icon: <Target className="w-6 h-6 text-accent" />,
    title: 'Creator Strategy',
    accentColor: 'gold',
    items: [
      'Positioning & Direction',
      'Content Planning',
      'Sustainable Growth',
    ],
  },
]

function CreatorPillarsSection() {
  return (
    <section id="pillars" className="py-20 md:py-28 bg-bg border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection>
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">THE CORE FOUNDATION</span>
          </div>
          <SectionHeading title="Three Pillars of Development" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {pillars.map((pillar, idx) => (
            <AnimatedSection key={pillar.title} delay={idx * 0.1}>
              <div className="h-full bg-card border border-border rounded-xl p-8 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Icon Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-bg border ${
                      pillar.accentColor === 'sky' ? 'border-sky-500/20' : 'border-accent/20'
                    }`}>
                      {pillar.icon}
                    </div>
                    <span className="font-mono text-xs text-secondary/60">0{idx + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl tracking-wide uppercase text-primary mb-6">
                    {pillar.title}
                  </h3>

                  {/* Bullets */}
                  <ul className="space-y-4">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-secondary text-sm">
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                          pillar.accentColor === 'sky'
                            ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                            : 'bg-accent/10 text-accent border border-accent/30'
                        }`}>
                          <Check size={10} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CreatorPillarsSection
