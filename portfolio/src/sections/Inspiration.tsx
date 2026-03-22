import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Inspiration() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="inspiration" ref={ref} className="py-20 border-t" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
      <div className="px-6 md:px-20 max-w-7xl mx-auto text-center">
        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--accent)' }}>
          05 / INSPIRATION
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display font-bold text-4xl" style={{ color: 'var(--fg)' }}>
          Always Learning. Always Building.
        </motion.h2>
      </div>
    </section>
  )
}
