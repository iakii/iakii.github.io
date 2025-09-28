// 通用 hooks：获取 url 查询参数

import { LogoutOutlined } from "@ant-design/icons";
import { ProLayout, SettingDrawer } from "@ant-design/pro-components";
import {
  Outlet,
  createRootRoute,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Dropdown } from "antd";
import React, { useMemo, useState, useEffect } from "react";

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
      const local = localStorage.getItem('pro_layout_settings');
      return local ? JSON.parse(local) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pro_layout_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const navigate = useNavigate();

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
    <ProLayout
      fixSiderbar
      menu={{ request: () => menus }}
      menuProps={{
        onClick: (e) => navigate({ to: e.key }),
      }}
      siderWidth={156}
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
        // sider: {
        //   colorMenuBackground: "#292f33",
        //   colorMenuItemDivider: "#dfdfdf",
        //   colorBgMenuItemHover: "#dfdfdf",
        //   colorBgMenuItemSelected: "#dfdfdf",
        //   colorTextMenu: "#dfdfdf",
        //   colorTextMenuSelected: "#292f33",
        //   colorTextMenuActive: "#fff",
        // },
      }}
      contentStyle={{ padding: 0 }}
      title="小小工具箱"
      logo={"/favicon.png"}
      style={{ minHeight: "100vh" }}
      location={{
        pathname,
      }}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        size: "small",
        title: "七妮妮",
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
      id="test-pro-layout"
    >
      <Outlet />

      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById("test-pro-layout")}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={true}
      />
    </ProLayout>
  );
}
