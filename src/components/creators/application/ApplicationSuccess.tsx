import { CheckCircle2, ArrowLeft } from 'lucide-react'
import Button from '../../ui/Button'
import AnimatedSection from '../../ui/AnimatedSection'

interface ApplicationSuccessProps {
  entryPoint?: string
  serviceInterest?: string
}

function ApplicationSuccess({ entryPoint, serviceInterest }: ApplicationSuccessProps) {
  return (
    <AnimatedSection>
      <div
        data-entry-point={entryPoint}
        data-service-interest={serviceInterest}
        className="bg-card border border-accent/40 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl shadow-accent/5 relative overflow-hidden"
      >
        {/* Subtle Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} />
        </div>

        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2 block">
          SUBMISSION RECEIVED
        </span>

        <h2 className="font-display text-4xl sm:text-5xl tracking-wide uppercase text-primary mb-4">
          Application Received.
        </h2>

        <p className="text-secondary text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Thanks for telling me what you're building. I'll review your application and reach out with the next step.
        </p>

        <div className="flex justify-center">
          <Button
            href="/creators"
            variant="primary"
            icon={<ArrowLeft size={16} />}
          >
            Back to For Creators
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default ApplicationSuccess
