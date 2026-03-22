import { useCallback } from 'react'
import { useStore } from '@/store/useStore'

export function useCursorHover(variant: 'hover' | 'view' | 'text' | 'hidden' = 'hover') {
  const setCursorVariant = useStore(s => s.setCursorVariant)
  const onEnter = useCallback(() => setCursorVariant(variant), [variant])
  const onLeave = useCallback(() => setCursorVariant('default'), [])
  return { onMouseEnter: onEnter, onMouseLeave: onLeave }
}
