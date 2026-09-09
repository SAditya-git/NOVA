import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent } from '../ui/Card'

export function ViolationTrendChart({ data, dataKey = 'incidents', seriesLabel = 'Incidents', xAxisKey = 'hour' }) {
  return (
    <Card className="border-white/10 bg-white/[0.03]">
      <CardContent className="p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">Violation trend</h3>
          <p className="mt-1 text-sm text-slate-400">Aggregated detection cadence for the city desk.</p>
        </div>
        <div className="mt-5 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
              <XAxis dataKey={xAxisKey} stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(2, 6, 23, 0.96)',
                  border: '1px solid rgba(148, 163, 184, 0.12)',
                  borderRadius: '16px',
                  color: '#f8fafc',
                }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#incidentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-500">{seriesLabel}</p>
      </CardContent>
    </Card>
  )
}