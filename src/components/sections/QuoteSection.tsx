import AnimatedSection from '../ui/AnimatedSection'
import quoteBackground from '../../assets/images/quote-background.png'

function QuoteSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden" aria-label="Inspirational quote">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={quoteBackground}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-bg/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          {/* Gold quote marks */}
          <span className="font-display text-6xl md:text-8xl text-accent/30 leading-none block mb-4">
            &ldquo;&rdquo;
          </span>

          <blockquote>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-primary leading-tight">
              You're not trying to become someone else.
              <br />
              You're uncovering who you've always been.
            </p>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default QuoteSection
