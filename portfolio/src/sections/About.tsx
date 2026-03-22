import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])  // subtle parallax on image

  const stats = [
    { num: '3+',  label: 'Years Experience' },
    { num: '20+', label: 'Projects Shipped' },
    { num: '10+', label: 'Happy Clients' },
  ]

  return (
    <section id="about" ref={ref} className="relative py-40 px-6 md:px-20 overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      {/* Section number watermark */}
      <span className="absolute top-20 right-8 font-display text-[20vw] font-bold leading-none select-none pointer-events-none"
        style={{ color: 'var(--border)', opacity: 0.5 }}>
        02
      </span>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_0.7fr] gap-20 items-center">

        {/* Left: Text */}
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs tracking-widest mb-6 block"
            style={{ color: 'var(--accent)' }}>
            02 / ABOUT ME
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="font-display font-bold text-[5vw] leading-tight mb-8"
              style={{ color: 'var(--fg)' }}>
              The Human Behind<br/>
              <span style={{ color: 'var(--accent)' }}>the Code</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-base leading-relaxed mb-6"
            style={{ color: 'var(--fg-2)' }}>
            I'm a full-stack developer who obsesses over the intersection of
            engineering and design. I build things that not only work flawlessly
            under the hood, but also feel extraordinary to use.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-body text-base leading-relaxed mb-12"
            style={{ color: 'var(--fg-2)' }}>
            I believe the best code is invisible — the user never thinks about it.
            They just feel it. That philosophy drives every line I write.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-12">
            {stats.map(({ num, label }) => (
              <div key={label}>
                <span className="block font-display text-4xl font-bold" style={{ color: 'var(--accent)' }}>
                  {num}
                </span>
                <span className="font-body text-sm" style={{ color: 'var(--fg-muted)' }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative">

          {/* Main image with parallax */}
          <motion.div style={{ y: imgY, borderColor: 'var(--border)' }}
            className="relative overflow-hidden rounded-sm border">
            <img src="/your-photo.jpg" alt="Profile"
              className="w-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 40%)' }} />
          </motion.div>

          {/* Floating accent border offset */}
          <div className="absolute -top-3 -right-3 inset-0 rounded-sm border pointer-events-none z-[-1]"
            style={{ borderColor: 'var(--accent)' }} />

          {/* Floating skill tags */}
          {['React', 'Node.js', 'UI Design'].map((tag, i) => (
            <motion.span key={tag}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.7, delay: i * 0.4 }}
              className="absolute font-mono text-xs px-3 py-1.5 border"
              style={{
                top: `${20 + i * 30}%`, right: '-18%',
                background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--fg-2)',
                borderRadius: '2px',
              }}>
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
