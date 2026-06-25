import * as Icons from 'lucide-react'
import { navItems, socialLinks } from '../../data/navigation'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 border border-accent/60 rounded-sm flex items-center justify-center">
                <span className="font-display text-lg text-accent leading-none">FH</span>
              </div>
              <span className="font-display text-lg tracking-wider text-primary">
                FOREVER HUMAN
              </span>
            </div>
            <p className="text-sm text-secondary leading-relaxed max-w-xs">
              Conversations about becoming the person you're capable of becoming.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Explore
              </h3>
              <ul className="flex flex-col gap-3">
                {navItems.slice(0, 3).map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Connect
              </h3>
              <ul className="flex flex-col gap-3">
                {navItems.slice(3).map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Follow
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const IconComponent = Icons[link.icon as keyof typeof Icons] as React.ComponentType<{
                  size?: number
                  className?: string
                }> | undefined

                return (
                  <a
                    key={link.name}
                    href={link.url}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200"
                    aria-label={link.name}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {IconComponent ? <IconComponent size={16} /> : <span>{link.icon}</span>}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary">
            © {currentYear} Forever Human Podcast. All Rights Reserved.
          </p>
          <p className="text-xs text-secondary/50">
            Built with purpose.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
