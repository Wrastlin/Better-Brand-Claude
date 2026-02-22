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
    <div className="bg-ivory border border-slate-dark/10 rounded-[2rem] p-6 sm:p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Code2 size={16} className="text-champagne" />
        <span className="font-heading font-semibold text-obsidian text-sm">Custom-Coded</span>
      </div>

      <div className="relative h-32 mb-6">
        {order.map((idx, pos) => (
          <div
            key={idx}
            className="absolute left-0 right-0 bg-obsidian text-ivory rounded-xl px-4 py-3 flex items-center justify-between"
            style={{
              top: `${pos * 14}px`,
              zIndex: 3 - pos,
              opacity: 1 - pos * 0.2,
              transform: `scale(${1 - pos * 0.04})`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span className="font-mono text-sm">{labels[idx]}</span>
            <span className="font-mono text-xs text-champagne">{subs[idx]}</span>
          </div>
        ))}
      </div>

      <p className="text-slate-dark/70 text-sm leading-relaxed mt-auto">
        No templates. No page builders. Every site is hand-coded with modern
        frameworks built for performance.
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
    <div className="bg-ivory border border-slate-dark/10 rounded-[2rem] p-6 sm:p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={16} className="text-champagne" />
        <span className="font-heading font-semibold text-obsidian text-sm">Design That Converts</span>
      </div>

      <div className="bg-obsidian rounded-xl p-4 mb-6 min-h-[8rem] flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[11px] text-ivory/40">Live Feed</span>
        </div>
        <div className="font-mono text-sm text-ivory/90 mb-2">
          <span className="text-champagne">{'> '}</span>
          {text}
          <span className="inline-block w-[2px] h-3.5 bg-champagne ml-0.5 animate-pulse align-middle" />
        </div>
        <div className="mt-auto font-mono text-[11px] text-ivory/25 space-y-0.5">
          {history.map((msg, i) => (
            <div key={i}>{'> '}{msg}</div>
          ))}
        </div>
      </div>

      <p className="text-slate-dark/70 text-sm leading-relaxed mt-auto">
        Every pixel has a job. We track what works and optimize what
        doesn't. Data-driven design, not guesswork.
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

        // Activate days one by one
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
    <div className="bg-ivory border border-slate-dark/10 rounded-[2rem] p-6 sm:p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={16} className="text-champagne" />
        <span className="font-heading font-semibold text-obsidian text-sm">Full-Service</span>
      </div>

      <div className="bg-obsidian rounded-xl p-4 mb-6 min-h-[8rem]">
        <span className="font-mono text-[11px] text-ivory/40 block mb-3">
          Strategy → Launch → Growth
        </span>
        <div className="grid grid-cols-7 gap-1.5 mb-4">
          {days.map((day, i) => (
            <div
              key={i}
              className={`text-center py-2 rounded-lg font-mono text-xs transition-all duration-300 ${
                activeDays.has(i)
                  ? 'bg-champagne text-obsidian scale-95'
                  : 'bg-ivory/10 text-ivory/40'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div
          className={`inline-block px-3 py-1 rounded-full font-mono text-xs transition-all duration-300 ${
            saved ? 'bg-champagne text-obsidian' : 'bg-ivory/10 text-ivory/30'
          }`}
        >
          {saved ? '✓ Saved' : 'Save'}
        </div>
      </div>

      <p className="text-slate-dark/70 text-sm leading-relaxed mt-auto">
        Strategy to launch to growth. One team handles everything — design,
        development, and marketing.
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
    <section id="features" ref={sectionRef} className="py-20 sm:py-32 px-6 sm:px-12 lg:px-24">
      <p className="font-mono text-xs text-champagne tracking-widest uppercase mb-4">
        What We Build
      </p>
      <h2 className="font-heading font-bold text-obsidian text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-12 sm:mb-16 max-w-2xl">
        Websites that work as hard as you do.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card"><ShufflerCard /></div>
        <div className="feature-card"><TypewriterCard /></div>
        <div className="feature-card"><SchedulerCard /></div>
      </div>
    </section>
  )
}
