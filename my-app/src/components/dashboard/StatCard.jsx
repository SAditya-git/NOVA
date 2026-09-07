import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'

export function StatCard({
  label,
  value,
  hint,
  delta,
  accent = 'text-cyan-300',
  icon: Icon,
  trend,
  trendTone = 'text-emerald-300',
}) {
  return (
    <Card className="group border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.05]">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            {Icon ? (
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 text-cyan-300 shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition group-hover:border-cyan-400/20">
                <Icon className="h-4 w-4" />
              </span>
            ) : null}
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
              {label}
            </p>
          </div>
          <p className={`mt-3 text-3xl font-semibold tracking-tight ${accent}`}>{value}</p>
          <p className="mt-2 text-sm text-slate-400">{hint}</p>
          {trend ? <p className={`mt-3 text-xs font-semibold uppercase tracking-[0.26em] ${trendTone}`}>{trend}</p> : null}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300">
          <ArrowUpRight className="h-4 w-4" />
          <p className="mt-6 text-xs text-slate-500">{delta}</p>
        </div>
      </CardContent>
    </Card>
  )
}