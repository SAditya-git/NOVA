import { Clock3, MapPinned, ShieldAlert, Siren, Zap, TriangleAlert, Gauge, CarFront } from 'lucide-react'

export const dashboardKpis = [
  {
    label: 'Total Violations Today',
    value: '1,248',
    trend: '+8.2% vs yesterday',
    delta: 'Live city feed',
    icon: TriangleAlert,
    accent: 'text-rose-300',
  },
  {
    label: 'Critical Alerts',
    value: '14',
    trend: '+3 since last hour',
    delta: 'Priority queue',
    icon: ShieldAlert,
    accent: 'text-rose-300',
    trendTone: 'text-rose-200',
  },
  {
    label: 'High-Risk Vehicles Detected',
    value: '8',
    trend: '2 new patterns flagged',
    delta: 'Watchlist active',
    icon: CarFront,
    accent: 'text-amber-300',
    trendTone: 'text-amber-200',
  },
  {
    label: 'Active Monitoring Zones',
    value: '12',
    trend: 'All sectors online',
    delta: 'City coverage',
    icon: MapPinned,
    accent: 'text-emerald-300',
    trendTone: 'text-emerald-200',
  },
]

export const liveCommandAlerts = [
  {
    id: 'UEAI-HYD-2026-009',
    severity: 'Critical',
    violationType: 'Signal Jumping',
    vehicleNumber: 'TS09AB1234',
    locationName: 'Kukatpally Junction',
    detectedLabel: '2 minutes ago',
    timestamp: '2026-09-03T11:20:00+05:30',
    status: 'NEW',
  },
  {
    id: 'UEAI-HYD-2026-010',
    severity: 'High',
    violationType: 'Overspeeding',
    vehicleNumber: 'TS05MN7791',
    locationName: 'Gachibowli Flyover',
    detectedLabel: '6 minutes ago',
    timestamp: '2026-09-03T11:16:00+05:30',
    status: 'ACKNOWLEDGED',
  },
  {
    id: 'UEAI-HYD-2026-011',
    severity: 'Medium',
    violationType: 'Rash Driving',
    vehicleNumber: 'TS12QW5520',
    locationName: 'Habsiguda Metro Station',
    detectedLabel: '9 minutes ago',
    timestamp: '2026-09-03T11:13:00+05:30',
    status: 'NEW',
  },
  {
    id: 'UEAI-HYD-2026-012',
    severity: 'Critical',
    violationType: 'High-Risk Vehicle Alert',
    vehicleNumber: 'TS07ZX9912',
    locationName: 'Charminar Circle',
    detectedLabel: '12 minutes ago',
    timestamp: '2026-09-03T11:10:00+05:30',
    status: 'ESCALATED',
  },
]

export const commandCenterMapPoints = [
  {
    id: 'UEAI-HYD-2026-009',
    violationType: 'Signal Jumping',
    severity: 'Critical',
    vehicleNumber: 'TS09AB1234',
    locationName: 'Kukatpally Junction',
    coordinates: [17.4937, 78.3996],
    confidence: 98.4,
    detectedLabel: '2 minutes ago',
    status: 'NEW',
  },
  {
    id: 'UEAI-HYD-2026-010',
    violationType: 'Overspeeding',
    severity: 'High',
    vehicleNumber: 'TS05MN7791',
    locationName: 'Gachibowli Flyover',
    coordinates: [17.4454, 78.3513],
    confidence: 95.6,
    detectedLabel: '6 minutes ago',
    status: 'ACKNOWLEDGED',
  },
  {
    id: 'UEAI-HYD-2026-011',
    violationType: 'Rash Driving',
    severity: 'Medium',
    vehicleNumber: 'TS12QW5520',
    locationName: 'Habsiguda Metro Station',
    coordinates: [17.4045, 78.5409],
    confidence: 91.2,
    detectedLabel: '9 minutes ago',
    status: 'NEW',
  },
  {
    id: 'UEAI-HYD-2026-012',
    violationType: 'High-Risk Vehicle Alert',
    severity: 'Critical',
    vehicleNumber: 'TS07ZX9912',
    locationName: 'Charminar Circle',
    coordinates: [17.3616, 78.4747],
    confidence: 97.9,
    detectedLabel: '12 minutes ago',
    status: 'ESCALATED',
  },
]

export const commandCenterTrend = [
  { time: '08:00', violations: 84 },
  { time: '09:00', violations: 102 },
  { time: '10:00', violations: 126 },
  { time: '11:00', violations: 141 },
  { time: '12:00', violations: 158 },
  { time: '13:00', violations: 149 },
  { time: '14:00', violations: 168 },
]

export const commandCenterDistribution = [
  { name: 'Signal Jumping', value: 42 },
  { name: 'Overspeeding', value: 37 },
  { name: 'Rash Driving', value: 21 },
]

export const topViolationZones = [
  { name: 'Kukatpally Junction', count: 128, trend: '+14 today' },
  { name: 'Gachibowli Flyover', count: 117, trend: '+9 today' },
  { name: 'Hitech City Circle', count: 103, trend: '+7 today' },
  { name: 'Charminar Approach', count: 96, trend: '+6 today' },
  { name: 'LB Nagar Corridor', count: 91, trend: '+5 today' },
]