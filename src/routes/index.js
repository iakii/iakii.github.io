import { DashboardTwoTone } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Card, Col, Row } from "antd";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  staticData: {
    name: "首页",
    icon: <DashboardTwoTone />,
    index: -1,
  },
});

function RouteComponent() {
  const { routeTree } = useRouter();

  const menus = useMemo(() => {
    return (routeTree.children || [])
      .map((x) => x.options || {})
      .filter((x) => x.staticData && Object.keys(x.staticData).length)
      .sort((a, b) => {
        const aHasIndex = typeof a.staticData.index === "number";
        const bHasIndex = typeof b.staticData.index === "number";
        if (aHasIndex && bHasIndex) {
          return a.staticData.index - b.staticData.index;
        } else if (aHasIndex) {
          return -1;
        } else if (bHasIndex) {
          return 1;
        } else {
          return 0;
        }
      })
      .map((x) => {
        return {
          icon: x.staticData.icon,
          name: x.staticData.name,
          key: x.path,
          path: x.path,
        };
      });
  }, [routeTree]);

  return (
    <ProCard>
      {/* KPI 卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {menus.map((k, i) => (
          <Col key={k.name} xs={24} sm={12} md={8} lg={6} xl={3}>
            <Card
              bodyStyle={{
                textAlign: "center",
                background: "#f0f7ff",
              }}
            >
              <div style={{ fontSize: 20, color: "#1890ff", fontWeight: 700 }}>
                {k.icon}
              </div>
              <div style={{ fontSize: 16, color: "#666" }}>{k.name}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </ProCard>
  );
}
