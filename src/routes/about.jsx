import { createFileRoute } from "@tanstack/react-router";
export default function About() {
  return (
    <div style={{ fontSize: 24, margin: 40 }}>关于页面（自动路由示例）</div>
  );
}

export const Route = createFileRoute("/about")({
  component: About,
});
