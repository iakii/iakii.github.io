import { Dropdown, Space, Tabs, Tooltip, Typography } from "antd";
import { useCallback, useMemo } from "react";
import "./index.less";

import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";
import {
  KeepAliveTab,
  KeepAliveTabContext,
  useKeepAliveTabs,
} from "./useKeepAliveTabs";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { getCurrentWindow } from "@tauri-apps/api/window";

const KeepAliveLayout = ({ children }) => {
  const navigate = useNavigate();
  const router = useRouter();

  const { pathname } = useLocation();

  // const outlet = <Outlet />;
  const {
    keepAliveTabs,
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOtherTab,
    onHidden,
    onShow,
  } = useKeepAliveTabs(children);

  const menuItems = useMemo(
    () =>
      [
        {
          label: "刷新",
          key: "refresh",
        },
        keepAliveTabs.length <= 1
          ? null
          : {
              label: "关闭",
              key: "close",
            },
        keepAliveTabs.length <= 1
          ? null
          : {
              label: "关闭其他",
              key: "close-other",
            },
      ].filter((o) => o),
    [keepAliveTabs],
  );

  const menuClick = useCallback(
    ({ key, domEvent }, tab) => {
      domEvent.stopPropagation();

      if (key === OperationType.REFRESH) {
        refreshTab(tab.routePath);
      } else if (key === OperationType.CLOSE) {
        closeTab(tab.routePath);
      } else if (key === OperationType.CLOSEOTHER) {
        closeOtherTab(tab.routePath);
      }
    },
    [closeOtherTab, closeTab, refreshTab],
  );

  /** @type {KeepAliveTab} tab */
  const renderTabTitle = useCallback(
    (tab) => {
      return (
        <Dropdown
          menu={{ items: menuItems, onClick: (e) => menuClick(e, tab) }}
          trigger={["contextMenu"]}
        >
          <Space>
            {tab.icon}
            {tab.title === "__root__" ? "首页" : tab.title}
          </Space>
        </Dropdown>
      );
    },
    [menuItems],
  );

  const tabItems = useMemo(() => {
    return keepAliveTabs.map((tab) => {
      return {
        key: tab.routePath,
        label: renderTabTitle(tab),
        children: (
          <div
            key={tab.routePath}
            style={{ height: "calc(100vh - 90px)", overflow: "auto" }}
          >
            {tab.children}
          </div>
        ),
        closable: keepAliveTabs.length > 1,
      };
    });
  }, [keepAliveTabs]);

  /** @type {string} tabRoutePath */
  const onTabsChange = useCallback(
    (tabRoutePath) => {
      const curTab = keepAliveTabs.find((o) => o.routePath === tabRoutePath);
      if (curTab) {
        navigate({ to: curTab?.pathname });
      }
    },
    [keepAliveTabs],
  );

  /**
   * @description
   * @author 熊凯(一只熊猫🐼)
   * @date 17/10/2025
   * @param {(React.MouseEvent | React.KeyboardEvent | string)} targetKey
   * @param {('add' | 'remove')} action
   */
  const onTabEdit = (targetKey, action) => {
    if (action === "remove") {
      closeTab(targetKey);
    }
  };

  const keepAliveContextValue = useMemo(
    () => ({
      closeTab,
      closeOtherTab,
      refreshTab,
      onHidden,
      onShow,
    }),
    [closeTab, closeOtherTab, refreshTab, onHidden, onShow],
  );
  const onBack = () => window.history.back();
  const onNext = () => window.history.forward();
  const onRedo = () => location.reload();

  const handleDrag = useCallback((e) => {
    if (e.buttons === 1) {
      const appWindow = getCurrentWindow();
      e.detail === 2
        ? appWindow.toggleMaximize() // Maximize on double click
        : appWindow.startDragging(); // Else start dragging
    }
  }, []);

  const title = useMemo(() => {
    const current = keepAliveTabs.find(
      (x) =>
        x.pathname === pathname || x.pathname?.replace(/\/$/, "") === pathname,
    );

    if (!current) return "小小工具箱";
    return (
      (current?.title === "__root__" ? "首页" : current.title) || "小小工具箱"
    );
  }, [keepAliveTabs, pathname]);

  return (
    <div className={"keepAliveTabs"}>
      <KeepAliveTabContext.Provider value={keepAliveContextValue}>
        <Tabs
          tabBarExtraContent={{
            left: (
              <Typography.Title
                level={5}
                style={{ margin: "0 12px 0 0", padding: "0 24px" }}
              >
                <Space size="large">
                  <Tooltip title="后退">
                    <ArrowLeftOutlined onClick={onBack} />
                  </Tooltip>
                  <Tooltip title="前进">
                    <ArrowRightOutlined onClick={onNext} />
                  </Tooltip>
                  <Tooltip title="刷新">
                    <RedoOutlined onClick={onRedo} />
                  </Tooltip>
                  {title}
                </Space>
              </Typography.Title>
            ),
          }}
          type="editable-card"
          items={tabItems}
          renderTabBar={(props, DefaultTabBar) => (
            <div onMouseDown={handleDrag}>
              <DefaultTabBar {...props} />
            </div>
          )}
          size="small"
          activeKey={activeTabRoutePath}
          onChange={onTabsChange}
          style={{ padding: 0 }}
          hideAdd
          animated={false}
          onEdit={onTabEdit}
        />
      </KeepAliveTabContext.Provider>
    </div>
  );
};

export default KeepAliveLayout;
