import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AppShell } from './components/layout/AppShell'
import { CommandCenterPage } from './pages/CommandCenterPage'
import { LiveGISPage } from './pages/LiveGISPage'
import { IncidentsPage } from './pages/IncidentsPage'
import { IncidentDetailsPage } from './pages/IncidentDetailsPage'
import { TrafficAnalyticsPage } from './pages/TrafficAnalyticsPage'
import './App.css'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<CommandCenterPage />} />
            <Route path="/map" element={<LiveGISPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/incidents/:id" element={<IncidentDetailsPage />} />
            <Route path="/analytics" element={<TrafficAnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
