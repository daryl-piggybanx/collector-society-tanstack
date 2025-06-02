import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import ParticleBackground from "@/components/particle-background"
import ActionButtons from "@/components/action-buttons"
import { Button } from "@/components/ui/button"
import VideoBackground from '@/components/video-background'
import ParticleTwinkleBackground from '@/components/particle-background-twinkle'


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-950 to-zinc-950">

      {/* <ParticleBackground />  */}
      {/* <VideoBackground />  */}
      <ParticleTwinkleBackground />
      
      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter text-gray-200/90 sm:text-5xl md:text-6xl lg:text-7xl">
            Into the <br />
            <span className="text-red-600">PiggyVerse</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-gray-200/90 md:text-xl [text-shadow:_0_0_10px_rgb(225_29_72_/_0.5)]">
            Your gateway into a collector's club like no other—different from anything that has come before. Don't call them cards, these artworks are handcrafted, often imitated but never replicated.
          </p>

          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <ActionButtons />
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
