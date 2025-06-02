import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collector/discord')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/collector/discord"!</div>
}
