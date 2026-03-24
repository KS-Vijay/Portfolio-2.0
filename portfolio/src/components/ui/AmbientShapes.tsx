import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AmbientShapes() {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Subtle cross-fading and tracking parallax parameters
  const y1 = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Giant dotted circle */}
      <motion.div
        style={{ y: y1, rotate: rotate1, borderColor: 'var(--fg)' }}
        className="absolute top-[10%] -left-[10%] w-[60vw] max-w-[500px] aspect-square rounded-full border border-dashed opacity-[0.03]"
      />
      
      {/* Floating abstract cross */}
      <motion.svg
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[60%] right-[10%] w-[15vw] max-w-[150px] aspect-square opacity-[0.04]"
        viewBox="0 0 100 100" fill="none" stroke="currentcolor" strokeWidth="1" strokeLinecap="round"
        color="var(--fg)"
      >
        <path d="M 50 10 L 50 90 M 10 50 L 90 50" strokeDasharray="4 4" />
      </motion.svg>
      
      {/* Concentric rings */}
      <motion.div 
        style={{ y: y1, rotate: rotate2 }}
        className="absolute top-[80%] left-[50%] w-[30vh] aspect-square -translate-x-1/2 opacity-[0.02]"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="0.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="2 6" />
          <circle cx="50" cy="50" r="30" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="20" strokeDasharray="2 2" />
        </svg>
      </motion.div>
      
    </div>
  )
}
