import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { useLocalForageItemById } from "../../../core/hooks/useLocalForage";
import { AppFormComponent } from "../components/form";
import { ProSkeleton } from "@ant-design/pro-components";

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
  const { item, loading } = useLocalForageItemById("app", id, (result) => {
    if (result.code) result.code = JSON.parse(window.atob(result.code));
    return result;
  });
  return loading ? (
    <ProSkeleton type="result" active={!loading} />
  ) : (
    <AppFormComponent type="edit" record={item || {}} />
  );
}
