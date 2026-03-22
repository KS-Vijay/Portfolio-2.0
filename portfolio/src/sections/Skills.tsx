import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

const techStack = [
  { name: 'React',       icon: 'logos:react',          level: 95 },
  { name: 'TypeScript',  icon: 'logos:typescript-icon', level: 90 },
  { name: 'Next.js',     icon: 'logos:nextjs-icon',     level: 88 },
  { name: 'Node.js',     icon: 'logos:nodejs-icon',     level: 85 },
  { name: 'Tailwind',    icon: 'logos:tailwindcss-icon',level: 92 },
  { name: 'MongoDB',     icon: 'logos:mongodb-icon',    level: 80 },
  { name: 'PostgreSQL',  icon: 'logos:postgresql',      level: 78 },
  { name: 'Three.js',    icon: 'logos:threejs',         level: 65 },
]

const marqueeItems = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'Tailwind',
  'Framer Motion', 'Three.js', 'MongoDB', 'PostgreSQL', 'Docker', 'Figma',
  'WebGL', 'Redis', 'AWS', 'Vite', 'Prisma', 'GSAP',
]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills" ref={ref} className="py-40 overflow-hidden" style={{ background: 'var(--bg-2)' }}>
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

          {/* Large: Proficiency bars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-span-2 p-8 border rounded-sm"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h3 className="font-mono text-xs tracking-widest mb-8" style={{ color: 'var(--fg-muted)' }}>
              PROFICIENCY
            </h3>
            <div className="space-y-5">
              {techStack.map(({ name, icon, level }, i) => (
                <div key={name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="flex items-center gap-2 font-body text-sm" style={{ color: 'var(--fg)' }}>
                      <Icon icon={icon} width={16} />
                      {name}
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{level}%</span>
                  </div>
                  <div className="h-px w-full" style={{ background: 'var(--border)' }}>
                    <motion.div className="h-full" style={{ background: 'var(--accent)' }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${level}%` } : { width: 0 }}
                      transition={{ delay: 0.4 + i * 0.07, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                </div>
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
            <TypewriterCycle items={['Rust', 'WebGPU', 'Three.js', 'Web Audio API', 'Solidity']} />
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
              "Code is the closest thing we have to a superpower."
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
              {['VS Code', 'Figma', 'Git', 'Docker', 'Postman', 'Linear', 'Vercel', 'AWS'].map((t) => (
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
      <div className="relative overflow-hidden py-6 border-y" style={{ borderColor: 'var(--border)' }}>
        <motion.div className="flex whitespace-nowrap" animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
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
    const speed = deleting ? 40 : 80

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
    <span className="font-display text-3xl font-bold" style={{ color: 'var(--fg)' }}>
      {displayed}<span className="animate-blink" style={{ color: 'var(--accent)' }}>_</span>
    </span>
  )
}
