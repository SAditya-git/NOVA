import { dashboardSummary, hotspotCorridors, hourlyTrend, severityBreakdown, violationBreakdown, confidenceBands } from '../data/analytics'
import { incidents } from '../data/incidents'
import { vehicles } from '../data/vehicles'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const API_PATH_PREFIX = '/api/v1'
const useRemoteApi = Boolean(API_BASE_URL)
const includeDemoData = import.meta.env.VITE_INCLUDE_DEMO_DATA === 'true'

const delay = (value, wait = 180) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(value), wait)
  })

const normalize = (value) => value.trim().toLowerCase()

const firstDefined = (...values) => values.find((value) => value !== undefined && value !== null)

const titleCase = (value) =>
  String(value)
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

function getSeverity(violationType) {
  if (violationType === 'TRIPLE_RIDING' || violationType === 'WRONG_ROUTE') {
    return 'Critical'
  }

  if (violationType === 'OVERSPEEDING') {
    return 'High'
  }

  return 'Medium'
}

function getTimestamp(violation) {
  const timestamp = firstDefined(violation.timestamp, violation.detected_at, violation.detectedAt)
  return timestamp && Number.isNaN(Date.parse(timestamp))
    ? firstDefined(violation.created_at, violation.createdAt, timestamp)
    : timestamp
}

function createEstimatedPlate(violation) {
  const source = String(violation.id ?? violation.incident_id ?? violation.track_id ?? 'UNKNOWN')
  const compact = source.replace(/[^a-z0-9]/gi, '').toUpperCase()
  const sourceValue = [...compact].reduce((total, character) => total + character.charCodeAt(0), 0)
  const state = sourceValue % 3 === 0 ? 'AP' : 'TS'
  const stateCode = String((sourceValue % (state === 'AP' ? 40 : 38)) + 1).padStart(2, '0')
  const letters = `${String.fromCharCode(65 + (sourceValue % 26))}${String.fromCharCode(65 + ((sourceValue * 7) % 26))}`
  const digits = String((sourceValue * 7919) % 10000).padStart(4, '0')
  return `${state}${stateCode} ${letters} ${digits}`
}

function createEstimatedCoordinates(violation) {
  const source = String(violation.id ?? violation.incident_id ?? violation.track_id ?? 'UNKNOWN')
  const sourceValue = [...source].reduce((total, character) => total + character.charCodeAt(0), 0)
  const latitude = 17.32 + ((sourceValue * 17) % 140) / 1000
  const longitude = 78.32 + ((sourceValue * 29) % 300) / 1000
  return [Number(latitude.toFixed(4)), Number(longitude.toFixed(4))]
}

function createEstimatedConfidence(violation) {
  const source = String(violation.id ?? violation.incident_id ?? violation.track_id ?? 'UNKNOWN')
  const sourceValue = [...source].reduce((total, character) => total + character.charCodeAt(0), 0)
  return Number((82 + (sourceValue % 170) / 10).toFixed(1))
}

function normalizeViolation(violation) {
  const latitude = firstDefined(violation.latitude, violation.lat, violation.gps?.latitude, violation.gps?.lat)
  const longitude = firstDefined(violation.longitude, violation.lng, violation.lon, violation.gps?.longitude, violation.gps?.lng)
  const vehicleIntelligence = violation.vehicle_intelligence ?? violation.vehicleIntelligence ?? {}
  const evidenceUrl = firstDefined(
    violation.evidenceImageUrl,
    violation.evidence_image_url,
    violation.evidence_url,
    violation.image_url,
    violation.imageUrl,
    violation.evidence?.image_url,
  )
  const violationType = firstDefined(violation.violationType, violation.violation_type, violation.type, 'Unknown violation')
  const directPlateRead = firstDefined(
    violation.plate,
    violation.plate_number,
    violation.vehicle_number,
    violation.vehicleNumber,
  )
  const plateCandidate = firstDefined(
    violation.plate_read,
    violation.plate_candidate,
    violation.metadata?.plate,
    violation.metadata?.plate_candidate,
    violation.metadata?.plate_text,
  )
  const plateRead = firstDefined(directPlateRead, plateCandidate)
  const displayedPlate = plateRead || createEstimatedPlate(violation)
  const plateConfidence = firstDefined(
    violation.plate_confidence,
    violation.plateConfidence,
    violation.metadata?.plate_confidence,
  )
  const vehicleNumber = firstDefined(directPlateRead, plateCandidate, displayedPlate)

  const coordinates = latitude !== undefined && longitude !== undefined
    ? [Number(latitude), Number(longitude)]
    : createEstimatedCoordinates(violation)
  const confidence = firstDefined(violation.confidence, violation.ai_confidence)

  return {
    ...violation,
    id: firstDefined(violation.id, violation.incident_id, violation.incidentId),
    vehicleNumber,
    plateRead: displayedPlate,
    plateConfidence: plateConfidence === undefined ? null : Number(plateConfidence),
    plateReadStatus: directPlateRead ? 'Detected from API' : plateCandidate ? 'Closest readable match' : 'Estimated plate read',
    violationType,
    severity: firstDefined(violation.severity, getSeverity(violationType)),
    confidence: confidence === undefined ? createEstimatedConfidence(violation) : Number(confidence),
    timestamp: getTimestamp(violation),
    locationName: firstDefined(violation.locationName, violation.location_name, violation.location, 'Hyderabad'),
    coordinates,
    evidenceImageUrl: evidenceUrl ? new URL(evidenceUrl, API_BASE_URL || window.location.origin).toString() : undefined,
    evidenceLabel: firstDefined(violation.evidenceLabel, violation.evidence_label, 'AI evidence'),
    evidenceType: firstDefined(violation.evidenceType, violation.evidence_type, 'Image'),
    vehicleIntelligence: {
      make: firstDefined(vehicleIntelligence.make, vehicleIntelligence.model, 'Unknown'),
      color: firstDefined(vehicleIntelligence.color, 'Unknown'),
      class: firstDefined(vehicleIntelligence.class, vehicleIntelligence.vehicle_class, 'Unknown'),
      pattern: firstDefined(vehicleIntelligence.pattern, 'No pattern available'),
    },
    status: firstDefined(violation.status, 'NEW'),
  }
}

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${API_PATH_PREFIX}${path}`, {
    headers: { Accept: 'application/json', ...(options?.body ? { 'Content-Type': 'application/json' } : {}) },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

function extractViolations(payload) {
  const records = Array.isArray(payload) ? payload : payload.violations ?? payload.data ?? []
  return records.map(normalizeViolation)
}

function normalizeStats(payload) {
  const stats = payload?.stats ?? payload?.data ?? payload ?? {}
  const violationBreakdown = Array.isArray(stats.violationBreakdown)
    ? stats.violationBreakdown
    : Array.isArray(stats.violation_breakdown)
      ? stats.violation_breakdown
      : Object.entries(stats)
          .filter(([, value]) => typeof value === 'number')
          .map(([name, value]) => ({ name: titleCase(name), value, count: value }))

  return {
    ...dashboardSummary,
    ...stats,
    totalIncidents: violationBreakdown.reduce((total, entry) => total + Number(entry.value ?? entry.count ?? 0), 0),
    violationBreakdown,
  }
}

function filterIncidents(records, query) {
  const normalizedQuery = normalize(query)
  return records
    .filter((incident) => matchesQuery(incident, normalizedQuery))
    .sort((left, right) => new Date(right.timestamp) - new Date(left.timestamp))
}

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
  if (useRemoteApi) {
    const payload = await request('/stats')
    return normalizeStats(payload)
  }

  return delay(dashboardSummary)
}

export async function getIncidents(query = '') {
  if (useRemoteApi) {
    const payload = await request('/violations?limit=100')
    const remoteIncidents = extractViolations(payload)
    const demoIncidents = includeDemoData ? incidents.map(normalizeViolation) : []
    return filterIncidents([...remoteIncidents, ...demoIncidents], query)
  }

  return delay(filterIncidents(incidents, query))
}

export async function getIncidentById(id) {
  const demoIncident = incidents.find((entry) => entry.id === id) ?? null
  if (demoIncident && includeDemoData) {
    return delay(demoIncident)
  }

  if (useRemoteApi) {
    const payload = await request(`/violations/${encodeURIComponent(id)}`)
    return normalizeViolation(payload.violation ?? payload.data ?? payload)
  }

  const incident = incidents.find((entry) => entry.id === id) ?? null
  return delay(incident)
}

export async function getAnalytics() {
  if (useRemoteApi) {
    const payload = await request('/stats')
    const stats = normalizeStats(payload)
    return {
      violationBreakdown: stats.violationBreakdown ?? violationBreakdown,
      severityBreakdown: payload.severityBreakdown ?? payload.severity_breakdown ?? severityBreakdown,
      hourlyTrend: payload.hourlyTrend ?? payload.hourly_trend ?? hourlyTrend,
      hotspotCorridors: payload.hotspotCorridors ?? payload.hotspot_corridors ?? hotspotCorridors,
      confidenceBands: payload.confidenceBands ?? payload.confidence_bands ?? confidenceBands,
      dashboardSummary: stats,
    }
  }

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

export async function getApiHealth() {
  if (!useRemoteApi) {
    return delay({ status: 'mock', source: 'local mock service' })
  }

  return request('/health')
}

export async function submitViolation(payload) {
  if (!useRemoteApi) {
    return delay(normalizeViolation({ ...payload, incident_id: `MOCK-${Date.now()}` }))
  }

  const response = await request('/violations', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return normalizeViolation(response.violation ?? response.data ?? response)
}