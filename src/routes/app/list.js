import { AntDesignOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import { useLocalForage } from "../../core/hooks/useLocalForage";

export const Route = createFileRoute("/app/list")({
  component: RouteComponent,
  staticData: {
    name: "在线开发",
    icon: <AntDesignOutlined />,
    index: 100,
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const { add, data, loading, error } = useLocalForage("app");

  console.log("data", data, loading, error);
  return (
    <ProTable
      toolBarRender={(action) => [
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => navigate({ to: "/app/create" })}
        >
          添加
        </Button>,
      ]}
      columns={[
        { title: "名称", dataIndex: "name" },
        { title: "版本", dataIndex: "version" },
        {
          title: "操作",
          valueType: "option",
          render: (_, { id }) => [
            <a onClick={() => navigate({ to: `/app/${id}` })}>查看</a>,
            <a onClick={() => navigate({ to: `/app/${id}/edit` })}>编辑</a>,
            "删除",
          ],
        },
      ]}
      dataSource={data}
      loading={loading}
    />
  );
}
