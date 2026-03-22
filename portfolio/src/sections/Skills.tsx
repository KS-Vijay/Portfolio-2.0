import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

const techStack = [
  { name: 'Python',           icon: 'logos:python' },
  { name: 'Java',             icon: 'logos:java' },
  { name: 'JavaScript',       icon: 'logos:javascript' },
  { name: 'C++',              icon: 'logos:c-plusplus' },
  { name: 'Machine Learning', icon: 'carbon:machine-learning-model' },
  { name: 'TensorFlow',       icon: 'logos:tensorflow' },
  { name: 'PyTorch',          icon: 'logos:pytorch-icon' },
]

const marqueeItems = [
  'Python', 'Machine Learning', 'Deep Learning', 'Java', 'TensorFlow', 'PyTorch',
  'Data Science', 'Docker', 'AWS', 'Reinforcement Learning', 'Cloud Computing'
]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills" ref={ref} className="py-40 overflow-hidden" style={{ background: 'var(--bg-3)', backgroundColor: '#050505' }}>
      <div className="px-6 md:px-20 max-w-7xl mx-auto">

        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--accent)' }}>
          03 / SKILLS
        </motion.span>

        <div className="overflow-hidden">
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-bold text-[5vw] mb-16" style={{ color: 'var(--fg)' }}>
            The Toolkit
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">

          {/* Large: Core Skills chips without percentages */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-span-2 p-8 border rounded-sm"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h3 className="font-mono text-xs tracking-widest mb-8" style={{ color: 'var(--fg-muted)' }}>
              CORE ARSENAL
            </h3>
            <div className="flex flex-wrap gap-4">
              {techStack.map(({ name, icon }, i) => (
                <motion.div key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                  className="flex items-center gap-3 px-5 py-3 border rounded-sm font-body text-sm"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)', background: 'var(--bg)' }}>
                  <Icon icon={icon} width={20} className="text-white" />
                  {name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Small: Currently learning (typewriter) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="p-8 border rounded-sm flex flex-col justify-between"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h3 className="font-mono text-xs tracking-widest mb-4" style={{ color: 'var(--fg-muted)' }}>
              CURRENTLY LEARNING
            </h3>
            <TypewriterCycle items={['Reinforcement Learning', 'Cloud Computing', 'Software Testing']} />
            <div className="mt-6 font-body text-xs" style={{ color: 'var(--fg-muted)' }}>
              Always pushing the boundary.
            </div>
          </motion.div>

          {/* Medium: Philosophy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="p-8 border rounded-sm"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <span className="block font-display text-5xl font-bold mb-4" style={{ color: 'var(--accent)' }}>∞</span>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
              "Machine intelligence is the last invention that humanity will ever need to make."
            </p>
          </motion.div>

          {/* Medium: Tools */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="md:col-span-2 p-8 border rounded-sm"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h3 className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--fg-muted)' }}>
              TOOLS & ENVIRONMENT
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Jupyter', 'Git', 'Docker', 'AWS', 'Linux', 'SQL', 'Postman', 'FastAPI'].map((t) => (
                <span key={t} className="px-3 py-1.5 border font-mono text-xs"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg-2)', borderRadius: '2px' }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden py-6 border-y" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
        <motion.div className="flex whitespace-nowrap" animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-6 mr-6 font-display text-2xl font-bold"
              style={{ color: i % 4 === 0 ? 'var(--accent)' : 'var(--fg-muted)' }}>
              {item} <span style={{ color: 'var(--fg-muted)' }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TypewriterCycle({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = items[index]
    const speed = deleting ? 30 : 60

    const timer = setTimeout(() => {
      if (!deleting && displayed === target) {
        setTimeout(() => setDeleting(true), 1200)
      } else if (deleting && displayed === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % items.length)
      } else {
        setDisplayed(deleting ? target.slice(0, displayed.length - 1) : target.slice(0, displayed.length + 1))
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayed, deleting, index, items])

  return (
    <span className="font-display text-2xl md:text-3xl font-bold" style={{ color: 'var(--fg)' }}>
      {displayed}<span className="animate-blink" style={{ color: 'var(--accent)' }}>_</span>
    </span>
  )
}
