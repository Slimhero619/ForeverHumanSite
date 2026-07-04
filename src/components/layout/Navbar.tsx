import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../../data/navigation'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3" aria-label="Forever Human home">
            <div className="w-9 h-9 border border-accent/60 rounded-sm items-center justify-center hidden">
              <span className="font-display text-lg text-accent leading-none">FH</span>
            </div>
            <span className="font-display text-2xl sm:text-3xl md:text-4xl tracking-wider text-primary">
              FOREVER HUMAN
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-secondary hover:text-primary transition-colors duration-200 uppercase tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Merch CTA */}
          <div className="hidden lg:block">
            <a
              href="https://forever-human.myspreadshop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider px-5 py-2.5 rounded-md bg-accent text-bg font-semibold hover:bg-accent/85 transition-colors duration-200"
            >
              <ShoppingBag size={15} />
              Merch Store
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="lg:hidden bg-bg/95 backdrop-blur-xl border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="text-base text-secondary hover:text-primary transition-colors duration-200 uppercase tracking-wider py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <a
                  href="https://forever-human.myspreadshop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-2 w-full text-sm uppercase tracking-wider px-5 py-3 rounded-md bg-accent text-bg font-semibold hover:bg-accent/85 transition-colors duration-200"
                >
                  <ShoppingBag size={16} />
                  Merch Store
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
