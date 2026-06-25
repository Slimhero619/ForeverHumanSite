import type { Thought } from '../../types/content'

interface ThoughtCardProps {
  thought: Thought
}

function ThoughtCard({ thought }: ThoughtCardProps) {
  return (
    <article className="bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-colors duration-300">
      <p className="text-sm text-primary leading-relaxed mb-4">
        {thought.text}
      </p>
      <time className="text-xs text-secondary uppercase tracking-wider">
        {thought.date}
      </time>
    </article>
  )
}

export default ThoughtCard
