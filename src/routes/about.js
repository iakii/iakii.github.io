import {
  InfoCircleOutlined
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";
export default function About() {
  return (
    <ProCard title="关于页面（自动路由示例）" headerBordered>
      <div style={{ fontSize: 24 }}></div>
    </ProCard>
  );
}

export const Route = createFileRoute("/about")({
  component: About,
  staticData: {
    name: "关于",
    icon: <InfoCircleOutlined />,
    index: 9,
  },
});
