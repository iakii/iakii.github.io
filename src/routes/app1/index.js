import { AppleOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { loadMicroApp } from "qiankun";
import { useEffect } from "react";
import { useRef } from "react";

export const Route = createFileRoute("/app1/")({
  component: RouteComponent,
  staticData: {
    name: "乾坤 - 微前端",
    icon: <AppleOutlined />,
    index: 99,
  },
});

function RouteComponent() {
  const containerRef = useRef();

  const historyRef = useRef();

  const { app } = Route.useParams();
  console.log("route", app);
  useEffect(() => {
    const microApp = loadMicroApp({
      name: "app1",
      entry: {
        scripts: ["/app1/app1.umd.cjs"],
        html: `<div id="root"></div>`,
      },
      container: containerRef.current,
      props: {
        onRouteCallback: (data) => {
          historyRef.current = data;
        },
      },
    });
    return () => microApp.unmount();
  }, [app]);
  return <div ref={containerRef} />;
}
