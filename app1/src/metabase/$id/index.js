import { EditOutlined, RedoOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { InteractiveDashboard } from "@metabase/embedding-sdk-react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "antd";
import MetaProvider from "../provider";

export const Route = createFileRoute("/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { title } = Route.useSearch();
  const history = Route.useNavigate();

  console.log("Metabase Dashboard ID:", id, location);

  return (
    <ProCard
      title={title || `Dashboard ID: ${id}`}
      headerBordered
      extra={[
        <Button
          icon={<RedoOutlined />}
          ghost
          type="link"
          onClick={() => location.reload()}
        >
          刷新
        </Button>,
        <Button
          icon={<EditOutlined />}
          onClick={() => history({ to: `/${id}/edit` })}
        >
          编辑
        </Button>,
      ]}
    >
      <MetaProvider>
        <InteractiveDashboard
          dashboardId={id}
          // width="100%"
          // style={{ width: "100%", "--dashboard-fixed-width": "80vw" }}
          withCardTitle={false}
          withDownloads
          withTitle={false}
        />
      </MetaProvider>
    </ProCard>
  );
}
