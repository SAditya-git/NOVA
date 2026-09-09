import { Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { Badge } from '../ui/Badge'
import { Input } from '../ui/Input'

export function TopBar() {
  const { searchTerm, setSearchTerm, cityLabel } = useAppContext()
  const location = useLocation()
  const showSearch = location.pathname === '/incidents'

  return (
    <header className="glass-panel flex flex-col gap-4 rounded-[32px] border border-white/10 px-5 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)] lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <Badge variant="outline" className="w-fit">
          Smart City Command Center
        </Badge>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 lg:text-3xl">
            {cityLabel}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            City-wide traffic intelligence without vehicle fleet administration.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-3 lg:w-auto">
        {showSearch ? (
          <div className="relative w-full lg:w-[340px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search incidents, vehicles, locations"
              className="pl-10"
            />
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 text-slate-200 transition hover:bg-white/[0.06]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-400 ring-2 ring-slate-950" />
          </button>
        </div>
      </div>
    </header>
  )
}