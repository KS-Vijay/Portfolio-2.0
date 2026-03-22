import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from 'emailjs-com'
import { Icon } from '@iconify/react'
import { useCursorHover } from '@/hooks/useCursorHover'
import StickmanFight from '@/components/ui/StickmanFight'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ambientY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  
  const cursorOpts = useCursorHover('hover')

  const copyEmail = () => {
    navigator.clipboard.writeText('vijayks@example.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const onSubmit = async (data: any) => {
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY')
    setSent(true)
  }

  const socials = [
    { name: 'GitHub',   href: 'https://github.com/KS-Vijay', icon: 'mdi:github' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/vijay', icon: 'mdi:linkedin' },
    { name: 'Instagram',  href: 'https://instagram.com/vijay', icon: 'mdi:instagram' }
  ]

  return (
    <section id="contact" ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-40 px-6">
      <StickmanFight />
      {/* Background is deliberately removed so the Stickman Fight animation can run behind it */}
      
      {/* Ambient giant text */}
      <motion.div style={{ y: ambientY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-display text-[18vw] font-bold whitespace-nowrap"
          style={{ color: 'var(--fg)', opacity: 0.03 }}>
          Let's Talk
        </span>
      </motion.div>

      <div className="relative z-10 text-center max-w-3xl">

        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          className="font-mono text-xs tracking-widest mb-8 block" style={{ color: 'var(--accent)' }}>
          07 / CONTACT
        </motion.span>

        <div className="overflow-hidden mb-2">
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-bold text-[5vw] leading-tight" style={{ color: 'var(--fg)' }}>
            Have a project in mind?
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="font-display font-bold italic text-[5vw]" style={{ color: 'var(--accent)' }}>
            Let's build it.
          </motion.h2>
        </div>

        {/* Big email button */}
        <motion.button onClick={copyEmail}
          {...cursorOpts}
          initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          className="group px-12 py-6 border-2 font-display text-xl md:text-2xl font-bold mb-16 transition-all duration-300 relative z-20"
          style={{
            borderColor: 'var(--accent)', color: 'var(--fg)', borderRadius: '2px',
            background: copied ? 'var(--accent)' : 'transparent',
          }}>
          <span style={{ color: copied ? 'var(--bg)' : 'var(--fg)' }}>
            {copied ? 'Copied ✓' : 'vijayks@example.com'}
          </span>
        </motion.button>

        {/* Socials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-20">
          {socials.map(({ name, href, icon }, i) => (
            <motion.a key={name} href={href} target="_blank"
              {...cursorOpts}
              initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.07, type: 'spring' }}
              whileHover={{ scale: 1.15, rotate: 8 }}
              className="w-12 h-12 border flex items-center justify-center transition-colors relative z-20 hover:bg-white hover:text-black"
              style={{ borderColor: 'var(--border)', borderRadius: '2px', color: 'var(--fg-2)' }}>
              <Icon icon={icon} width={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.form onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-left space-y-8 relative z-20 p-8 border" style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>

          {[
            { name: 'name',    label: 'Name',    type: 'text'  },
            { name: 'email',   label: 'Email',   type: 'email' },
          ].map(({ name, label, type }) => (
            <div key={name} className="relative group">
              <input {...register(name, { required: true })} type={type} placeholder=" "
                className="peer w-full bg-transparent border-b pb-2 pt-4 font-body text-base outline-none transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }} />
              <label className="absolute left-0 top-4 font-body text-sm transition-all
                peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-4
                peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
                style={{ color: 'var(--fg-muted)' }}>
                {label}
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full transition-all duration-300"
                style={{ background: 'var(--accent)' }} />
            </div>
          ))}

          <div className="relative group">
            <textarea {...register('message', { required: true })} rows={4} placeholder=" "
              className="peer w-full bg-transparent border-b pb-2 pt-4 font-body text-base outline-none resize-none transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }} />
            <label className="absolute left-0 top-4 font-body text-sm transition-all
              peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-4
              peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs"
              style={{ color: 'var(--fg-muted)' }}>
              Message
            </label>
            <div className="absolute bottom-0 left-0 w-0 h-px group-focus-within:w-full transition-all duration-300"
              style={{ background: 'var(--accent)' }} />
          </div>

          <button type="submit" disabled={isSubmitting || sent}
            {...cursorOpts}
            className="w-full py-4 font-display font-bold text-base transition-all hover:opacity-90 disabled:opacity-50 mt-4"
            style={{ background: sent ? '#22c55e' : 'var(--accent)', color: 'var(--bg)', borderRadius: '2px' }}>
            {sent ? 'Sent! I\'ll be in touch ✓' : isSubmitting ? 'Sending...' : 'Send Message →'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
