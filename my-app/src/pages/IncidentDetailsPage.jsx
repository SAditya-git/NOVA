import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Camera, MapPinned, ShieldAlert, Truck, BadgeCheck } from 'lucide-react'
import { getIncidentById } from '../services/api'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export function IncidentDetailsPage() {
  const { id } = useParams()
  const [incident, setIncident] = useState(null)

  useEffect(() => {
    getIncidentById(id).then(setIncident)
  }, [id])

  if (!incident) {
    return (
      <div className="space-y-6">
        <Button asChild variant="secondary">
          <Link to="/incidents">
            <ArrowLeft className="h-4 w-4" /> Back to incidents
          </Link>
        </Button>
        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-8 text-slate-300">
            Incident not found.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button asChild variant="secondary">
          <Link to="/incidents">
            <ArrowLeft className="h-4 w-4" /> Back to incidents
          </Link>
        </Button>
        <Badge variant="success">{incident.status}</Badge>
      </div>

      <Card className="border-white/10 bg-white/[0.03]">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge variant="critical">{incident.severity}</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-slate-50">{incident.id}</h2>
              <p className="mt-2 text-sm text-slate-400">
                {incident.violationType} detected against vehicle {incident.vehicleNumber}.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">AI confidence</p>
              <p className="mt-1 text-3xl font-semibold text-cyan-200">{incident.confidence}%</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/50 p-5">
              <div className="flex items-center gap-3 text-slate-300"><MapPinned className="h-4 w-4 text-cyan-300" /> {incident.locationName}</div>
              <div className="flex items-center gap-3 text-slate-300"><ShieldAlert className="h-4 w-4 text-cyan-300" /> {new Date(incident.timestamp).toLocaleString('en-IN')}</div>
              <div className="flex items-center gap-3 text-slate-300"><Camera className="h-4 w-4 text-cyan-300" /> {incident.evidenceLabel}</div>
              <div className="flex items-center gap-3 text-slate-300"><BadgeCheck className="h-4 w-4 text-cyan-300" /> {incident.vehicleIntelligence.pattern}</div>
            </div>

            <div className="space-y-4 rounded-[28px] border border-white/10 bg-slate-950/50 p-5">
              <div className="flex items-center gap-3 text-slate-300"><Truck className="h-4 w-4 text-cyan-300" /> {incident.vehicleIntelligence.make} · {incident.vehicleIntelligence.color}</div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Vehicle intelligence</p>
                <p className="mt-3">Class: {incident.vehicleIntelligence.class}</p>
                <p className="mt-2">Pattern: {incident.vehicleIntelligence.pattern}</p>
                <p className="mt-2">Evidence type: {incident.evidenceType}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}