import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    year: '2022 - Present',
    role: 'Full-Stack Engineer',
    company: 'Tech Innovators',
    description: 'Leading frontend architecture, optimizing React performance, and building core UI components.',
  },
  {
    year: '2020 - 2022',
    role: 'Frontend Developer',
    company: 'Creative Agency',
    description: 'Developed interactive web experiences with Three.js and Framer Motion for high-profile clients.',
  },
  {
    year: '2018 - 2020',
    role: 'UI/UX Designer',
    company: 'Design Co.',
    description: 'Designed user-centric interfaces, bridging the gap between aesthetics and functionality.',
  },
]

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="experience" ref={ref} className="py-40 relative z-10" style={{ background: 'var(--bg-2)' }}>
      <div className="px-6 md:px-20 max-w-5xl mx-auto">
        
        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--accent)' }}>
          02.5 / EXPERIENCE
        </motion.span>
        
        <div className="overflow-hidden mb-16">
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-bold text-[5vw]" style={{ color: 'var(--fg)' }}>
            The Journey
          </motion.h2>
        </div>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="py-10 border-t group flex flex-col md:flex-row gap-6 md:gap-24 transition-colors duration-500"
              style={{ borderColor: 'var(--border)' }}>
              
              <div className="md:w-1/4 shrink-0">
                <span className="font-mono text-sm tracking-wide group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: 'var(--fg-muted)' }}>
                  {exp.year}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold mb-2 transition-colors" style={{ color: 'var(--fg)' }}>
                  {exp.role}
                </h3>
                <h4 className="font-body text-base mb-4" style={{ color: 'var(--accent)' }}>
                  {exp.company}
                </h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                  {exp.description}
                </p>
              </div>
              
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
