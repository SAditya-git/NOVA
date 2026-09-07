import { dashboardSummary, hotspotCorridors, hourlyTrend, severityBreakdown, violationBreakdown, confidenceBands } from '../data/analytics'
import { incidents } from '../data/incidents'
import { vehicles } from '../data/vehicles'

const delay = (value, wait = 180) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(value), wait)
  })

const normalize = (value) => value.trim().toLowerCase()

const matchesQuery = (incident, query) => {
  if (!query) {
    return true
  }

  const searchable = [
    incident.id,
    incident.vehicleNumber,
    incident.violationType,
    incident.severity,
    incident.locationName,
    incident.status,
    incident.vehicleIntelligence.make,
    incident.vehicleIntelligence.color,
    incident.vehicleIntelligence.class,
  ]
    .join(' ')
    .toLowerCase()

  return searchable.includes(query)
}

export async function getDashboardSummary() {
  return delay(dashboardSummary)
}

export async function getIncidents(query = '') {
  const normalizedQuery = normalize(query)
  const result = incidents
    .filter((incident) => matchesQuery(incident, normalizedQuery))
    .sort((left, right) => new Date(right.timestamp) - new Date(left.timestamp))

  return delay(result)
}

export async function getIncidentById(id) {
  const incident = incidents.find((entry) => entry.id === id) ?? null
  return delay(incident)
}

export async function getAnalytics() {
  return delay({
    violationBreakdown,
    severityBreakdown,
    hourlyTrend,
    hotspotCorridors,
    confidenceBands,
    dashboardSummary,
  })
}

export async function getVehicles() {
  return delay(vehicles)
}

export async function searchCityIntelligence(query = '') {
  const normalizedQuery = normalize(query)
  const filteredIncidents = incidents.filter((incident) => matchesQuery(incident, normalizedQuery))
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (!normalizedQuery) {
      return true
    }

    const searchable = [
      vehicle.vehicleNumber,
      vehicle.class,
      vehicle.make,
      vehicle.color,
      vehicle.lastSeen,
    ]
      .join(' ')
      .toLowerCase()

    return searchable.includes(normalizedQuery)
  })

  return delay({ incidents: filteredIncidents, vehicles: filteredVehicles })
}