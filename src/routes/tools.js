import { ToolTwoTone } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  component: RouteComponent,
  staticData: {
    name: "工具",
    icon: <ToolTwoTone />,
    index: 2,
  },
});

function RouteComponent() {
  return <ProCard title='工具箱'>Hello "/tools"!</ProCard>;
}
