import MagneticWrapper from '@/components/ui/MagneticWrapper'
import { useCursorHover } from '@/hooks/useCursorHover'

export default function Footer() {
  const cursor = useCursorHover('hover')
  return (
    <footer className="py-10 border-t flex flex-col items-center justify-center gap-4 relative z-10" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <MagneticWrapper>
        <a href="#hero" {...cursor} className="font-display text-xl font-bold tracking-tight inline-block" style={{ color: 'var(--fg)' }}>
          Vijay<span style={{ color: 'var(--accent)' }}>.</span>
        </a>
      </MagneticWrapper>
      <div className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>
        © {new Date().getFullYear()} All rights reserved. Crafted with intent.
      </div>
    </footer>
  )
}
