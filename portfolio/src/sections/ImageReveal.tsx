import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ImageReveal() {
  const ref = useRef<HTMLDivElement>(null)
  
  // Scroll tracking across the container
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  
  // Parallax the image to create a deep cinematic reveal
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  // Mr Pops style quirky drawing animation (animated SVG path)
  const pathLength = useTransform(scrollYProgress, [0, 0.7], [0, 1])

  return (
    <section className="relative h-[100vh] w-full overflow-hidden" ref={ref} style={{ background: 'var(--bg)' }}>
      
      {/* Cinematic Parallax Img Reveal */}
      <motion.div 
        className="absolute inset-0 w-full h-full origin-bottom"
        style={{ scale, y }}
      >
        <img 
          src="/images/p2.webp" 
          alt="Abstract Visualization" 
          className="w-full h-full object-cover grayscale opacity-[0.85]"
        />
        {/* Soft edge blend gradients */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 20%, transparent 80%, var(--bg) 100%)' }} />
      </motion.div>

      {/* Quirky SVG overlay layer */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 mix-blend-difference">
        <svg viewBox="0 0 200 200" className="w-[80vw] md:w-[60vw] max-w-[800px] opacity-70">
           <motion.path 
            d="M 100 10 C 140 10, 190 40, 180 100 C 170 160, 110 190, 60 170 C 10 150, 10 80, 50 40 C 80 10, 150 40, 130 90 C 110 140, 40 100, 70 60 C 90 30, 140 70, 110 110 C 90 140, 60 110, 80 80" 
            fill="transparent" 
            stroke="white" 
            strokeWidth="0.5"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </div>
      
    </section>
  )
}
