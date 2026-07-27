import { ArrowUpRight, Headphones } from 'lucide-react'
import AnimatedSection from '../../ui/AnimatedSection'
import Button from '../../ui/Button'

function CreatorCTASection() {
  return (
    <section id="apply" className="py-24 md:py-32 bg-bg relative overflow-hidden">
      {/* Subtle Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <AnimatedSection>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 block">
            THE PHILOSOPHY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase text-primary mb-6 leading-tight">
            You don't need another <br className="hidden sm:inline" />
            <span className="text-accent">streaming guru.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="text-xl sm:text-2xl text-primary font-medium mb-6 max-w-2xl mx-auto">
            You need someone who can help you build the stream — and the person behind it.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-2xl mx-auto mb-10 text-secondary text-base leading-relaxed">
            "The same mindset behind Forever Human — perspective, discipline, execution, and intentional growth — applied to creators."
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/creators/apply"
              variant="primary"
              icon={<ArrowUpRight size={16} />}
            >
              Apply to Work Together
            </Button>

            <Button
              href="/#episodes"
              variant="secondary"
              icon={<Headphones size={16} />}
            >
              Listen to the Podcast
            </Button>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}

export default CreatorCTASection
