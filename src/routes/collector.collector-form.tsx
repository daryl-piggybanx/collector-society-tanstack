import { createFileRoute } from '@tanstack/react-router'

import CollectorForm from '@/components/collector-form'
import ParticleBackground from '@/components/particle-background'

export const Route = createFileRoute('/collector/collector-form')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/80 via-orange-900/60 to-rose-900/80 z-0" />

      <ParticleBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <CollectorForm />
      </div>
    </main>
  )
}
