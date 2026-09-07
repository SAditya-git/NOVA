import { Link } from 'react-router-dom'
import { MapPinned, Siren, TrendingUp } from 'lucide-react'
import { SectionHeader } from '../components/dashboard/SectionHeader'
import { StatCard } from '../components/dashboard/StatCard'
import { AlertItem } from '../components/dashboard/AlertItem'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { CityMap } from '../components/map/CityMap'
import {
  commandCenterMapPoints,
  commandCenterTrend,
  dashboardKpis,
  liveCommandAlerts,
  topViolationZones,
} from '../data/commandCenter'
import { ViolationTrendChart } from '../components/analytics/ViolationTrendChart'

export function CommandCenterPage() {
  const alerts = liveCommandAlerts

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Central Command Center"
        title="Hyderabad Smart City traffic intelligence"
        description="A real-time command center for aggregated traffic violations, GIS alerts, and citywide enforcement intelligence."
      />

      <div className="grid gap-4 xl:grid-cols-4">
        {dashboardKpis.map((item) => (
          <StatCard
            key={item.label}
            label={item.label}
            value={item.value}
            hint={item.hint}
            delta={item.delta}
            icon={item.icon}
            accent={item.accent}
            trend={item.trend}
            trendTone={item.trendTone}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.85fr]">
        <Card className="overflow-hidden border-white/10 bg-white/[0.03]">
          <CardContent className="space-y-4 p-4 lg:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-50">Live GIS intelligence preview</h3>
                <p className="mt-1 text-sm text-slate-400">
                  What happened, where it happened, and how serious it is across Hyderabad.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="critical">Red pointers</Badge>
                <Badge variant="success">Green pointers</Badge>
              </div>
            </div>

            <CityMap incidents={commandCenterMapPoints} />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-400">
                Incident markers are color-coded by urgency and linked to the live GIS map.
              </p>
              <Button asChild>
                <Link to="/map">
                  <MapPinned className="h-4 w-4" />
                  Open Live GIS Map
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-50">Live critical alerts</h3>
                <p className="mt-1 text-sm text-slate-400">Recent priority incidents requiring attention.</p>
              </div>
              <Siren className="h-5 w-5 text-rose-300" />
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <ViolationTrendChart data={commandCenterTrend} dataKey="violations" seriesLabel="Violations" />
        </div>

        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-50">Top violation zones</h3>
                <p className="mt-1 text-sm text-slate-400">Locations with the highest concentration of violations.</p>
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-300" />
            </div>

            <div className="space-y-3">
              {topViolationZones.map((zone, index) => (
                <div key={zone.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 transition hover:border-cyan-400/20 hover:bg-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-slate-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">{zone.name}</p>
                      <p className="text-sm text-slate-500">{zone.trend}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-cyan-200">{zone.count}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">violations</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}