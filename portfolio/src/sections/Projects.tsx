import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'

const projects = [
  {
    number: '01', title: 'AI Grievance Redressal Platform', year: '2024',
    description: 'A smart, end-to-end complaint management system that uses Machine Learning and NLP to automate the classification, prioritization, and response generation of customer grievances. Designed to help startups resolve complaints faster.',
    tags: ['Python', 'Scikit-learn', 'Torch & CUDA', 'React'],
    images: ['/images/aig1.webp', '/images/aig2.webp', '/images/aig3.webp', '/images/aig4.webp', '/images/aig5.webp', '/images/aig6.webp'],
    live: '#',
    github: '#',
    color: '#c8ff00',
  },
  {
    number: '02', title: 'Ethical AI Governance Toolkit', year: '2024',
    description: 'A modular, open-source toolkit auditing AI models and datasets for ethical compliance. It detects bias, checks for unauthorized training data, and validates transparent training.',
    tags: ['Python', 'React', 'Tailwindcss', 'FastAPI'],
    images: ['/images/eai1.webp', '/images/eai2.webp', '/images/eai3.webp', '/images/eai4.webp', '/images/eai5.webp', '/images/eai6.webp', '/images/eai7.webp'],
    live: '#',
    github: '#',
    color: '#ff6b35',
  },
  {
    number: '03', title: 'Loading...', year: 'TBD',
    description: 'Will update later. Stay tuned for more cutting-edge AI and machine learning builds.',
    tags: ['Secret'],
    images: ['/noise.png'],
    live: null,
    github: null,
    color: '#a78bfa',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="px-6 md:px-20 max-w-7xl mx-auto mb-20">
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          04 / PROJECTS
        </span>
        <h2 className="font-display font-bold text-[5vw] mt-4 mb-20" style={{ color: 'var(--fg)' }}>
          Selected Work
        </h2>
      </div>

      <div className="flex flex-col gap-2 relative">
        {projects.map((project, i) => (
          <ProjectRow key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const isEven = index % 2 === 0
  const setCursorVariant = useStore((s: any) => s.setCursorVariant)

  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    if (project.images.length <= 1) return
    const interval = setInterval(() => {
      setImgIndex(i => (i + 1) % project.images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [project.images])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width  - 0.5) * 12
    const y = ((e.clientY - top)  / height - 0.5) * -12
    setTilt({ x, y })
  }

  return (
    <div ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} 
        items-center gap-12 py-24 px-6 md:px-20 border-t`}
      style={{ borderColor: 'var(--border)' }}>

      {/* Text side */}
      <div className="flex-1 relative z-10">
        <span className="absolute -top-12 -left-4 font-display text-[10rem] font-bold leading-none select-none pointer-events-none"
          style={{ color: 'var(--border)', opacity: 0.6 }}>
          {project.number}
        </span>

        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative">

          <span className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--fg-muted)' }}>
            {project.year}
          </span>

          <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--fg)' }}>
            {project.title}
          </h3>

          <p className="font-body text-sm md:text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--fg-2)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 border font-mono text-[10px] md:text-xs tracking-wide"
                style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)', borderRadius: '2px' }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image side — 3D tilt & Carousel */}
      <motion.div className="flex-1 relative w-full"
        initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}>

        <motion.div
          onMouseMove={handleMouseMove}
          style={{ rotateX: tilt.y, rotateY: tilt.x, perspective: 1000, borderColor: 'var(--border)' }}
          animate={{ rotateX: tilt.y, rotateY: tilt.x }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="relative overflow-hidden group rounded-sm border cursor-none bg-black w-full aspect-[16/10]"
          onMouseEnter={() => setCursorVariant('view')}
          onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setCursorVariant('default'); }}>

          <AnimatePresence mode="popLayout">
            <motion.img 
              key={imgIndex}
              src={project.images[imgIndex]} alt={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y: imgY }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" />
          </AnimatePresence>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none"
            style={{ background: `color-mix(in srgb, ${project.color} 10%, transparent)` }} />
        </motion.div>
      </motion.div>
    </div>
  )
}
