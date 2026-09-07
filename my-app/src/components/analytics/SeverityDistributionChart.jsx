import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent } from '../ui/Card'

const palette = ['#f43f5e', '#f59e0b', '#22c55e']

export function SeverityDistributionChart({ data }) {
  return (
    <Card className="border-white/10 bg-white/[0.03]">
      <CardContent className="p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">Severity mix</h3>
          <p className="mt-1 text-sm text-slate-400">Weighted distribution of enforcement attention.</p>
        </div>
        <div className="mt-5 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={78}
                outerRadius={120}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={palette[index % palette.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(2, 6, 23, 0.96)',
                  border: '1px solid rgba(148, 163, 184, 0.12)',
                  borderRadius: '16px',
                  color: '#f8fafc',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}