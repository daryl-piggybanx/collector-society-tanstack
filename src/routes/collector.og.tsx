import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collector/og')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/collector/og"!</div>
}
