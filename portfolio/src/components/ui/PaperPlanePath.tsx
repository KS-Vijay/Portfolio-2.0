import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function PaperPlanePath() {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  })

  // We map the scroll progress to both the drawing of the dotted path AND the position of the plane along the path.
  // Using an S-curve path that stretches vertically. 
  // ViewBox is set extremely tall (e.g., 100 x 1000) so we get a good smooth curve scaling to any project list height.
  // The plane travels from top to bottom.
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  
  // Since we are using offsetDistance for the plane, it will follow the exact drawn SVG path natively!
  const planeOffset = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
      
      {/* Background SVG Canvas spanning the full height of Projects list */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 1000" preserveAspectRatio="none"
        fill="none" stroke="var(--accent)" strokeWidth="0.5"
      >
        {/* The dotted path track */}
        <motion.path 
          id="flightPath"
          d="M 50 0 C 80 200, 20 400, 50 500 C 80 600, 20 800, 50 1000"
          strokeDasharray="2 4"
          style={{ pathLength }}
        />
      </svg>

      {/* The Paper plane following the path */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
           className="absolute top-0 left-0 text-[var(--accent)] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
           style={{ 
             // Using CSS motion-path to stick it to the SVG path
             offsetPath: 'path("M 50 0 C 80 200, 20 400, 50 500 C 80 600, 20 800, 50 1000")',
             offsetDistance: planeOffset,
             // Scaling depends on exact viewBox mapping but percentage offset normalizes it
             width: '100%', height: '1000px', // Fallback context 
           }}
        >
          {/* We actually don't use offsetDistance directly on a div matched to an arbitrary viewBox.
              Instead, let's use a nested SVG so offset-path coordinate space matches perfectly! */}
        </motion.div>
      </div>

      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 1000" preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <motion.g 
          style={{ offsetPath: 'path("M 50 0 C 80 200, 20 400, 50 500 C 80 600, 20 800, 50 1000")', offsetDistance: planeOffset }}
        >
          {/* Plane icon centered at the offset point. We use a tiny SVG shape so it scales well */}
          <path 
            d="M -4 -4 L 4 0 L -4 4 L -2 0 Z" 
            fill="var(--fg)" 
            stroke="var(--accent)"
            strokeWidth="0.5"
            transform="rotate(90)"
            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          />
        </motion.g>
      </svg>

    </div>
  )
}
