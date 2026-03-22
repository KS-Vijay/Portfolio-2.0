import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { useStore } from '@/store/useStore'

export default function Loader() {
  const { isLoading, setLoading } = useStore()
  const [count, setCount] = useState(0)
  const [exit, setExit] = useState(false)

  useEffect(() => {
    // Count from 0 to 100 over 2.2 seconds, fast start, eased end
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setExit(true)
          setTimeout(() => setLoading(false), 900)
        }, 200)
      },
    })
    return () => controls.stop()
  }, [])

  const topVariants: any = {
    initial:  { y: 0 },
    exit:     { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  }
  const botVariants: any = {
    initial:  { y: 0 },
    exit:     { y: '100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  }

  return (
    <AnimatePresence>
      {!exit && (
        <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: isLoading ? 'all' : 'none' }}>
          {/* Top half */}
          <motion.div
            variants={topVariants} initial="initial" animate={exit ? 'exit' : 'initial'}
            className="absolute inset-x-0 top-0 h-1/2 flex items-end justify-center pb-4"
            style={{ background: 'var(--bg)' }}
          >
            <div className="flex flex-col items-center gap-4">
              {/* Counter */}
              <span className="font-display text-[12vw] leading-none font-bold"
                    style={{ color: 'var(--fg)' }}>
                {String(count).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          {/* Bottom half */}
          <motion.div
            variants={botVariants} initial="initial" animate={exit ? 'exit' : 'initial'}
            className="absolute inset-x-0 bottom-0 h-1/2 flex items-start justify-center"
            style={{ background: 'var(--bg)' }}
          >
            {/* Progress bar */}
            <div className="w-[180px] h-[1px] mt-4" style={{ background: 'var(--border)' }}>
              <motion.div
                className="h-full" style={{ background: 'var(--accent)' }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
