import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import ParticleBackground from "@/components/particle-background"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-950/80 via-orange-900/60 to-rose-900/80">
      {/* Particle effect background */}
      <ParticleBackground />

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter text-amber-50 sm:text-5xl md:text-6xl lg:text-7xl">
            Into the <br />
            <span className="text-amber-300">PiggyVerse</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-amber-100/90 md:text-xl">
            Your gateway into a collector's club like no other—different from anything that has come before. Don't call them cards, these artworks are handcrafted, often imitated but never replicated.
          </p>

          <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
            <Button size="lg" className="bg-amber-600 text-amber-50 hover:bg-amber-500">
              Drop Site
            </Button>
            <a href="/collector/collector-form">
              <Button
                variant="outline"
                size="lg"
                className="border-amber-400/30 bg-amber-950/30 text-amber-200 backdrop-blur-sm hover:bg-amber-800/40 hover:text-amber-100"
              >
                Collector Form
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll down to explore */}
        {/* <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-sm text-amber-200/70">Scroll down to explore</p>
          <div className="mt-2 animate-bounce text-amber-200/70">↓</div>
        </div> */}
      </div>
    </main>
  )
}
