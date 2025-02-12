import { create } from 'zustand';

import { devtools, persist } from 'zustand/middleware';

type Theme = {
  theme: string;
  toggleTheme: () => void
  getTheme: () => string
}
export const useThemeStore = create<Theme>()(
  devtools(
    persist(
      (set, get) => ({
        theme: '',
        toggleTheme: () => set((state) => ({
          theme: state.theme == 'dark' ? '' : 'dark'
        })),
        getTheme: () => get().theme
      }),

      { name: 'themePatientStore' }
    )
  )
)
