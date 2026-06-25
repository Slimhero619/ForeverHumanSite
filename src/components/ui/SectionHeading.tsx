import { ArrowRight } from 'lucide-react'

interface SectionHeadingProps {
  title: string
  actionLabel?: string
  actionHref?: string
}

function SectionHeading({ title, actionLabel, actionHref }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="font-display text-2xl md:text-3xl tracking-wide uppercase text-primary">
        {title}
      </h2>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="hidden sm:flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors duration-200"
        >
          {actionLabel}
          <ArrowRight size={14} />
        </a>
      )}
    </div>
  )
}

export default SectionHeading
