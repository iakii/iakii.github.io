import { ProLayout } from "@ant-design/pro-components";
import {
  Outlet,
  createRootRoute,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { routeTree } = useRouter();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const menus = useMemo(() => {
    return (routeTree.children || [])
      .map((x) => x.options || {})
      .filter((x) => x.staticData && Object.keys(x.staticData).length)
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
    <ProLayout
      menu={{ request: () => menus }}
      menuProps={{
        selectedKeys: [pathname],
        onClick: (e) => {
          navigate({ to: e.key });
        },
      }}
      onChange={(e) => {
        console.log("onChange", e);
      }}
      title="文件打印"
      logo={"/favicon.png"}
      style={{ minHeight: "100vh" }}
    >
      <Outlet />
    </ProLayout>
  );
}
