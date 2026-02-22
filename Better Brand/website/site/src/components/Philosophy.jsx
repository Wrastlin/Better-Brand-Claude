import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Philosophy() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const lines = sectionRef.current.querySelectorAll('.phil-line')
    lines.forEach((line) => {
      gsap.from(line, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-16 sm:py-40 px-4 sm:px-12 lg:px-24 bg-obsidian overflow-hidden"
    >
      {/* Parallax texture background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="phil-line text-ivory/40 text-base sm:text-lg lg:text-2xl leading-relaxed mb-8 sm:mb-12">
          Most agencies give you a template and call it custom. A page builder
          with your logo dropped in. Recycled layouts. Cookie-cutter strategy.
        </p>

        <h2 className="phil-line font-drama italic text-2xl sm:text-5xl lg:text-6xl leading-tight text-ivory">
          We write every line of code{' '}
          <span className="text-champagne">from scratch.</span>
        </h2>

        <p className="phil-line mt-8 sm:mt-12 text-ivory/40 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
          Because your brand isn't generic — so why should your website be?
        </p>
      </div>
    </section>
  )
}
