import { CodeOutlined } from "@ant-design/icons";
import { ProSkeleton } from "@ant-design/pro-components";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import React from "react";
import { SchemaProvider, SchemaRender } from "react-schema-render";
import {
  AppComponents,
  AppContext,
  injectScript2Js,
} from "@core/babel/babelTools";
import { babelCacheDB } from "@core/BabelCacheDB";

export const Route = createFileRoute("/app/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
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
  const { data = {}, loading } = useRequest(
    () =>
      babelCacheDB.getRecordById(id).then(async (r) => {
        console.time("fetched babel record");
        r.babel = await injectScript2Js(r.babel);
        console.timeEnd("fetched babel record");
        return r;
      }),
    {
      refreshDeps: [],
    }
  );
  console.log(908, data, loading);
  return loading ? (
    <ProSkeleton type="result" />
  ) : (
    <AppContext.Provider value={{ id, ...data }}>
      <React.Suspense fallback={<ProSkeleton type="result" />}>
        <SchemaProvider components={AppComponents}>
          <SchemaRender schema={data.babel || ""}></SchemaRender>
        </SchemaProvider>
      </React.Suspense>
    </AppContext.Provider>
  );
}
