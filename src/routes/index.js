import { DashboardTwoTone } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  staticData: {
    name: "首页",
    icon: <DashboardTwoTone />,
    index: -1,
  },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
