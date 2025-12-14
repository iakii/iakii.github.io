import { createFileRoute } from "@tanstack/react-router";
import { AppstoreFilled } from "@ant-design/icons";
import { loadMicroApp } from "qiankun";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/cdn")({
  component: RouteComponent,

  staticData: {
    name: "Micro App - 京东微前端",
    icon: <AppstoreFilled />,
    index: 99,
  },
});

function RouteComponent() {
  useEffect(() => {
    setTimeout(() => {
      loadMicroApp({
        name: "app",
        entry: "//localhost:3001/cdn-react/",
        container: ".cdn-container",
      });
    }, 60);
  }, []);

  return <div className="cdn-container"></div>;
}
