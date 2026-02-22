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
    <footer className="bg-obsidian rounded-t-[3rem] sm:rounded-t-[4rem] px-6 sm:px-12 lg:px-24 pt-16 sm:pt-24 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 mb-16 sm:mb-24">
        {/* Brand */}
        <div>
          <h3 className="font-heading font-bold text-ivory text-xl tracking-tight mb-3">
            Better Brand Digital
          </h3>
          <p className="text-ivory/40 text-sm leading-relaxed max-w-xs">
            Design that performs. Custom-coded websites and digital strategy for
            businesses that deserve better.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p className="font-mono text-[11px] text-ivory/30 tracking-widest uppercase mb-4">
            Navigate
          </p>
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-ivory/60 text-sm lift hover:text-ivory transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <p className="font-mono text-[11px] text-ivory/30 tracking-widest uppercase mb-4">
            Connect
          </p>
          <div className="space-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-ivory/60 text-sm lift hover:text-ivory transition-colors"
              >
                {link.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-ivory/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-ivory/30 text-xs">
          &copy; {new Date().getFullYear()} Better Brand Digital. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-xs text-ivory/30">System Operational</span>
        </div>
      </div>
    </footer>
  )
}
