import { createFileRoute } from "@tanstack/react-router";
import { CodeOutlined } from "@ant-design/icons";
import { AppFormComponent } from "../../components/CreateApp/form";

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
