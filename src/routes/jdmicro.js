import { createFileRoute } from "@tanstack/react-router";
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from "@micro-zoe/micro-app/polyfill/jsx-custom-event";
import { AppstoreFilled } from "@ant-design/icons";

export const Route = createFileRoute("/jdmicro")({
  component: RouteComponent,

  staticData: {
    name: "Micro App - 京东微前端",
    icon: <AppstoreFilled />,
    index: 99,
  },
});

function RouteComponent() {
  return <micro-app name="app2" url="/app2" disableScopecss={true}></micro-app>;
}
