import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

export default function GetStarted() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const els = sectionRef.current.querySelectorAll('.cta-anim')
    gsap.from(els, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-40 px-5 sm:px-12 lg:px-24 bg-obsidian"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="cta-anim font-mono text-[11px] text-champagne tracking-widest uppercase mb-5">
          Let's Talk
        </p>

        <h2 className="cta-anim font-drama italic text-ivory text-[1.75rem] sm:text-5xl lg:text-6xl leading-tight mb-5">
          Ready to build something{' '}
          <span className="text-champagne">better?</span>
        </h2>

        <p className="cta-anim text-ivory/40 text-[15px] sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          No pitch decks. No 47-page proposals. Just a real conversation about
          what your brand needs — and how we build it.
        </p>

        <a
          href="#"
          className="cta-anim btn-magnetic inline-flex items-center gap-2 bg-champagne text-obsidian px-8 py-4 rounded-full text-sm sm:text-lg font-semibold"
        >
          <span className="relative z-10">Book a Free Call</span>
          <ArrowRight size={18} className="relative z-10" />
          <span className="btn-bg bg-champagne-light rounded-full" />
        </a>

        <p className="cta-anim text-ivory/25 text-xs sm:text-sm mt-5">
          30 minutes. No obligations. Just clarity.
        </p>
      </div>
    </section>
  )
}
