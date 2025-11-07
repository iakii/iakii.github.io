import { InfoCircleTwoTone } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";
export default function About() {
  return (
    <ProCard title="关于我" headerBordered>
      <div>关于我</div>
    </ProCard>
  );
}

export const Route = createFileRoute("/about")({
  component: About,
  staticData: {
    name: "关于",
    icon: <InfoCircleTwoTone />,
    index: 100,
  },
});
