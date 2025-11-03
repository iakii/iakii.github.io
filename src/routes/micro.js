import { createFileRoute } from "@tanstack/react-router";
import { loadMicroApp, start } from "qiankun";
import { useRef, useEffect } from "react";

export const Route = createFileRoute("/micro")({
  component: RouteComponent,
});

function RouteComponent() {
  const containerRef = useRef();

  useEffect(() => {
    const microApp = loadMicroApp({
      name: "reactApp",
      entry: "",
      container: containerRef.current,
      props: { brand: "qiankun" },
    });
    return () => {
      microApp.unmount();
    };
  }, []);

  return <div ref={containerRef} style={{ minHeight: 400 }}>Hello "/micro"!</div>;
}
