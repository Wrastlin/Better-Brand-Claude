import { ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#features' },
  { label: 'Work', href: '#philosophy' },
  { label: 'Process', href: '#protocol' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/better-brand-digital' },
  { label: 'Instagram', href: 'https://www.instagram.com/betterbranddigital' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Better-Brand-Digital/61571187849847/' },
]

export default function Footer() {
  return (
    <footer className="bg-obsidian rounded-t-[2rem] sm:rounded-t-[4rem] px-5 sm:px-12 lg:px-24 pt-14 sm:pt-24 pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-16 mb-12 sm:mb-24">
        {/* Brand — full width on mobile */}
        <div className="col-span-2 sm:col-span-1">
          <h3 className="font-heading font-bold text-ivory text-lg tracking-tight mb-2">
            Better Brand Digital
          </h3>
          <p className="text-ivory/30 text-[13px] leading-relaxed max-w-xs">
            Custom-coded websites and digital strategy for
            businesses that deserve better.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p className="font-mono text-[10px] text-ivory/25 tracking-widest uppercase mb-4">
            Navigate
          </p>
          <div className="space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-ivory/50 text-[13px] lift hover:text-ivory transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <p className="font-mono text-[10px] text-ivory/25 tracking-widest uppercase mb-4">
            Connect
          </p>
          <div className="space-y-2.5">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-ivory/50 text-[13px] lift hover:text-ivory transition-colors"
              >
                {link.label}
                <ArrowUpRight size={11} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-ivory/20 text-[11px]">
          &copy; {new Date().getFullYear()} Better Brand Digital
        </p>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[11px] text-ivory/20">Operational</span>
        </div>
      </div>
    </footer>
  )
}
