import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const els = containerRef.current.querySelectorAll('.hero-anim')
    gsap.from(els, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.3,
    })
  }, { scope: containerRef })

  return (
    <section id="hero" className="relative min-h-dvh w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/30" />

      {/* Content — bottom left */}
      <div
        ref={containerRef}
        className="relative z-10 h-full min-h-dvh flex flex-col justify-end px-4 sm:px-12 lg:px-24 pb-12 sm:pb-24 max-w-5xl"
      >
        <p className="hero-anim font-mono text-xs sm:text-sm text-champagne tracking-widest uppercase mb-4 sm:mb-6">
          Better Brand Digital
        </p>

        <h1 className="hero-anim font-heading font-extrabold text-ivory text-3xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08]">
          Your brand deserves
        </h1>
        <h1 className="hero-anim font-drama italic text-champagne text-4xl sm:text-7xl lg:text-[8rem] leading-[0.95] mb-4 sm:mb-8">
          better.
        </h1>

        <p className="hero-anim text-ivory/70 text-sm sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-6 sm:mb-10">
          Custom-coded websites and digital strategy that actually convert.
          No templates. No page builders. Ever.
        </p>

        <a
          href="#contact"
          className="hero-anim btn-magnetic inline-flex items-center gap-2 bg-champagne text-obsidian px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold w-fit"
        >
          <span className="relative z-10">Book a Free Call</span>
          <ArrowRight size={16} className="relative z-10" />
          <span className="btn-bg bg-champagne-light rounded-full" />
        </a>
      </div>
    </section>
  )
}
