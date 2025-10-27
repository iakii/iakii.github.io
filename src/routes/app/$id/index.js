import { CodeOutlined } from "@ant-design/icons";
import {
  createFileRoute,
  getRouteApi,
  useLoaderData,
} from "@tanstack/react-router";
import {
  useLocalForage,
  useLocalForageItemById,
} from "../../../core/hooks/useLocalForage";
import React, { useEffect } from "react";
import { SchemaProvider, SchemaRender } from "react-schema-render";
import { AppContext, useJSXSchema } from "../../online/hooks/useJSXSchema";
import { ProSkeleton } from "@ant-design/pro-components";

export const Route = createFileRoute("/app/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    console.log("Edit Loader Params:", params);
    const result = localStorage.getItem("item_" + params.id);
    console.log("result", result);
    return { id: params.id };
  },
  staticData: {
    name: "在线开发详情",
    icon: <CodeOutlined />,
    index: 99,
    hiddenInMenu: true,
  },
});

function RouteComponent() {
  const routeApi = getRouteApi("/app/$id/");
  const { data, id } = routeApi.useLoaderData();
  const { item, loading } = useLocalForageItemById("app", id);

  console.log("item", item, loading);
  const [schema, useJSX, components] = useJSXSchema();

  useEffect(() => {
    if (item?.code) {
      useJSX(item.codeSource);
    }
  }, [item]);

  return (
    <AppContext.Provider value={{ id: 1223, item: { app: 123 } }}>
      <React.Suspense fallback={<ProSkeleton type="result" />}>
        <SchemaProvider components={components}>
          <SchemaRender schema={schema}></SchemaRender>
        </SchemaProvider>
      </React.Suspense>
    </AppContext.Provider>
  );
}
