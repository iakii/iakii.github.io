import { AppstoreFilled } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import WujieReact from "wujie-react";

export const Route = createFileRoute("/wujie")({
  component: RouteComponent,
  staticData: {
    name: "无界 - wujie微前端",
    icon: <AppstoreFilled />,
    index: 98,
  },
});

function RouteComponent() {
  return (
    <WujieReact
      width="100%"
      name="app2"
      fiber={true}
      url={"/app2/"}
    ></WujieReact>
  );
}
