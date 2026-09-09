import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'

const PORT = Number(process.env.PORT ?? 8000)
const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const violations = []

function json(response, statusCode, payload, origin) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  response.end(JSON.stringify(payload))
}

function normalizeViolation(payload) {
  const latitude = payload.latitude ?? payload.lat ?? payload.gps?.latitude ?? payload.gps?.lat ?? null
  const longitude = payload.longitude ?? payload.lng ?? payload.lon ?? payload.gps?.longitude ?? payload.gps?.lng ?? null
  const vehicleIntelligence = payload.vehicle_intelligence ?? payload.vehicleIntelligence ?? null

  return {
    ...payload,
    incident_id: payload.incident_id ?? payload.incidentId ?? `UEAI-${randomUUID().slice(0, 8).toUpperCase()}`,
    vehicle_number: payload.vehicle_number ?? payload.vehicleNumber ?? payload.plate_number ?? null,
    violation_type: payload.violation_type ?? payload.violationType ?? payload.type ?? 'Unknown violation',
    severity: payload.severity ?? 'Medium',
    confidence: Number(payload.confidence ?? payload.ai_confidence ?? 0),
    timestamp: payload.timestamp ?? payload.detected_at ?? new Date().toISOString(),
    latitude: latitude === null ? null : Number(latitude),
    longitude: longitude === null ? null : Number(longitude),
    location_name: payload.location_name ?? payload.locationName ?? payload.location ?? 'Hyderabad',
    vehicle_intelligence: vehicleIntelligence,
    status: payload.status ?? 'NEW',
  }
}

function stats() {
  const byViolationType = {}
  const bySeverity = {}
  const byZone = {}
  const highRiskVehicles = new Set()

  for (const violation of violations) {
    byViolationType[violation.violation_type] = (byViolationType[violation.violation_type] ?? 0) + 1
    bySeverity[violation.severity] = (bySeverity[violation.severity] ?? 0) + 1
    byZone[violation.location_name] = (byZone[violation.location_name] ?? 0) + 1
    if (['Critical', 'High'].includes(violation.severity) && violation.vehicle_number) {
      highRiskVehicles.add(violation.vehicle_number)
    }
  }

  return {
    total_violations: violations.length,
    critical_alerts: bySeverity.Critical ?? 0,
    high_risk_vehicles: highRiskVehicles.size,
    active_monitoring_zones: Object.keys(byZone).length,
    by_violation_type: byViolationType,
    by_severity: bySeverity,
    top_zones: Object.entries(byZone)
      .sort(([, left], [, right]) => right - left)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count })),
  }
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk
      if (body.length > 5_000_000) {
        reject(new Error('Request body is too large'))
        request.destroy()
      }
    })
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Request body must be valid JSON'))
      }
    })
    request.on('error', reject)
  })
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin ?? ''
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    response.end()
    return
  }

  try {
    if (request.method === 'GET' && url.pathname === '/health') {
      json(response, 200, { status: 'healthy', service: 'urbaneye-api', mode: 'api-only' }, origin)
      return
    }

    if (request.method === 'GET' && url.pathname === '/violations') {
      const search = (url.searchParams.get('search') ?? '').toLowerCase()
      const result = violations.filter((violation) => JSON.stringify(violation).toLowerCase().includes(search))
      json(response, 200, result.sort((left, right) => new Date(right.timestamp) - new Date(left.timestamp)), origin)
      return
    }

    if (request.method === 'POST' && url.pathname === '/violations') {
      const payload = await readBody(request)
      const violation = normalizeViolation(payload)
      violations.push(violation)
      json(response, 201, violation, origin)
      return
    }

    if (request.method === 'GET' && url.pathname === '/stats') {
      json(response, 200, stats(), origin)
      return
    }

    json(response, 404, { detail: 'Route not found' }, origin)
  } catch (error) {
    json(response, 400, { detail: error.message }, origin)
  }
})

server.listen(PORT, () => {
  console.log(`UrbanEye API listening on http://localhost:${PORT}`)
  console.log('API-only mode: detection results are accepted as JSON')
})
