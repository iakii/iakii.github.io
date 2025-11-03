import { ProCard } from "@ant-design/pro-components";
import { EditableDashboard } from "@metabase/embedding-sdk-react";
import { createFileRoute } from "@tanstack/react-router";
import { Space } from "antd";
import { useState } from "react";
import MetaProvider from "../provider";
export const Route = createFileRoute("/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [title, setTitle] = useState("");
  return (
    <ProCard
      title={
        <Space>
          <span>编辑 {title}</span>
        </Space>
      }
      headerBordered
    >
      <MetaProvider>
        <EditableDashboard
          width="100%"
          onLoad={(e) => {
            console.log("Editable Dashboard Loaded:", e);
            // setTitle(e?.title);
          }}
          dashboardId={id}
        />
      </MetaProvider>
    </ProCard>
  );
}
