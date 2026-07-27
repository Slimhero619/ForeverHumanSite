import { Check } from 'lucide-react'

interface SelectableOptionProps {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
  type?: 'checkbox' | 'radio'
}

function SelectableOption({
  label,
  description,
  selected,
  onClick,
  type = 'checkbox',
}: SelectableOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role={type === 'radio' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 select-none group ${
        selected
          ? 'bg-card border-accent/80 ring-1 ring-accent/40 shadow-sm shadow-accent/5'
          : 'bg-card/70 border-border hover:border-accent/40 hover:bg-card'
      }`}
    >
      {/* Indicator */}
      <div
        className={`flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
          type === 'radio'
            ? 'w-4 h-4 rounded-full border'
            : 'w-4 h-4 rounded border'
        } ${
          selected
            ? 'bg-accent border-accent text-bg'
            : 'border-border/80 group-hover:border-accent/50 bg-bg'
        }`}
      >
        {selected && (
          type === 'radio' ? (
            <span className="w-1.5 h-1.5 rounded-full bg-bg" />
          ) : (
            <Check size={11} strokeWidth={3} className="text-bg" />
          )
        )}
      </div>

      {/* Label & Description */}
      <div>
        <div
          className={`text-sm font-medium transition-colors ${
            selected ? 'text-primary' : 'text-primary/90 group-hover:text-primary'
          }`}
        >
          {label}
        </div>
        {description && (
          <p className="text-xs text-secondary mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </button>
  )
}

export default SelectableOption
