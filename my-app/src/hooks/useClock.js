import { useEffect, useState } from 'react'

function formatDateTime(date) {
  const dateLabel = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)

  const timeLabel = new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)

  return { dateLabel, timeLabel }
}

export function useClock() {
  const [clock, setClock] = useState(() => formatDateTime(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatDateTime(new Date()))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return clock
}