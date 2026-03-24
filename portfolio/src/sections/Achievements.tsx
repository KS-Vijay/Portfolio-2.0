import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const achs = [
  { title: "Secured Top 2% Rank in NPTEL – Introduction to IoT", date: "Nov’ 25", desc: "Recognized for strong academic performance, analytical depth, and course excellence in IoT." },
  { title: "Secured Top 70 in National Level Hackathon by SAP", date: "Aug’ 25", desc: "Recognized for innovative problem-solving and rapid development of a high-impact AI governance solution under intense pressure." }
]

import AmbientShapes from '@/components/ui/AmbientShapes'

export default function Achievements() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="achievements" ref={ref} className="py-24 border-t relative z-10 overflow-hidden" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
      <AmbientShapes />
      <div className="px-6 md:px-20 max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row gap-16 md:items-start">
          <div className="md:w-1/3">
            <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--accent)' }}>
              06.5 / VICTORIES
            </motion.span>
            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-bold text-4xl md:text-[4vw] leading-tight pb-4" style={{ color: 'var(--fg)' }}>
                Milestones &<br/>Achievements
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
              className="font-body text-base" style={{ color: 'var(--fg-2)' }}>
              A track record of pushing boundaries, competing among the best, and delivering excellence under pressure.
            </motion.p>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {achs.map((ach, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="p-8 border rounded-sm hover:border-[var(--accent)] transition-colors duration-500 group"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="font-display text-xl md:text-2xl font-bold" style={{ color: 'var(--fg)' }}>
                    {ach.title}
                  </h3>
                  <span className="font-mono text-xs whitespace-nowrap px-3 py-1 rounded-full border group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors"
                    style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)' }}>
                    {ach.date}
                  </span>
                </div>
                <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                  {ach.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
