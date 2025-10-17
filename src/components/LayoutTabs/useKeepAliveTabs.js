import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useMatchRoute } from "./useMatchRoute";

function getKey() {
  return new Date().getTime().toString();
}

const defaultValue = {
  refreshTab: () => {},
  closeTab: () => {},
  closeOtherTab: () => {},
  onShow: () => {},
  onHidden: () => {},
};

export const KeepAliveTabContext = createContext(defaultValue);

export function useKeepAliveTabs(currentChildren) {
  const history = useNavigate();
  const { pathname } = useLocation();
  const { routeTree } = useRouter();

  const [keepAliveTabs, setKeepAliveTabs] = useState([]);
  // activeTabRoutePath 存储当前激活 tab 的 routePath
  const [activeTabRoutePath, setActiveTabRoutePath] = useState(pathname);

  const keepAliveShowEvents = useRef({});
  const keepAliveHiddenEvents = useRef({});

  console.log("routeTree", routeTree, pathname);

  // 从 useMatchRoute 获取当前匹配的路由信息
  const matchRoute = useMatchRoute();

  const onShow = useCallback(
    (cb) => {
      if (!keepAliveShowEvents.current[activeTabRoutePath]) {
        keepAliveShowEvents.current[activeTabRoutePath] = [];
      }
      keepAliveShowEvents.current[activeTabRoutePath].push(cb);
    },
    [activeTabRoutePath]
  );

  const onHidden = useCallback(
    (cb) => {
      if (!keepAliveHiddenEvents.current[activeTabRoutePath]) {
        keepAliveHiddenEvents.current[activeTabRoutePath] = [];
      }
      keepAliveHiddenEvents.current[activeTabRoutePath].push(cb);
    },
    [activeTabRoutePath]
  );

  // 关闭tab
  const closeTab = useCallback(
    (routePath = activeTabRoutePath) => {
      setKeepAliveTabs((prev) => {
        const index = prev.findIndex((o) => o.routePath === routePath);
        if (index === -1) return prev;
        // 如果关闭的是激活 tab，则导航到相邻 tab 的 pathname（优先左侧）
        const isActive = prev[index].routePath === activeTabRoutePath;
        let navigateTo = null;
        if (isActive) {
          if (index > 0) {
            navigateTo = prev[index - 1].pathname;
          } else if (index < prev.length - 1) {
            navigateTo = prev[index + 1].pathname;
          }
        }
        // cleanup events for this tab
        delete keepAliveHiddenEvents.current[routePath];
        delete keepAliveShowEvents.current[routePath];
        const newTabs = prev.slice();
        newTabs.splice(index, 1);
        if (navigateTo) {
          try {
            history({ to: navigateTo });
          } catch (e) {
            // ignore
          }
        }
        return newTabs;
      });
    },
    [activeTabRoutePath, history]
  );

  // 关闭其他
  const closeOtherTab = useCallback(
    (routePath = activeTabRoutePath) => {
      setKeepAliveTabs((prev) => {
        const toCloseTabs = prev.filter((o) => o.routePath !== routePath);
        toCloseTabs.forEach((tab) => {
          delete keepAliveHiddenEvents.current[tab.routePath];
          delete keepAliveShowEvents.current[tab.routePath];
        });

        return prev.filter((o) => o.routePath === routePath);
      });
    },
    [activeTabRoutePath]
  );

  // 刷新tab
  const refreshTab = useCallback(
    (routePath = activeTabRoutePath) => {
      setKeepAliveTabs((prev) => {
        const index = prev.findIndex((tab) => tab.routePath === routePath);
        if (index === -1) return prev;

        const newTabs = prev.map((tab) =>
          tab.routePath === routePath ? { ...tab, key: getKey() } : tab
        );

        // 清理该 tab 的事件注册
        delete keepAliveHiddenEvents.current[routePath];
        delete keepAliveShowEvents.current[routePath];

        return newTabs;
      });
    },
    [activeTabRoutePath]
  );

  useEffect(() => {
    if (!matchRoute) return;
      // 使用函数式更新，避免闭包造成的重复插入
      setKeepAliveTabs((prev) => {
        const index = prev.findIndex((o) => o.routePath === matchRoute.routePath);

        // 触发上一个 active tab 的 onHidden（基于最新 activeTabRoutePath）
        try {
          (keepAliveHiddenEvents.current[activeTabRoutePath] || []).forEach((cb) => cb());
        } catch (e) {}

        // 更新 active tab routePath
        setActiveTabRoutePath(matchRoute.routePath);

        if (index === -1) {
          // 不存在则插入
          return [
            ...prev,
            {
              title: matchRoute.title,
              key: getKey(),
              routePath: matchRoute.routePath,
              pathname: matchRoute.pathname,
              children: matchRoute.children || currentChildren,
              icon: matchRoute.icon,
            },
          ];
        }

        // 存在但 pathname 发生变化，则刷新该 tab
        if (prev[index].pathname !== matchRoute.pathname) {
          const next = prev.slice();
          next[index] = {
            ...next[index],
            key: getKey(),
            pathname: matchRoute.pathname,
            children: matchRoute.children || currentChildren,
          };

          // 清理注册事件
          delete keepAliveHiddenEvents.current[next[index].routePath];
          delete keepAliveShowEvents.current[next[index].routePath];

          return next;
        }

        // 存在且 pathname 相同，触发 onShow 回调
        try {
          (keepAliveShowEvents.current[prev[index].routePath] || []).forEach((cb) => cb());
        } catch (e) {}

        return prev;
      });
  }, [matchRoute]);

  return {
    keepAliveTabs,
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOtherTab,
    onShow,
    onHidden,
  };
}
