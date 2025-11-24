import { ProSkeleton } from "@ant-design/pro-components";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import { babelCacheDB } from "../../../core/BabelCacheDB";
import { AppFormComponent } from "../components/form";

export const Route = createFileRoute("/app/$id/edit")({
  component: RouteComponent,

  loader: async ({ params }) => {
    console.log("Edit Loader Params:", params);
    return { id: params.id };
  },
});

function RouteComponent() {
  const routeApi = getRouteApi("/app/$id/edit");
  const { id } = routeApi.useLoaderData();

  const { data = {}, loading } = useRequest(
    () => babelCacheDB.getRecordById(id),
    {
      refreshDeps: [id],
    }
  );

  return loading ? (
    <ProSkeleton type="result" active={!loading} />
  ) : (
    <AppFormComponent type="edit" record={data || {}} />
  );
}
