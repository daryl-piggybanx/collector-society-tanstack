import { createFileRoute } from '@tanstack/react-router'

import { NewCollectorForm } from '@/components/collector-form'
import ParticleBackground from '@/components/particle-background'

export const Route = createFileRoute('/collector/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="absolute inset-0  overflow-hidden bg-gradient-to-b from-gray-950 via-gray-700 to-zinc-900">

      <ParticleBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 mt-10 md:mt-0">
        <NewCollectorForm />
      </div>
    </main>
  )
}
