import { Clock3, MapPin, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Card, CardContent } from '../ui/Card'

const severityVariant = {
  Critical: 'critical',
  High: 'warning',
  Medium: 'secondary',
}

export function IncidentCard({ incident }) {
  return (
    <Card className="group h-full border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant={severityVariant[incident.severity] ?? 'secondary'}>{incident.severity}</Badge>
            <h3 className="mt-4 text-lg font-semibold text-slate-50">{incident.vehicleNumber}</h3>
            <p className="mt-1 text-sm text-slate-400">{incident.violationType}</p>
          </div>
          <Link
            to={`/incidents/${incident.id}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-slate-200 transition group-hover:border-cyan-400/20 group-hover:text-cyan-200"
            aria-label={`Open ${incident.id}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="h-4 w-4 text-cyan-300" />
            <span>{incident.locationName}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock3 className="h-4 w-4 text-cyan-300" />
            <span>{new Date(incident.timestamp).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm">
          <span className="text-slate-400">AI confidence</span>
          <span className="font-semibold text-cyan-200">{incident.confidence}%</span>
        </div>
      </CardContent>
    </Card>
  )
}