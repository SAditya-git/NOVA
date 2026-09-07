import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')

  const value = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      notifications: 4,
      cityLabel: 'Hyderabad Urban Traffic Intelligence',
    }),
    [searchTerm],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}