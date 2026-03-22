import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useStore } from '@/store/useStore'

const projects = [
  {
    number: '01', title: 'Reservice', year: '2024',
    description: 'Full-stack service reservation platform connecting users with verified technicians. Real-time booking, live service tracking, and verified professional profiles.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    image: '/projects/reservice.png',
    live: 'https://your-live-link.com',
    github: 'https://github.com/yourusername/reservice',
    color: '#c8ff00',
  },
  {
    number: '02', title: 'Telemedicine', year: '2024',
    description: 'Healthcare platform for seamless patient-doctor interactions. Video consultations, digital prescriptions, and appointment scheduling.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'WebRTC'],
    image: '/projects/telemedicine.png',
    live: 'https://your-live-link.com',
    github: 'https://github.com/yourusername/telemedicine',
    color: '#ff6b35',
  },
  {
    number: '03', title: 'Doodle Dash', year: '2023',
    description: 'Real-time multiplayer drawing & guessing game. Canvas synchronization, chat, lobbies, and leaderboards built for competitive fun.',
    tags: ['React', 'Socket.io', 'Canvas API', 'Node.js'],
    image: '/projects/doodledash.png',
    live: null,
    github: 'https://github.com/yourusername/doodle-dash',
    color: '#a78bfa',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20" style={{ background: 'var(--bg)' }}>
      <div className="px-6 md:px-20 max-w-7xl mx-auto mb-20">
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          04 / PROJECTS
        </span>
        <h2 className="font-display font-bold text-[5vw] mt-4" style={{ color: 'var(--fg)' }}>
          Selected Work
        </h2>
      </div>

      {projects.map((project, i) => (
        <ProjectRow key={project.number} project={project} index={i} />
      ))}
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
      <div className="flex-1 relative">
        {/* Background number */}
        <span className="absolute -top-8 -left-4 font-display text-[10rem] font-bold leading-none select-none"
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

          <h3 className="font-display text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--fg)' }}>
            {project.title}
          </h3>

          <p className="font-body text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--fg-2)' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 border font-mono text-xs"
                style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)', borderRadius: '2px' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {project.live && (
              <a href={project.live} target="_blank"
                className="px-6 py-3 font-body text-sm font-medium transition-all hover:opacity-80"
                style={{ background: project.color, color: '#0a0a0a', borderRadius: '2px' }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}>
                Live Demo ↗
              </a>
            )}
            <a href={project.github} target="_blank"
              className="px-6 py-3 border font-body text-sm transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)', borderRadius: '2px' }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}>
              GitHub →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Image side — 3D tilt */}
      <motion.div className="flex-1 relative"
        initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}>

        <motion.div
          onMouseMove={handleMouseMove}
          style={{ rotateX: tilt.y, rotateY: tilt.x, perspective: 800, borderColor: 'var(--border)' }}
          animate={{ rotateX: tilt.y, rotateY: tilt.x }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative overflow-hidden group rounded-sm border cursor-none"
          onMouseEnter={() => setCursorVariant('view')}
          onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setCursorVariant('default'); }}>

          <motion.img src={project.image} alt={project.title}
            style={{ y: imgY }}
            className="w-full object-cover aspect-[16/10] transition-transform duration-700 group-hover:scale-105" />

          {/* Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: `color-mix(in srgb, ${project.color} 15%, transparent)` }} />
        </motion.div>
      </motion.div>
    </div>
  )
}
