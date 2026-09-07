import { useEffect, useState } from 'react'
import { getIncidents } from '../services/api'
import { SectionHeader } from '../components/dashboard/SectionHeader'
import { StatCard } from '../components/dashboard/StatCard'
import { CityMap } from '../components/map/CityMap'

export function LiveGISPage() {
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    getIncidents().then(setIncidents)
  }, [])

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Live GIS Intelligence"
        title="City sensing map"
        description="A GIS overview of the current Hyderabad incident field. This page uses OpenStreetMap tiles and aggregated incident markers only."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Mapped incidents" value={incidents.length} hint="Active markers plotted on the city view" delta="Live" />
        <StatCard label="Hotspot zones" value="5" hint="Areas with repeated enforcement patterns" delta="Command prioritized" accent="text-amber-300" />
        <StatCard label="Confidence band" value="90%+" hint="Only high-certainty detections bubble up" delta="Model gated" accent="text-emerald-300" />
      </div>

      <CityMap incidents={incidents} />
    </div>
  )
}