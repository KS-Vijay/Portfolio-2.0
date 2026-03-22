import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%', background: 'var(--accent)' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9990]"
    />
  )
}
