import { create } from 'zustand'

interface StoreState {
  theme: 'dark' | 'light'
  setTheme: (t: 'dark' | 'light') => void
  toggleTheme: () => void

  cursorVariant: 'default' | 'hover' | 'hidden' | 'text' | 'view'
  setCursorVariant: (v: StoreState['cursorVariant']) => void

  isLoading: boolean
  setLoading: (v: boolean) => void

  activeSection: string
  setActiveSection: (s: string) => void
}

export const useStore = create<StoreState>((set, get) => ({
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
  setTheme: (t) => {
    localStorage.setItem('theme', t)
    document.documentElement.classList.toggle('light', t === 'light')
    set({ theme: t })
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(next)
  },

  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),

  isLoading: true,
  setLoading: (v) => set({ isLoading: v }),

  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),
}))
