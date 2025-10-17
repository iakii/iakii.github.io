import { useLocation, useRouter } from "@tanstack/react-router";
import { useMemo } from "react";

/**
 * useMatchRoute
 *
 * 根据当前 pathname 和 router.routeTree 推断最匹配的 route 节点并返回简单的 route 信息
 * 返回 shape: { title, pathname, routePath, icon, children }
 */
export function useMatchRoute() {
  const { pathname } = useLocation ? useLocation() : { pathname: window.location.pathname };
  const { routeTree } = useRouter ? useRouter() : { routeTree: null };

  const match = useMemo(() => {
    if (!routeTree) return null;

    // routeTree 可能是对象（包含 children）或数组（多个 top-level routes）
  const roots = Array.isArray(routeTree) ? routeTree : [routeTree];

  const nodes = [];
  const seen = new Set();

    function normalizePath(parent, child) {
      if (!child) return parent || "";
      if (child.startsWith("/")) return child;
      if (!parent) return `/${child}`;
      return `${parent.replace(/\/$/, "")}/${child.replace(/^\//, "")}`;
    }

    function walk(node, parentPath = "") {
      if (!node) return;

      // node 可能是 route node，也可能是 options/staticData
      const options = node.options || node.staticData || node;

      // 多个可能的 path 字段来源
      const rawPath = node.path || options.path || options.routePath || options.fullPath || options.key || "";
      const fullPath = rawPath ? normalizePath(parentPath, rawPath) : parentPath || "";

      if (fullPath && !seen.has(fullPath)) {
        seen.add(fullPath);
        nodes.push({ node, fullPath, options });
      }

      const children = node.children || node.routeChildren || options.children || [];
      (children || []).forEach((c) => walk(c, fullPath));
    }

    roots.forEach((r) => walk(r, ""));

    // 找到与 pathname 最长匹配的 fullPath（支持 :param 占位）
    let best = null;
    for (const item of nodes) {
      const p = item.fullPath;
      if (!p) continue;
      const pSegments = p.split("/").filter(Boolean);
      const pathSegments = pathname.split("/").filter(Boolean);

      let matched = true;
      for (let i = 0; i < pSegments.length; i++) {
        const seg = pSegments[i];
        const target = pathSegments[i];
        if (seg.startsWith(":")) {
          if (typeof target === "undefined") {
            matched = false;
            break;
          }
        } else {
          if (seg !== target) {
            matched = false;
            break;
          }
        }
      }

      if (matched) {
        if (!best || p.length > best.fullPath.length) {
          best = item;
        }
      }
    }

    if (!best) return null;

  const opts = best.options || best.node.options || best.node.staticData || {};
  const title = opts.name || opts.title || (opts.staticData && opts.staticData.name) || best.node.id || best.fullPath;
  const icon = opts.icon || (opts.staticData && opts.staticData.icon) || null;

    const normalizeRoutePath = (p) => {
      if (!p) return p;
      if (p === "/") return p;
      return p.replace(/\/$/, "");
    };

    return {
      title,
      pathname,
      routePath: normalizeRoutePath(best.fullPath),
      icon,
      children: null,
    };
  }, [routeTree, pathname]);

  return match;
}
