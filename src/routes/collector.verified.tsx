import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collector/verified')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/collector/verified"!</div>
}
