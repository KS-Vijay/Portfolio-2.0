'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useStore } from '@/store/useStore'

export default function Cursor() {
  const { cursorVariant } = useStore()
  const isTouchDevice = useRef('ontouchstart' in window)
  if (isTouchDevice.current) return null

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const variants = {
    default: { width: 16, height: 16, opacity: 1 },
    hover:   { width: 64, height: 64, opacity: 1 },
    text:    { width: 4, height: 32, borderRadius: '2px', opacity: 1 },
    view:    { width: 80, height: 80, opacity: 1 },
    hidden:  { width: 0, height: 0, opacity: 0 },
  }

  const v = variants[cursorVariant] || variants.default

  return (
    <motion.div
      style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%', mixBlendMode: 'difference' }}
      animate={v}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] flex items-center justify-center"
    >
      {cursorVariant === 'view' && (
        <span className="font-display text-[12px] font-bold text-black whitespace-nowrap" style={{ mixBlendMode: 'normal' }}>VIEW →</span>
      )}
    </motion.div>
  )
}
