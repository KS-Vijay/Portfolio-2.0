import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCursorHover } from '@/hooks/useCursorHover'

const certs = [
  { title: "Introduction to Internet of Things", issuer: "NPTEL", date: "Oct’ 25", link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs147/Course/NPTEL25CS147S105870126810597999.pdf" },
  { title: "Hardware & Operating Systems", issuer: "IBM Coursera", date: "Sept’ 24", link: "https://www.coursera.org/account/accomplishments/verify/WVA87WEODWRU" },
  { title: "Digital Systems: Logic to Processors", issuer: "UAB Coursera", date: "Sept’ 24", link: "https://www.coursera.org/account/accomplishments/verify/YADAX2CCCF3N" }
]

export default function Certificates() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const cursor = useCursorHover('hover')

  return (
    <section id="certificates" ref={ref} className="py-32 border-t relative z-10" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
      <div className="px-6 md:px-20 max-w-7xl mx-auto">
        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-xs tracking-widest mb-4 block" style={{ color: 'var(--accent)' }}>
          06 / CREDENTIALS
        </motion.span>
        <div className="overflow-hidden mb-16">
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-bold text-4xl md:text-[5vw] leading-tight" style={{ color: 'var(--fg)' }}>
            Certified Knowledge
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
             <motion.a 
               key={i} href={cert.link} target="_blank" rel="noreferrer"
               initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
               {...cursor}
               className="group p-10 border rounded-sm flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
               style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
             >
               <div>
                 <span className="font-mono text-xs tracking-widest mb-6 block transition-colors group-hover:text-[var(--accent)]" style={{ color: 'var(--fg-muted)' }}>
                   {cert.date}
                 </span>
                 <h3 className="font-display text-2xl font-bold mb-4 leading-snug" style={{ color: 'var(--fg)' }}>
                   {cert.title}
                 </h3>
               </div>
               
               <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                 <span className="font-body text-sm font-bold" style={{ color: 'var(--fg-2)' }}>{cert.issuer}</span>
                 <span className="text-xl transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" style={{ color: 'var(--accent)' }}>↗</span>
               </div>
             </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
