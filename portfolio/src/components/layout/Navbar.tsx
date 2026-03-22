import { useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { useCursorHover } from '@/hooks/useCursorHover'
import MagneticWrapper from '@/components/ui/MagneticWrapper'

const links = ['Home', 'About', 'Experience', 'Skills', 'Projects'] as const

export default function Navbar() {
  const { theme, toggleTheme } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const cursor = useCursorHover('hover')

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[900] flex justify-center pointer-events-none transition-all duration-700"
        style={{ paddingTop: scrolled ? '24px' : '0px' }}
      >
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`flex items-center justify-between pointer-events-auto transition-all duration-700 ease-out ${
            scrolled 
              ? 'px-8 py-3 rounded-full backdrop-blur-xl border shadow-lg shadow-black/5 w-[90%] md:w-[750px]' 
              : 'px-8 py-5 w-full bg-transparent border-transparent'
          }`}
          style={{
            background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent',
            borderColor: scrolled ? 'var(--border)' : 'transparent',
          }}
        >
          {/* Logo */}
          <MagneticWrapper>
            <motion.a href="#hero" className="group font-display font-bold tracking-tight text-xl relative h-8 overflow-hidden flex items-center justify-center w-16"
              style={{ color: 'var(--fg)' }} {...cursor}>
              <span className="absolute transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full opacity-100 group-hover:opacity-0">
                VJ<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
              <span className="absolute transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                Vijay<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
            </motion.a>
          </MagneticWrapper>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <NavLink key={link} href={`#${link.toLowerCase()}`}>{link}</NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <MagneticWrapper>
              <button onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }} {...cursor}>
                <AnimatePresence mode="wait">
                  <motion.span key={theme}
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </motion.span>
                </AnimatePresence>
              </button>
            </MagneticWrapper>

            {/* Hamburger */}
            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                className="w-6 h-px block" style={{ background: 'var(--fg)' }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
                className="w-6 h-px block" style={{ background: 'var(--fg)' }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                className="w-6 h-px block" style={{ background: 'var(--fg)' }} />
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[850] flex flex-col items-center justify-center gap-10"
            style={{ background: 'var(--bg-2)' }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-display text-5xl font-bold"
                style={{ color: 'var(--fg)' }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: string }) {
  const cursor = useCursorHover()
  return (
    <a href={href} className="relative group font-body text-sm tracking-wide font-medium"
      style={{ color: 'var(--fg-2)' }} {...cursor}>
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
        style={{ background: 'var(--accent)' }} />
    </a>
  )
}
