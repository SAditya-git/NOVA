import { useEffect, useState } from 'react'
import { getAnalytics } from '../services/api'
import { SectionHeader } from '../components/dashboard/SectionHeader'
import { StatCard } from '../components/dashboard/StatCard'
import { ViolationTrendChart } from '../components/analytics/ViolationTrendChart'
import { SeverityDistributionChart } from '../components/analytics/SeverityDistributionChart'

export function TrafficAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    getAnalytics().then(setAnalytics)
  }, [])

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Traffic Analytics"
        title="City intelligence analytics"
        description="A high-level analytics surface for authority review, focusing on aggregate trends, severity mix, and corridor-level concentration."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Violation categories" value={analytics?.violationBreakdown.length ?? '—'} hint="Detected issue types in the current sample" delta="All city wide" />
        <StatCard label="Hotspot corridors" value={analytics?.hotspotCorridors.length ?? '—'} hint="Repeated concentration zones" delta="Enforcement ready" accent="text-amber-300" />
        <StatCard label="Confidence bands" value={analytics?.confidenceBands.length ?? '—'} hint="Grouped model certainty windows" delta="Model observable" accent="text-emerald-300" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ViolationTrendChart data={analytics?.hourlyTrend ?? []} />
        <SeverityDistributionChart data={analytics?.severityBreakdown ?? []} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <h3 className="text-lg font-semibold text-slate-50">Hotspot corridors</h3>
          <div className="mt-4 space-y-3">
            {(analytics?.hotspotCorridors ?? []).map((corridor) => (
              <div key={corridor.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium text-slate-100">{corridor.name}</p>
                  <p className="mt-1 text-slate-500">{corridor.severity} intensity</p>
                </div>
                <p className="text-cyan-200">{corridor.incidents} incidents</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <h3 className="text-lg font-semibold text-slate-50">City intelligence notes</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
            <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              Analytics remain city-wide and aggregated. The platform avoids any bus tracking, route visibility, or vehicle fleet controls.
            </p>
            <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              Recharts is used for operational trends while the map page handles GIS context through OpenStreetMap tiles.
            </p>
            <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              The dashboard shell is ready for real APIs later, with mock services isolated inside the services layer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}