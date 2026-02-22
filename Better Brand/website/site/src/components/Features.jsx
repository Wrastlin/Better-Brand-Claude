import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Code2, BarChart3, Layers } from 'lucide-react'

/* ─── helpers ─── */
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/* ─── Card 1: Diagnostic Shuffler ─── */
function ShufflerCard() {
  const [order, setOrder] = useState([0, 1, 2])
  const labels = ['Next.js', 'React 19', 'Tailwind CSS']
  const subs = ['Server Components', 'Concurrent UI', 'Utility-First']

  useEffect(() => {
    const id = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-obsidian rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-champagne/10 flex items-center justify-center">
          <Code2 size={16} className="text-champagne" />
        </div>
        <span className="font-heading font-semibold text-ivory text-sm tracking-tight">Custom-Coded</span>
      </div>

      <div className="relative h-24 mb-5">
        {order.map((idx, pos) => (
          <div
            key={idx}
            className="absolute left-0 right-0 bg-ivory/[0.07] backdrop-blur-sm text-ivory rounded-xl px-4 py-3 flex items-center justify-between border border-ivory/[0.06]"
            style={{
              top: `${pos * 12}px`,
              zIndex: 3 - pos,
              opacity: 1 - pos * 0.25,
              transform: `scale(${1 - pos * 0.04})`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="font-mono text-xs">{labels[idx]}</span>
            <span className="font-mono text-[10px] text-champagne">{subs[idx]}</span>
          </div>
        ))}
      </div>

      <p className="text-ivory/40 text-[13px] leading-relaxed mt-auto">
        Hand-coded with modern frameworks. Built for performance.
      </p>
    </div>
  )
}

/* ─── Card 2: Telemetry Typewriter ─── */
function TypewriterCard() {
  const [text, setText] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [history, setHistory] = useState([])

  const messages = [
    'Bounce rate dropped 47%...',
    'Conversion rate up 3.2x...',
    'Page load: 0.8s (was 4.2s)...',
    'Mobile sessions +128%...',
    'Form completions +89%...',
  ]

  useEffect(() => {
    let charIdx = 0
    const msg = messages[msgIdx]
    const id = setInterval(() => {
      if (charIdx <= msg.length) {
        setText(msg.slice(0, charIdx))
        charIdx++
      } else {
        clearInterval(id)
        setTimeout(() => {
          setHistory((prev) => [...prev.slice(-2), msg])
          setMsgIdx((prev) => (prev + 1) % messages.length)
        }, 2000)
      }
    }, 45)
    return () => clearInterval(id)
  }, [msgIdx])

  return (
    <div className="bg-obsidian rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-champagne/10 flex items-center justify-center">
          <BarChart3 size={16} className="text-champagne" />
        </div>
        <span className="font-heading font-semibold text-ivory text-sm tracking-tight">Design That Converts</span>
      </div>

      <div className="bg-ivory/[0.04] rounded-xl p-4 mb-5 border border-ivory/[0.06]">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] text-ivory/30 uppercase tracking-wider">Live</span>
        </div>
        <div className="font-mono text-xs text-ivory/80">
          <span className="text-champagne">{'> '}</span>
          {text}
          <span className="inline-block w-[2px] h-3 bg-champagne ml-0.5 animate-pulse align-middle" />
        </div>
        {history.length > 0 && (
          <div className="mt-2 font-mono text-[10px] text-ivory/20 space-y-0.5">
            {history.map((msg, i) => (
              <div key={i}>{'> '}{msg}</div>
            ))}
          </div>
        )}
      </div>

      <p className="text-ivory/40 text-[13px] leading-relaxed mt-auto">
        Data-driven design. We track what works and optimize what doesn't.
      </p>
    </div>
  )
}

/* ─── Card 3: Scheduler ─── */
function SchedulerCard() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const [activeDays, setActiveDays] = useState(new Set())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        setActiveDays(new Set())
        setSaved(false)
        await wait(800)

        for (const day of [1, 3, 5]) {
          if (cancelled) return
          setActiveDays((prev) => new Set([...prev, day]))
          await wait(500)
        }

        await wait(400)
        if (cancelled) return
        setSaved(true)
        await wait(2500)
      }
    }

    run()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="bg-obsidian rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-champagne/10 flex items-center justify-center">
          <Layers size={16} className="text-champagne" />
        </div>
        <span className="font-heading font-semibold text-ivory text-sm tracking-tight">Full-Service</span>
      </div>

      <div className="bg-ivory/[0.04] rounded-xl p-4 mb-5 border border-ivory/[0.06]">
        <span className="font-mono text-[10px] text-ivory/30 block mb-3 uppercase tracking-wider">
          Strategy → Launch → Growth
        </span>
        <div className="grid grid-cols-7 gap-1.5 mb-3">
          {days.map((day, i) => (
            <div
              key={i}
              className={`text-center py-2 rounded-lg font-mono text-[11px] transition-all duration-300 ${
                activeDays.has(i)
                  ? 'bg-champagne text-obsidian font-semibold'
                  : 'bg-ivory/[0.06] text-ivory/30'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div
          className={`inline-block px-3 py-1 rounded-full font-mono text-[11px] transition-all duration-300 ${
            saved ? 'bg-champagne text-obsidian' : 'bg-ivory/[0.06] text-ivory/25'
          }`}
        >
          {saved ? '✓ Saved' : 'Save'}
        </div>
      </div>

      <p className="text-ivory/40 text-[13px] leading-relaxed mt-auto">
        One team handles everything — design, development, and marketing.
      </p>
    </div>
  )
}

/* ─── Features Section ─── */
export default function Features() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const cards = sectionRef.current.querySelectorAll('.feature-card')
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="features" ref={sectionRef} className="py-16 sm:py-32 px-5 sm:px-12 lg:px-24">
      <p className="font-mono text-[11px] text-champagne tracking-widest uppercase mb-3">
        What We Build
      </p>
      <h2 className="font-heading font-bold text-obsidian text-2xl sm:text-4xl lg:text-5xl tracking-tight mb-8 sm:mb-16 max-w-2xl">
        Websites that work as hard as you do.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
        <div className="feature-card"><ShufflerCard /></div>
        <div className="feature-card"><TypewriterCard /></div>
        <div className="feature-card"><SchedulerCard /></div>
      </div>
    </section>
  )
}
