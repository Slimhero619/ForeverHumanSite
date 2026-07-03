import type { Thought } from '../../types/content'

interface ThoughtCardProps {
  thought: Thought
}

function ThoughtCard({ thought }: ThoughtCardProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }
      return new Date(dateStr).toLocaleDateString('en-US', options)
    } catch {
      return dateStr
    }
  }

  return (
    <article className={`bg-card border rounded-lg p-6 hover:border-accent/40 transition-all duration-300 relative overflow-hidden group ${
      thought.featured ? 'border-accent/30 shadow-[0_0_15px_rgba(201,161,90,0.05)]' : 'border-border'
    }`}>
      {thought.featured && (
        <span className="absolute top-0 right-0 bg-accent text-bg text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-bl">
          Featured
        </span>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {thought.category && (
            <span className="text-[10px] text-accent uppercase tracking-wider font-semibold border border-accent/20 px-2 py-0.5 rounded-sm">
              {thought.category}
            </span>
          )}
          <time className="text-xs text-secondary">
            {formatDate(thought.date)}
          </time>
        </div>
        <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-300">
          {thought.title}
        </h3>
        {thought.excerpt && (
          <p className="text-sm text-secondary leading-relaxed mt-1">
            {thought.excerpt}
          </p>
        )}
      </div>
    </article>
  )
}

export default ThoughtCard
