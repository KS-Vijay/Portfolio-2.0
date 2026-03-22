// Clip-path word-by-word reveal (the mrpops.ua cinematic effect)
import { motion } from 'framer-motion'

interface Props {
  children: string
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export default function RevealText({ children, delay = 0, className, style }: Props) {
  const words = children.split(' ')

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              delay: delay + i * 0.08,
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}
