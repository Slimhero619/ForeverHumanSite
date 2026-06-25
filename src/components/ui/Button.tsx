import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonBaseProps {
  children: React.ReactNode
  variant?: ButtonVariant
  className?: string
  icon?: React.ReactNode
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string
  onClick?: never
}

interface ButtonAsButton extends ButtonBaseProps {
  onClick: () => void
  href?: never
}

type ButtonProps = ButtonAsLink | ButtonAsButton

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-bg hover:bg-accent-hover font-semibold',
  secondary:
    'border border-border text-primary hover:border-accent hover:text-accent bg-transparent',
  ghost:
    'text-secondary hover:text-accent bg-transparent',
}

function Button({ children, variant = 'primary', className = '', icon, ...rest }: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap'

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  )

  if ('href' in rest && rest.href) {
    return (
      <motion.a
        href={rest.href}
        className={combinedStyles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={rest.href.startsWith('http') ? '_blank' : undefined}
        rel={rest.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={combinedStyles}
      onClick={'onClick' in rest ? rest.onClick : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}

export default Button
