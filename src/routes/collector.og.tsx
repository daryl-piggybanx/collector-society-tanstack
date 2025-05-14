import { getProfileByEmail } from '@/integrations/klaviyo/profiles/services'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/collector/og')({
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
    component: RouteComponent,
})

function RouteComponent() {
    const { data: profile, isLoading, error } = useQuery({
        queryKey: ['profile', 'daryl@piggybanxinc.com'],
        queryFn: () => getProfileByEmail({ 
            data: { 
                email: 'daryl@piggybanxinc.com' 
            } 
        })
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading profile</div>
    if (!profile) return <div>No profile found</div>

    return (
        <div>
            <h1>Welcome, {profile.attributes.first_name}!</h1>
        </div>
    )
}
