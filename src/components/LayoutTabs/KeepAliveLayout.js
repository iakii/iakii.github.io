import { Dropdown, Tabs } from "antd";
import { useCallback, useMemo } from "react";
import "./index.less";

import { useNavigate } from "@tanstack/react-router";
import {
  KeepAliveTab,
  KeepAliveTabContext,
  useKeepAliveTabs,
} from "./useKeepAliveTabs";

const KeepAliveLayout = ({ children }) => {
  const history = useNavigate();
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
    [keepAliveTabs]
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
    [closeOtherTab, closeTab, refreshTab]
  );

  /** @type {KeepAliveTab} tab */
  const renderTabTitle = useCallback(
    (tab) => {
      return (
        <Dropdown
          menu={{ items: menuItems, onClick: (e) => menuClick(e, tab) }}
          trigger={["contextMenu"]}
        >
          <div style={{ margin: "-12px 0", padding: "12px 0" }}>
            {tab.icon}
            {tab.title}
          </div>
        </Dropdown>
      );
    },
    [menuItems]
  );

  const tabItems = useMemo(() => {
    return keepAliveTabs.map((tab) => {
      return {
        key: tab.routePath,
        label: renderTabTitle(tab),
        children: (
          <div
            key={tab.routePath}
            style={{ height: "calc(100vh - 112px)", overflow: "auto" }}
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
        history({ to: curTab?.pathname });
      }
    },
    [keepAliveTabs]
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
    [closeTab, closeOtherTab, refreshTab, onHidden, onShow]
  );

  return (
    <div className={'keepAliveTabs'}>
      <KeepAliveTabContext.Provider value={keepAliveContextValue}>
        <Tabs
          type="editable-card"
          items={tabItems}
          activeKey={activeTabRoutePath}
          onChange={onTabsChange}
          className="keep-alive-tabs"
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
