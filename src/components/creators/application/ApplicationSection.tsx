import { AlertCircle } from 'lucide-react'

interface ApplicationSectionProps {
  number: string
  title: string
  description?: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function ApplicationSection({
  number,
  title,
  description,
  required,
  error,
  children,
}: ApplicationSectionProps) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 transition-colors">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-semibold text-accent tracking-wider uppercase">
            SECTION {number}
          </span>
          {required && (
            <span className="text-[11px] font-mono text-secondary/60 uppercase">
              REQUIRED
            </span>
          )}
        </div>

        <h2 className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-primary">
          {title}
        </h2>

        {description && (
          <p className="text-secondary text-sm leading-relaxed mt-1.5">
            {description}
          </p>
        )}
      </div>

      <div>{children}</div>

      {error && (
        <div className="mt-4 flex items-center gap-1.5 text-red-400 text-xs font-medium">
          <AlertCircle size={14} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default ApplicationSection
