import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

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
              Aspiring ML Engineer &<br/>
              <span style={{ color: 'var(--accent)' }}>Builder</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-base md:text-lg leading-relaxed mb-6"
            style={{ color: 'var(--fg-2)' }}>
            Hi, I'm Vijay K S — an aspiring Machine Learning Engineer with a strong interest in space, technology, and building things that make an impact. I enjoy working on real-world problems using code, especially in the fields of AI and automation.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-body text-base md:text-lg leading-relaxed mb-6"
            style={{ color: 'var(--fg-2)' }}>
            I'm currently pursuing my undergraduate studies and actively building projects, participating in hackathons, and learning everything I can about future tech. Beyond tech, I'm deeply inspired by space and the unknown — the silence between stars reminds me why curiosity matters.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-body text-base md:text-lg leading-relaxed mb-10"
            style={{ color: 'var(--fg-2)' }}>
            I believe in staying consistent, thinking long-term, and pushing myself to learn and grow every day. Whether it's developing tools that solve real problems or just exploring big ideas, I'm here to build — and to keep getting better.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-6">
            <a href="https://linkedin.com/in/vijay" target="_blank" rel="noreferrer"
              className="p-4 border rounded-full hover:bg-white hover:text-black transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
              <Icon icon="mdi:linkedin" width={24} />
            </a>
            <a href="https://github.com/vijay" target="_blank" rel="noreferrer"
              className="p-4 border rounded-full hover:bg-white hover:text-black transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
              <Icon icon="mdi:github" width={24} />
            </a>
            <a href="https://instagram.com/vijay" target="_blank" rel="noreferrer"
              className="p-4 border rounded-full hover:bg-white hover:text-black transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
              <Icon icon="mdi:instagram" width={24} />
            </a>
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
            <img src="/your-photo.jpg" alt="Vijay Profile"
              className="w-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 40%)' }} />
          </motion.div>

          {/* Floating accent border offset */}
          <div className="absolute -top-3 -right-3 inset-0 rounded-sm border pointer-events-none z-[-1]"
            style={{ borderColor: 'var(--accent)' }} />

          {/* Floating tags */}
          {['Python', 'Machine Learning', 'AI'].map((tag, i) => (
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
