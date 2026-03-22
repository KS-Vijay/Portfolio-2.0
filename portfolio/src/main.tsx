import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from '@studio-freight/lenis'
import App from './App'
import './index.css'

// Init Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Expose for GSAP ScrollTrigger sync
;(window as any).__lenis = lenis

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
