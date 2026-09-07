import { incidents } from './incidents'

const totalsByViolation = incidents.reduce((accumulator, incident) => {
  accumulator[incident.violationType] = (accumulator[incident.violationType] ?? 0) + 1
  return accumulator
}, {})

const totalsBySeverity = incidents.reduce((accumulator, incident) => {
  accumulator[incident.severity] = (accumulator[incident.severity] ?? 0) + 1
  return accumulator
}, {})

export const dashboardSummary = {
  totalIncidents: incidents.length,
  criticalAlerts: incidents.filter((incident) => incident.severity === 'Critical').length,
  averageConfidence: Math.round(
    incidents.reduce((sum, incident) => sum + incident.confidence, 0) / incidents.length,
  ),
  hotspots: 5,
  cityCoverage: '112 active sensing corridors',
}

export const violationBreakdown = Object.entries(totalsByViolation).map(
  ([name, count]) => ({ name, count }),
)

export const severityBreakdown = [
  { name: 'Critical', value: totalsBySeverity.Critical ?? 0 },
  { name: 'High', value: totalsBySeverity.High ?? 0 },
  { name: 'Medium', value: totalsBySeverity.Medium ?? 0 },
]

export const hourlyTrend = [
  { hour: '06:00', incidents: 2, confidence: 91 },
  { hour: '08:00', incidents: 5, confidence: 93 },
  { hour: '10:00', incidents: 8, confidence: 95 },
  { hour: '12:00', incidents: 6, confidence: 94 },
  { hour: '14:00', incidents: 7, confidence: 92 },
  { hour: '16:00', incidents: 9, confidence: 96 },
]

export const hotspotCorridors = [
  { name: 'Hitech City', incidents: 14, severity: 'Critical' },
  { name: 'Madhapur', incidents: 11, severity: 'High' },
  { name: 'Kukatpally', incidents: 9, severity: 'High' },
  { name: 'LB Nagar', incidents: 8, severity: 'Medium' },
  { name: 'Secunderabad', incidents: 7, severity: 'Medium' },
]

export const confidenceBands = [
  { label: '95-100', value: 3 },
  { label: '90-94', value: 5 },
  { label: '85-89', value: 0 },
]