import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const experiences = [
  {
    year: "Jun’ 25 - Jul’ 25", 
    role: "MERN Stack with GenAI", 
    company: "The Angaar Batch & W3Grads", 
    description: "Built and deployed full-stack web applications using the MERN stack. Integrated Generative AI models into workflows, enhancing automation and reducing manual processing effort by ~40%."
  },
  {
    year: "2023 - Present", 
    role: "BTech CSE - 8 CGPA", 
    company: "Lovely Professional University", 
    description: "Leading AI initiatives and developing machine learning models for autonomous systems. Actively participating in hackathons and exploring advanced tech."
  },
  {
    year: "2022 - 2023", 
    role: "Senior Secondary - 89.4%", 
    company: "KMC Public Sr. Sec. School", 
    description: "Developed a Flight Management Database System using Python and SQL. Honed analytical thinking and core structural logic."
  },
  {
    year: "2020 - 2021", 
    role: "Secondary - 79.6%", 
    company: "KMC Public Sr. Sec. School", 
    description: "Started my journey in Computer Science, discovering a deep-rooted passion for coding and future technologies."
  }
]

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] })
  
  // Line grows from 0% to 100% as you scroll down
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" ref={containerRef} className="py-40 relative z-10 overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div className="px-6 md:px-20 max-w-5xl mx-auto">
        
        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--accent)' }}>
          02.5 / EXPERIENCE
        </motion.span>
        
        <div className="overflow-hidden mb-20">
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-bold text-[5vw]" style={{ color: 'var(--fg)' }}>
            The Journey
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative flex flex-col pl-8 md:pl-0">
          
          {/* Animated Line Marker (Mr Pops Style) */}
          <div className="absolute left-[8px] md:left-[25%] top-4 bottom-10 w-[2px] overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div className="w-full origin-top" style={{ background: 'var(--accent)', height: lineHeight }} />
          </div>

          {experiences.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="py-12 group flex flex-col md:flex-row gap-6 md:gap-24 relative">
              
              {/* Timeline dot */}
              <div className="absolute left-[-29px] md:left-[clamp(24.5%,24.5vw,24.5%)] top-[56px] w-4 h-4 rounded-full border-2 transform -translate-x-1/2 bg-black transition-colors duration-500 group-hover:bg-[#c8ff00]" 
                style={{ borderColor: 'var(--accent)' }} />

              <div className="md:w-1/4 shrink-0 pt-2">
                <span className="font-mono text-sm tracking-wide group-hover:text-[var(--accent)] transition-colors"
                  style={{ color: 'var(--fg-muted)' }}>
                  {exp.year}
                </span>
              </div>
              
              <div className="flex-1 p-8 border rounded-sm transition-all duration-500 group-hover:border-[var(--accent)]" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h3 className="font-display text-2xl font-bold mb-2 transition-colors" style={{ color: 'var(--fg)' }}>
                  {exp.role}
                </h3>
                <h4 className="font-body text-base mb-4 tracking-wide font-medium" style={{ color: 'var(--accent)' }}>
                  {exp.company}
                </h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                  {exp.description}
                </p>
              </div>
              
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
