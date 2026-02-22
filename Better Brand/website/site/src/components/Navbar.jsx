import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'Services', href: '#features' },
  { label: 'Work', href: '#philosophy' },
  { label: 'Process', href: '#protocol' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 px-3 sm:px-5 py-2.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/60 backdrop-blur-xl border border-slate-dark/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <a
            href="#"
            className={`font-heading font-bold text-lg tracking-tight transition-colors duration-500 ${
              scrolled ? 'text-obsidian' : 'text-ivory'
            }`}
          >
            BBD
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight lift transition-colors duration-500 ${
                  scrolled ? 'text-slate-dark hover:text-obsidian' : 'text-ivory/80 hover:text-ivory'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className={`hidden md:flex items-center gap-2 btn-magnetic px-5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ${
              scrolled
                ? 'bg-champagne text-obsidian'
                : 'bg-ivory/15 text-ivory border border-ivory/20 backdrop-blur-sm'
            }`}
          >
            <span className="relative z-10">Book a Free Call</span>
            <ArrowRight size={14} className="relative z-10" />
            <span className={`btn-bg rounded-full ${scrolled ? 'bg-champagne-light' : 'bg-ivory/25'}`} />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${
              scrolled ? 'text-obsidian' : 'text-ivory'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-ivory text-2xl font-heading font-semibold lift"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="btn-magnetic bg-champagne text-obsidian px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2"
        >
          <span className="relative z-10">Book a Free Call</span>
          <ArrowRight size={18} className="relative z-10" />
        </a>
      </div>
    </>
  )
}
