import { createFileRoute } from '@tanstack/react-router'

import CollectorForm from '@/components/collector-form'
import ParticleBackground from '@/components/particle-background'

export const Route = createFileRoute('/collector/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-500 to-zinc-900 z-0" />

      <ParticleBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <CollectorForm />
      </div>
    </main>
  )
}
