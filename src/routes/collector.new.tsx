import { createFileRoute } from '@tanstack/react-router'

import { NewCollectorForm } from '@/components/collector-form'
import ParticleBackground from '@/components/particle-background'

export const Route = createFileRoute('/collector/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-700 to-zinc-900">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen pt-32 md:pt-24 pb-8">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-center items-start min-h-full">
            <div className="w-full max-w-3xl">
              <NewCollectorForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
