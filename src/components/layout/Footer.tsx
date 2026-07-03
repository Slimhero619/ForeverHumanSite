import { PlaySquare, Camera, Mail } from 'lucide-react'
import { navItems } from '../../data/navigation'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 border border-accent/60 rounded-sm items-center justify-center hidden">
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

          {/* Social Icons */}
          <div className="flex items-start gap-3 pt-1">
            <a
              href="https://www.youtube.com/@foreverhumanpodcast"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200"
            >
              <PlaySquare size={17} />
            </a>
            <a
              href="https://www.instagram.com/foreverhumanpodcast/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200"
            >
              <Camera size={17} />
            </a>
            <a
              href="mailto:slimzztv@outlook.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200"
            >
              <Mail size={17} />
            </a>
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
