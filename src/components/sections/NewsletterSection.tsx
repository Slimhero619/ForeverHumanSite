import { useState } from 'react'
import { Send } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'

function NewsletterSection() {
  const [email, setEmail] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // TODO: Wire up newsletter signup
    setEmail('')
  }

  return (
    <section
      id="newsletter"
      className="py-16 md:py-24 border-y border-border bg-card/30"
      aria-labelledby="newsletter-title"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2
            id="newsletter-title"
            className="font-display text-3xl md:text-4xl tracking-wide text-primary mb-3"
          >
            STAY CONNECTED
          </h2>
          <p className="text-secondary mb-8 text-sm md:text-base">
            Get notified when new episodes release and receive exclusive updates.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-bg border border-border rounded-sm text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors duration-200"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-bg font-semibold text-sm rounded-sm hover:bg-accent-hover transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              <Send size={14} />
              Subscribe
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default NewsletterSection
