import { ReconciliationTwoTone } from "@ant-design/icons";
import { ProCard, ProSkeleton } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";

import { SchemaProvider, SchemaRender } from "react-schema-render";
import SchemaDrawer, { initialSchema } from "./components/SchemaDrawer";
import { AppContext, inject, useJSXSchema } from "./hooks/useJSXSchema";

export const Route = createFileRoute("/online/")({
  component: RouteComponent,
  staticData: {
    icon: <ReconciliationTwoTone />,
    name: "React Schema",
    index: 8,
  },
});

function RouteComponent() {
  const [schema, useJSX, components] = useJSXSchema();
  useEffect(() => {
    setTimeout(() => {
      useJSX(initialSchema);
    }, 100);
  }, []);
  return (
    <ProCard ghost>
      <ProCard
        title="预览效果"
        headerBordered
        bodyStyle={{ padding: 12, background: "#f6f6f7" }}
        extra={<SchemaDrawer components={components} onFinish={useJSX} />}
      >
        <AppContext.Provider value={{ id: 1223, item: { app: 123 } ,...inject}}>
          <React.Suspense fallback={<ProSkeleton type="result" />}>
            <SchemaProvider components={components}>
              <SchemaRender schema={schema}></SchemaRender>
            </SchemaProvider>
          </React.Suspense>
        </AppContext.Provider>
      </ProCard>
    </ProCard>
  );
}
