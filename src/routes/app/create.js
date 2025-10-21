import { createFileRoute } from "@tanstack/react-router";
import { AppFormComponent } from "./components/form";
import { CodeOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/app/create")({
  component: RouteComponent,
  staticData: {
    name: "新建开发",
    icon: <CodeOutlined />,
    index: 99,
    hiddenInMenu: true,
  },
});

function RouteComponent() {
  return <AppFormComponent />;
}
