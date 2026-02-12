import { LogoutOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import {
  Outlet,
  createRootRoute,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useRequest } from "ahooks";
import { Dropdown } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import KeepAliveLayout from "../components/LayoutTabs/KeepAliveLayout";

export const Route = createRootRoute({
  component: RootAppComponent,
});

export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => {
    const params = new URLSearchParams(search);
    const obj = {};
    for (const [key, value] of params.entries()) {
      obj[key] = value;
    }
    return obj;
  }, [search]);
}

function RootAppComponent() {
  const { ref = "normal" } = useQuery();

  return ref === "app" ? <Outlet /> : <RootComponent />;
}

function RootComponent() {
  const { routeTree } = useRouter();

  const { pathname } = useLocation();

  const defaultSettings = {
    fixSiderbar: true,
    layout: "side",
    splitMenus: false,
    navTheme: "light",
    contentWidth: "Fluid",
    colorPrimary: "#088844",
    siderMenuType: "sub",
  };
  const [settings, setSetting] = useState(() => {
    try {
      const local = localStorage.getItem("pro_layout_settings");
      return local ? JSON.parse(local) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pro_layout_settings", JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const navigate = useNavigate();

  const { data: version = { version: "1.0.0_dev", date: "2025-10-17" } } =
    useRequest(() => fetch("/version.json").then((res) => res.json()), {
      refreshOnWindowFocus: false,
    });

  const menus = useMemo(() => {
    return (routeTree.children || [])
      .map((x) => x.options || {})
      .filter(
        (x) =>
          x.staticData &&
          Object.keys(x.staticData).length &&
          !x.staticData.hiddenInMenu
      )
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

  // console.log("menus", menus);

  return (
    <ProLayout
      fixSiderbar
      menu={{ request: () => menus }}
      menuProps={{
        onClick: (e) => navigate({ to: e.key }),
      }}
      siderWidth={200}
      token={{
        bgLayout: "#f6f6f7",
        header: {
          colorBgHeader: "#292f33",
          colorHeaderTitle: "#fff",
          colorTextMenu: "#dfdfdf",
          colorTextMenuSecondary: "#dfdfdf",
          colorTextMenuSelected: "#fff",
          colorBgMenuItemSelected: "#22272b",
          colorTextMenuActive: "rgba(255,255,255,0.85)",
          colorTextRightActionsItem: "#dfdfdf",
        },
        colorTextAppListIconHover: "#fff",
        colorTextAppListIcon: "#dfdfdf",
      }}
      contentStyle={{ padding: 0 }}
      title="小小工具箱"
      logo={"/favicon.svg"}
      style={{ minHeight: "100vh" }}
      location={{
        pathname,
      }}
      avatarProps={{
        src: "/favicon.png",
        size: "small",
        title: "工具箱",
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      {...settings}
      footerRender={() => [
        <div
          key="copyright"
          style={{
            padding: 8,
            textAlign: "center",
            fontSize: 12,
            color: "#999",
          }}
        >
          ©版权所有{new Date().getFullYear()} 版本信息：v{version.version}{" "}
          更新时间：{version.date}
        </div>,
      ]}
    >
      <KeepAliveLayout>
        <Outlet />
      </KeepAliveLayout>
    </ProLayout>
  );
}
