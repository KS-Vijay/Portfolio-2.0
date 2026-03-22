import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ParticleField from '@/components/three/ParticleField'
import RevealText from '@/components/ui/RevealText'
import MagneticWrapper from '@/components/ui/MagneticWrapper'
import { useCursorHover } from '@/hooks/useCursorHover'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax transforms
  const y        = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale    = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  const cursor = useCursorHover()

  return (
    <section id="hero" ref={ref}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      {/* Three.js particle field background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Grain texture */}
      <div className="grain absolute inset-0 z-10 pointer-events-none" />

      {/* Content */}
      <motion.div style={{ y, opacity, scale }} className="relative z-20 text-center px-6 max-w-6xl">

        {/* Available tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-10 font-mono text-xs"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: 'var(--accent)' }} />
          Available for freelance work
        </motion.div>

        {/* Main headline — staggered word reveal */}
        <div className="overflow-hidden">
          <RevealText delay={0.3} className="block font-display font-bold leading-none text-[8vw]"
            style={{ color: 'var(--fg)' }}>
            Crafting Digital
          </RevealText>
        </div>
        <div className="overflow-hidden">
          <RevealText delay={0.45} className="block font-display font-bold italic leading-none text-[8vw]"
            style={{ color: 'var(--accent)' }}>
            Experiences
          </RevealText>
        </div>
        <div className="overflow-hidden">
          <RevealText delay={0.6} className="block font-display font-bold leading-none text-[8vw]"
            style={{ color: 'var(--fg)' }}>
            That Matter.
          </RevealText>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 font-body text-base md:text-lg tracking-[0.25em] uppercase"
          style={{ color: 'var(--fg-2)' }}>
          Full-Stack Developer · UI Engineer · Creative Coder
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-4 flex-wrap">

          <MagneticWrapper>
            <a href="#projects" {...cursor}
              className="px-8 py-4 font-body font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--accent)', color: 'var(--bg)',
                borderRadius: '2px',
              }}>
              View My Work
            </a>
          </MagneticWrapper>

          <MagneticWrapper>
            <a href="/resume.pdf" target="_blank" {...cursor}
              className="px-8 py-4 font-body text-sm tracking-wide border transition-all duration-300"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)', borderRadius: '2px' }}>
              Download CV ↓
            </a>
          </MagneticWrapper>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10" style={{ background: 'var(--fg-muted)' }} />
      </motion.div>

      {/* Left side — socials */}
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute left-8 bottom-10 flex flex-col gap-4 z-20 hidden md:flex">
        {['GitHub', 'LinkedIn', 'Twitter'].map((s) => (
          <a key={s} href="#" className="font-mono text-xs tracking-widest rotate-180"
            style={{ writingMode: 'vertical-rl', color: 'var(--fg-muted)' }}
            {...useCursorHover()}>
            {s}
          </a>
        ))}
        <div className="w-px h-20 self-center" style={{ background: 'var(--fg-muted)' }} />
      </motion.div>
    </section>
  )
}
