import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'

const severityVariant = {
  Critical: 'critical',
  High: 'critical',
  Medium: 'success',
}

export function AlertItem({ alert }) {
  return (
    <Link
      to={`/incidents/${alert.id}`}
      className="group block rounded-[24px] border border-white/10 bg-slate-950/60 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={severityVariant[alert.severity] ?? 'secondary'}>{alert.severity}</Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {alert.status}
            </span>
          </div>
          <h4 className="mt-3 text-base font-semibold text-slate-50">{alert.violationType}</h4>
          <p className="mt-1 text-sm text-slate-400">Vehicle: {alert.vehicleNumber}</p>
          <p className="mt-1 text-sm text-slate-400">Location: {alert.locationName}</p>
          <p className="mt-1 text-sm text-slate-500">Detected: {alert.detectedLabel}</p>
        </div>
        <div className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition group-hover:border-cyan-400/20 group-hover:text-cyan-200">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}