import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell() {
  return (
    <div className="relative min-h-screen text-slate-100">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cyan-400/10 to-transparent blur-3xl" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1680px] flex-col gap-4 p-4 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:p-5">
        <Sidebar />
        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <TopBar />
          <main className="min-h-0 flex-1 rounded-[32px] border border-white/10 bg-slate-950/40 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}