import { getProfileByEmail } from '@/integrations/klaviyo/profiles/services'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { OGCollectorForm } from '@/components/collector-form'
import ParticleBackground from '@/components/particle-background'

export const Route = createFileRoute('/collector/og')({
    /*
    loader: async ({ context }) => {
        // Prefetch the query
        await context.queryClient.prefetchQuery({
            queryKey: ['profile', 'daryl@piggybanxinc.com'],
            queryFn: () => getProfileByEmail({ 
                data: { 
                    email: 'daryl@piggybanxinc.com' 
                } 
            })
        })
    },
    */
    component: RouteComponent,
})

function RouteComponent() {
    const email = false // disable for now
    if (email) {
        const { data: profile, isLoading, error } = useQuery({
            queryKey: ['profile', ''],
            queryFn: () => getProfileByEmail({ 
                data: { 
                    email: '' 
                } 
            })
        })

        if (isLoading) return <div>Loading...</div>
        if (error) return <div>Error loading profile</div>
        if (!profile) return <div>No profile found</div>
    }

    // Welcome, {profile.attributes.first_name}

  return (
    <main className="absolute inset-0  overflow-hidden bg-gradient-to-b from-gray-950 via-gray-700 to-zinc-900">

      <ParticleBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <OGCollectorForm />
      </div>
    </main>
  )
}
