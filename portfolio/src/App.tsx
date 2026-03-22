import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './store/useStore'
import Cursor from './components/cursor/Cursor'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/ui/ScrollProgress'
import Loader from './sections/Loader'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Inspiration from './sections/Inspiration'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import Footer from './components/layout/Footer'

export default function App() {
  const { theme, isLoading } = useStore()

  // Apply theme class
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <div className="grain">
      <Cursor />
      <Loader />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>

            <ScrollProgress />
            <Navbar />

            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Inspiration />
              <Certificates />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
