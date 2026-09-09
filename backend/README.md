# UrbanEye API

Node.js API layer for the UrbanEye AI React dashboard.

## Start

```powershell
cd backend
npm start
```

The server listens on `http://localhost:8000`.

## Endpoints

- `GET /health`
- `GET /violations`
- `POST /violations`
- `GET /stats`

## API-only mode

This service does not load or require model files. It accepts detection results as JSON from your friend's existing AI API and stores them in memory for the current process.

Example `POST /violations` body:

```json
{
  "incident_id": "UEAI-HYD-001",
  "vehicle_number": "TS09AB1234",
  "violation_type": "overspeeding",
  "severity": "High",
  "confidence": 96.4,
  "latitude": 17.4937,
  "longitude": 78.3996,
  "location_name": "Kukatpally Junction",
  "timestamp": "2026-09-09T12:00:00Z"
}
```

## Frontend connection

Create `my-app/.env` with:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Then restart the Vite dev server.

If your friend already hosts these endpoints, use their Cloudflare URL instead of this local Node API:

```env
VITE_API_BASE_URL=https://your-friend-api.example.com
```
