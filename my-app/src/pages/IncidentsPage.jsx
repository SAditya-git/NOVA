import { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { getIncidents } from '../services/api'
import { SectionHeader } from '../components/dashboard/SectionHeader'
import { IncidentCard } from '../components/incidents/IncidentCard'

export function IncidentsPage() {
  const { searchTerm } = useAppContext()
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    getIncidents(searchTerm).then(setIncidents)
  }, [searchTerm])

  const headline = useMemo(() => {
    if (!searchTerm) {
      return 'Latest incident queue for the Hyderabad command desk.'
    }

    return `Filtered results for “${searchTerm}” across incidents, locations, and vehicle intelligence.`
  }, [searchTerm])

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Incidents & Alerts"
        title="Operational incident queue"
        description={headline}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  )
}