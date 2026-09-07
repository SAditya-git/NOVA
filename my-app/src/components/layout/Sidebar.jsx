import { LayoutDashboard, MapPinned, Siren, BarChart3, CircleAlert } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Badge } from '../ui/Badge'

const navigation = [
  { to: '/', label: 'Command Center', icon: LayoutDashboard },
  { to: '/map', label: 'Live GIS Intelligence', icon: MapPinned },
  { to: '/incidents', label: 'Incidents & Alerts', icon: CircleAlert },
  { to: '/analytics', label: 'Traffic Analytics', icon: BarChart3 },
]

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col rounded-[32px] border border-white/10 bg-slate-950/75 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/20">
          <Siren className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-200/80">
            UrbanEye AI
          </p>
          <p className="mt-1 text-sm text-slate-400">City intelligence command stack</p>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100 shadow-[0_10px_26px_rgba(34,211,238,0.08)]'
                    : 'border-transparent bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-slate-50',
                ].join(' ')
              }
            >
              <Icon className="h-4 w-4 shrink-0 text-cyan-300/90" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-6 rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 via-slate-950/60 to-slate-950 p-4">
        <Badge variant="success" className="mb-3 w-fit">
          Command feed online
        </Badge>
        <p className="text-sm leading-6 text-slate-300">
          Aggregated detections are being normalized into the Hyderabad authority view.
        </p>
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-[28px] border border-emerald-400/15 bg-emerald-400/[0.08] px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="status-pulse h-3 w-3 rounded-full bg-emerald-400" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald-200/90">
                SYSTEM LIVE
              </p>
              <p className="mt-1 text-sm text-slate-400">Real-time urban intelligence active</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}