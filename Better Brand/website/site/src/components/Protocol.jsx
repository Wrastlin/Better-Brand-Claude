import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/* ─── SVG Animations ─── */
function RotatingMotif() {
  const ref = useRef(null)
  useEffect(() => {
    const anim = gsap.to(ref.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })
    return () => anim.kill()
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 120 120" className="w-20 h-20 sm:w-28 sm:h-28 opacity-20">
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line
          key={a}
          x1="60" y1="10" x2="60" y2="110"
          stroke="currentColor" strokeWidth="0.3"
          transform={`rotate(${a} 60 60)`}
        />
      ))}
    </svg>
  )
}

function ScanningLine() {
  const ref = useRef(null)
  useEffect(() => {
    const anim = gsap.fromTo(
      ref.current,
      { attr: { y1: 0, y2: 0 } },
      { attr: { y1: 120, y2: 120 }, duration: 2, repeat: -1, ease: 'power1.inOut', yoyo: true }
    )
    return () => anim.kill()
  }, [])

  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-28 sm:h-28 opacity-20">
      {Array.from({ length: 100 }, (_, i) => (
        <circle
          key={i}
          cx={(i % 10) * 12 + 6}
          cy={Math.floor(i / 10) * 12 + 6}
          r="1"
          fill="currentColor"
          opacity="0.3"
        />
      ))}
      <line ref={ref} x1="0" y1="0" x2="120" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

function PulsingWave() {
  const ref = useRef(null)
  useEffect(() => {
    const anim = gsap.to(ref.current, {
      strokeDashoffset: -200,
      duration: 3,
      repeat: -1,
      ease: 'none',
    })
    return () => anim.kill()
  }, [])

  return (
    <svg viewBox="0 0 200 60" className="w-28 sm:w-40 h-10 sm:h-14 opacity-20">
      <path
        ref={ref}
        d="M0,30 Q25,5 50,30 Q75,55 100,30 Q125,5 150,30 Q175,55 200,30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="10 5"
        strokeDashoffset="0"
      />
    </svg>
  )
}

/* ─── Steps data ─── */
const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We learn your business inside out. Goals, audience, competitors — mapped and analyzed before a single pixel is placed.',
    Animation: RotatingMotif,
  },
  {
    number: '02',
    title: 'Design & Build',
    description: 'Custom code, cinematic design, conversion-optimized from day one. Built with modern frameworks, tested across every device.',
    Animation: ScanningLine,
  },
  {
    number: '03',
    title: 'Launch & Grow',
    description: 'Go live, track performance, iterate based on real data. Your site gets better every month — not just on launch day.',
    Animation: PulsingWave,
  },
]

/* ─── Protocol Section ─── */
export default function Protocol() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    // Only do sticky stacking on desktop
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function () {
        const cards = cardsRef.current.filter(Boolean)
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top top',
              endTrigger: cards[cards.length - 1],
              end: 'top top',
              pin: true,
              pinSpacing: false,
              onUpdate: (self) => {
                const progress = self.progress
                gsap.set(card, {
                  scale: 1 - progress * 0.08,
                  filter: `blur(${progress * 15}px)`,
                  opacity: 1 - progress * 0.4,
                })
              },
            })
          }
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="protocol" ref={sectionRef} className="relative">
      <div className="px-6 sm:px-12 lg:px-24 pt-20 sm:pt-32 pb-8">
        <p className="font-mono text-xs text-champagne tracking-widest uppercase mb-4">
          Our Process
        </p>
        <h2 className="font-heading font-bold text-obsidian text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
          Three steps. Zero guesswork.
        </h2>
      </div>

      {steps.map((step, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="md:h-screen w-full flex items-center justify-center px-6 sm:px-12 lg:px-24 py-8 md:py-0"
        >
          <div className="bg-ivory border border-slate-dark/10 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 max-w-4xl w-full shadow-lg relative overflow-hidden">
            <div className="absolute top-8 right-8 sm:top-12 sm:right-12 text-slate-dark">
              <step.Animation />
            </div>
            <span className="font-mono text-champagne text-sm block mb-4">
              {step.number}
            </span>
            <h3 className="font-heading font-bold text-obsidian text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
              {step.title}
            </h3>
            <p className="text-slate-dark/70 text-base sm:text-lg max-w-lg leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
