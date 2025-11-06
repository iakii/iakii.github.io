import { AppleOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/micro/$app/")({
  component: RouteComponent,

});
function RouteComponent() {
  return (
    <div style={{ padding: 20 }}>
      <a
        onClick={() => {
          window.history.pushState({}, "", "/app1/app");
        }}
      >
        app1
      </a>
      <h2>主应用 - 子应用加载区</h2>
      <div
        id="app1container"
        style={{ marginTop: 10, border: "1px solid #ccc" }}
      />
    </div>
  );
}
