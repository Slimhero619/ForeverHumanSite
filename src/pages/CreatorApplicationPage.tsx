import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import CreatorApplicationForm from '../components/creators/application/CreatorApplicationForm'

function CreatorApplicationPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <section className="pt-28 pb-24 md:pt-36 md:pb-32 bg-bg min-h-screen relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <AnimatedSection>
          <Link
            to="/creators"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to For Creators</span>
          </Link>
        </AnimatedSection>

        {/* Page Hero Header */}
        <AnimatedSection delay={0.05}>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-card border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles size={12} className="text-accent" />
              <span>WORK WITH FOREVER HUMAN</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-primary uppercase mb-4 leading-tight">
              Tell Me What You're Building.
            </h1>
            <div className="w-16 h-0.5 bg-accent mb-6" />

            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-3">
              Every creator is starting from a different place. Tell me where you are, what you're trying to build, and where you're getting stuck.
            </p>

            <p className="text-xs font-mono text-accent/90 uppercase tracking-wider">
              You don't need to have everything figured out.
            </p>
          </div>
        </AnimatedSection>

        {/* Form Container */}
        <AnimatedSection delay={0.1}>
          <CreatorApplicationForm />
        </AnimatedSection>

      </div>
    </section>
  )
}

export default CreatorApplicationPage
