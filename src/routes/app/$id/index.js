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
import {
  AppContext,
  forkNode,
  useJSXSchema,
} from "../../online/hooks/useJSXSchema";
import { ProSkeleton } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { babelCacheDB } from "../../../core/BabelCacheDB";

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
  const { id } = routeApi.useLoaderData();
  const [components] = useJSXSchema();

  const { data = {} } = useRequest(
    () =>
      babelCacheDB.getRecordById(id).then(async (r) => {
        r.babel = await forkNode(r.babel);
        return r;
      }),
    {
      refreshDeps: [id],
    }
  );
  console.log("data");

  return (
    <AppContext.Provider value={{ id, data }}>
      <React.Suspense fallback={<ProSkeleton type="result" />}>
        <SchemaProvider components={components}>
          <SchemaRender schema={data.babel || ""}></SchemaRender>
        </SchemaProvider>
      </React.Suspense>
    </AppContext.Provider>
  );
}
