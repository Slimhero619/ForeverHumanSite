import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import type { Thought } from '../types/content'
import ThoughtCard from '../components/ui/ThoughtCard'
import AnimatedSection from '../components/ui/AnimatedSection'

function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchThoughts() {
      try {
        const res = await fetch('/api/thoughts')
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Failed to load thoughts')
        }
        setThoughts(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchThoughts()
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <section className="py-24 md:py-32 min-h-screen bg-bg relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <AnimatedSection>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </a>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection delay={0.05}>
          <div className="mb-12">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide text-primary uppercase mb-4">
              All Thoughts
            </h1>
            <div className="w-16 h-0.5 bg-accent mb-6" />
            <p className="text-secondary max-w-xl leading-relaxed">
              A collection of ideas, notes, and lessons learned on discipline, identity, and the process of becoming.
            </p>
          </div>
        </AnimatedSection>

        {/* Content */}
        <AnimatedSection delay={0.1}>
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-lg text-center">
              {error}
            </div>
          ) : thoughts.length === 0 ? (
            <div className="text-secondary/60 text-center py-16">
              No thoughts published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {thoughts.map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} />
              ))}
            </div>
          )}
        </AnimatedSection>

      </div>
    </section>
  )
}

export default ThoughtsPage
