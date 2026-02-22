import { useRef, useEffect, useState } from 'react'
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
    <svg ref={ref} viewBox="0 0 120 120" className="w-14 h-14 sm:w-28 sm:h-28 opacity-15">
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
    <svg viewBox="0 0 120 120" className="w-14 h-14 sm:w-28 sm:h-28 opacity-15">
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
    <svg viewBox="0 0 200 60" className="w-20 sm:w-40 h-7 sm:h-14 opacity-15">
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

/* ─── Step Card (light card on dark bg) ─── */
function StepCard({ step }) {
  return (
    <div className="bg-ivory rounded-2xl sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 max-w-4xl w-full relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="absolute top-5 right-5 sm:top-12 sm:right-12 text-slate-dark/30">
        <step.Animation />
      </div>
      <span className="font-mono text-champagne text-xs sm:text-sm block mb-2 sm:mb-4">
        {step.number}
      </span>
      <h3 className="font-heading font-bold text-obsidian text-lg sm:text-3xl lg:text-4xl tracking-tight mb-2 sm:mb-4 max-w-[65%] sm:max-w-none">
        {step.title}
      </h3>
      <p className="text-slate-dark/60 text-[13px] sm:text-lg max-w-lg leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}

/* ─── Protocol Section ─── */
export default function Protocol() {
  const sectionRef = useRef(null)
  const desktopRef = useRef(null)
  const cardsRef = useRef([])
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useGSAP(() => {
    if (!isDesktop || !desktopRef.current) return
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
  }, { scope: desktopRef, dependencies: [isDesktop] })

  return (
    <section id="protocol" ref={sectionRef} className="relative bg-obsidian">
      <div className="px-5 sm:px-12 lg:px-24 pt-16 sm:pt-32 pb-6 sm:pb-8">
        <p className="font-mono text-[11px] text-champagne tracking-widest uppercase mb-3">
          Our Process
        </p>
        <h2 className="font-heading font-bold text-ivory text-2xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
          Three steps. Zero guesswork.
        </h2>
      </div>

      {/* Mobile: simple stacked cards */}
      {!isDesktop && (
        <div className="flex flex-col gap-3 px-5 pb-16">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>
      )}

      {/* Desktop: scroll-pinned stacking effect */}
      {isDesktop && (
        <div ref={desktopRef}>
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="h-screen w-full flex items-center justify-center px-12 lg:px-24"
            >
              <StepCard step={step} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
