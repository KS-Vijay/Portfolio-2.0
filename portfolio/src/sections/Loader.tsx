import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'

export default function Loader() {
  const { setLoading } = useStore()
  const [exit, setExit] = useState(false)

  useEffect(() => {
    // 3.0s total cinematic load time
    const timer = setTimeout(() => {
      setExit(true)
      setTimeout(() => setLoading(false), 1200) // waiting for exit animation
    }, 3000)
    return () => clearTimeout(timer)
  }, [setLoading])

  const name = "VIJAY".split('')

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
          style={{ background: 'var(--bg)' }}
        >
          {/* Centered Name Core Animation */}
          <div className="flex overflow-hidden relative">
            {/* Outline Text */}
            {name.map((letter, i) => (
              <motion.span
                key={'outline-'+i}
                initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 0.9, 
                  ease: [0.25, 0.46, 0.45, 0.94], 
                  delay: 0.3 + i * 0.1 
                }}
                className="font-display text-[20vw] md:text-[22vw] font-bold leading-none inline-block shrink-0"
                style={{ 
                  WebkitTextStroke: '2px var(--border)', 
                  color: 'transparent' 
                }}
              >
                {letter}
              </motion.span>
            ))}
            
            {/* The Solid Fill Sweep Animation overlay */}
            <motion.div 
              className="absolute inset-0 flex overflow-hidden"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex whitespace-nowrap">
                {name.map((letter, i) => (
                  <span key={'solid-'+i} 
                    className="font-display text-[20vw] md:text-[22vw] font-bold leading-none inline-block shrink-0"
                    style={{ color: 'var(--fg)', textShadow: '0 0 40px var(--accent)' }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Epic tracking line underneath */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.0, ease: [0.85, 0, 0.15, 1] }}
            className="h-[2px] mt-8 origin-center bg-[var(--accent)]"
            style={{ width: 'clamp(200px, 60vw, 800px)' }}
          />

          {/* Subtitle reveal */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="font-mono tracking-[0.5em] text-xs mt-6 uppercase"
            style={{ color: 'var(--fg-muted)' }}
          >
            Entering Portfolio
          </motion.span>
          
        </motion.div>
      )}
    </AnimatePresence>
  )
}
