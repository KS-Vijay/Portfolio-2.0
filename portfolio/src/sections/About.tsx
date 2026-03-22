import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCursorHover } from '@/hooks/useCursorHover'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const linkCursor = useCursorHover('hover')

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" ref={ref} className="relative py-40 px-6 md:px-20 overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      <span className="absolute top-20 right-8 font-display text-[20vw] font-bold leading-none select-none pointer-events-none"
        style={{ color: 'var(--border)', opacity: 0.5 }}>
        02
      </span>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_0.7fr] gap-20 items-center">

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
              Aspiring ML Engineer &<br />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-6 relative z-10">
            <a href="https://linkedin.com/in/ks-vijay" target="_blank" rel="noreferrer"
              {...linkCursor}
              className="p-4 border rounded-full hover:bg-white hover:text-black transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
              <Icon icon="mdi:linkedin" width={24} />
            </a>
            <a href="https://github.com/KS-Vijay" target="_blank" rel="noreferrer"
              {...linkCursor}
              className="p-4 border rounded-full hover:bg-white hover:text-black transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
              <Icon icon="mdi:github" width={24} />
            </a>
            <a href="https://instagram.com/_._ksvj_._" target="_blank" rel="noreferrer"
              {...linkCursor}
              className="p-4 border rounded-full hover:bg-white hover:text-black transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}>
              <Icon icon="mdi:instagram" width={24} />
            </a>
          </motion.div>
        </div>

        {/* Right: Photo with p4 hover */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative">

          <motion.div style={{ y: imgY, borderColor: 'var(--border)' }}
            className="relative overflow-hidden rounded-sm border group/img cursor-none">

            <img src="/images/p3.png" alt="Vijay Profile"
              className="w-full object-cover aspect-[4/5] grayscale transition-opacity duration-700 absolute inset-0 group-hover/img:opacity-0"
            />
            {/* p4 replaces p3 seamlessly on hover */}
            <img src="/images/p4.png" alt="Vijay Profile Hover"
              className="w-full object-cover aspect-[4/5] grayscale group-hover/img:grayscale-0 opacity-0 group-hover/img:opacity-100 transition-all duration-700 relative z-10"
            />

            <div className="absolute inset-0 pointer-events-none z-20"
              style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--bg) 80%, transparent) 0%, transparent 40%)' }} />

            {/* Quirky Crown correctly positioned on head */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute top-[3%] left-[50%] w-[35%] h-auto -translate-x-1/2 -rotate-12 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-90 group-hover/img:translate-y-[-10px] group-hover/img:rotate-12 group-hover/img:scale-110 transition-transform duration-500 ease-out pointer-events-none z-30"
              fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                d="M 10 90 L 20 20 L 40 60 L 60 10 L 80 60 L 95 25 L 90 90 Z"
              />
            </motion.svg>
          </motion.div>

          <div className="absolute -top-3 -right-3 inset-0 rounded-sm border pointer-events-none z-[-1]"
            style={{ borderColor: 'var(--accent)' }} />

          {['Python', 'Machine Learning', 'AI'].map((tag, i) => (
            <motion.span key={tag}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.7, delay: i * 0.4 }}
              className="absolute font-mono text-xs px-3 py-1.5 border z-30"
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
