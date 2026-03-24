import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCursorHover } from '@/hooks/useCursorHover'

const legends = [
  { name: 'Sundar Pichai', role: 'Visionary Leader', hue: '#c8ff00', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Sundar_Pichai_%282023%29_cropped.jpg' },
  { name: 'Nicholas Renotte', role: 'AI Educator', hue: '#ff6b35', img: 'https://github.com/nicknochnack.png' },
  { name: 'Thorfinn', role: 'True Warrior', hue: '#a78bfa', img: 'https://i.pinimg.com/originals/34/22/2a/34222a8f0d41c9158729fe194a789268.jpg' },
  { name: 'Isaac Newton', role: 'Physicist', hue: '#4ade80', img: 'https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg' },
  { name: 'Alexander the Great', role: 'Conqueror', hue: '#f43f5e', img: 'https://i.pinimg.com/736x/f2/22/32/f222321df5c8b39fc3826b7117a208c0.jpg' },
  { name: 'Linus Torvalds', role: 'Creator of Linux', hue: '#38bdf8', img: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg' }
]

export default function Inspiration() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const cursor = useCursorHover('view')

  // Tripled array for mathematically precise infinite loop sizing
  const strip = [...legends, ...legends, ...legends]

  return (
    <section id="inspiration" ref={ref} className="py-32 overflow-hidden border-t relative z-10" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
      <div className="px-6 md:px-20 max-w-7xl mx-auto text-center mb-16">
        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--accent)' }}>
          05 / INSPIRATION
        </motion.span>
        <div className="overflow-hidden">
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-bold text-4xl md:text-[5vw] leading-tight" style={{ color: 'var(--fg)' }}>
            The Shoulders of Giants
          </motion.h2>
        </div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm md:text-base italic mt-6 max-w-2xl mx-auto" style={{ color: 'var(--fg-2)' }}>
          "I do not seek a finish line, only the next horizon. The journey is about pushing past what is known and discovering what is possible."
        </motion.p>
      </div>

      {/* Standard Marquee Showcase */}
      <div className="relative w-full overflow-hidden py-10 flex" {...cursor}>
        <motion.div 
          className="flex gap-8 px-4 w-max"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {strip.map((legend, i) => (
            <div key={i} className="relative shrink-0 w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-sm overflow-hidden group transition-transform duration-500 hover:scale-[1.02]"
              style={{ background: 'var(--bg-card)' }}>
              
              {/* Fallback Abstract Gradient Box */}
              <div className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                style={{ 
                  background: `linear-gradient(135deg, color-mix(in srgb, ${legend.hue} 40%, black) 0%, #0a0a0a 100%)` 
                }} 
              />
              
              <img 
                src={legend.img}
                alt={legend.name}
                className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
                <h3 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--fg)' }}>
                  {legend.name}
                </h3>
                <p className="font-mono text-xs tracking-widest uppercase" style={{ color: legend.hue }}>
                  {legend.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
