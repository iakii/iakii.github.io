import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/react/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/react/"!</div>
}
