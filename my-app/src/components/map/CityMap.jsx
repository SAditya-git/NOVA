import { useMemo } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
const hyderabadCenter = [17.385, 78.4867]
const severityStyles = {
  Critical: { color: '#ef4444', fillColor: '#ef4444' },
  High: { color: '#ef4444', fillColor: '#ef4444' },
  Medium: { color: '#facc15', fillColor: '#facc15' },
}
export function CityMap({ incidents }) {
  const markers = useMemo(
    () =>
      incidents
        .filter(
          (incident) =>
            Array.isArray(incident.coordinates) &&
            incident.coordinates.length === 2 &&
            incident.coordinates.every((coordinate) => Number.isFinite(coordinate)),
        )
        .map((incident) => ({
          ...incident,
          location: incident.coordinates,
          ...severityStyles[incident.severity],
        })),
    [incidents],
  )
  return (
    <div className="relative overflow-hidden rounded-[28px]">
          <MapContainer center={hyderabadCenter} zoom={11.6} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((incident) => (
              <CircleMarker
                key={incident.id}
                center={incident.location}
                radius={10}
                pathOptions={{
                  color: incident.color,
                  fillColor: incident.fillColor,
                  fillOpacity: 0.45,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="space-y-2 text-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      What happened
                    </p>
                    <p className="font-semibold text-slate-900">{incident.violationType}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Where did it happen
                    </p>
                    <p>{incident.locationName}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      How serious is it
                    </p>
                    <p>{incident.severity}</p>
                    <p className="text-xs text-slate-600">Vehicle {incident.vehicleNumber}</p>
                    <p className="text-xs text-slate-600">Confidence {Number(incident.confidence).toFixed(1)}%</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 shadow-xl backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Yellow pointers = lower-severity alerts
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-200">
                Red pointers = urgent alerts
              </span>
            </div>
            <span className="font-semibold text-cyan-200">{markers.length} active incidents</span>
          </div>
        </div>
  )
}