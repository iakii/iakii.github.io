import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quickjs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/quickjs"!</div>
}
