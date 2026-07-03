import { useState, useEffect } from 'react'
import type { Thought } from '../../types/content'
import ThoughtCard from '../ui/ThoughtCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

function ThoughtsSection() {
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
  }, [])

  return (
    <div aria-labelledby="thoughts-title">
      <AnimatedSection>
        <SectionHeading
          title="Latest Thoughts"
          actionLabel="View All Thoughts"
          actionHref="/thoughts"
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-sm text-center">
            {error}
          </div>
        ) : thoughts.length === 0 ? (
          <div className="text-secondary/60 text-sm text-center py-8">
            No thoughts published yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {thoughts.slice(0, 3).map((thought) => (
              <ThoughtCard key={thought.id} thought={thought} />
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  )
}

export default ThoughtsSection
