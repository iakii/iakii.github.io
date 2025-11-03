import { useMemo } from "react";

/**
 * 获取当前页面 URL 查询参数的 Hook
 * @returns {Record<string, string>} 所有参数对象
 * @example
 * const params = useSearchParams();
 * // params.id, params.name ...
 */
export function useSearchParams() {
  // 兼容 hash 路由和 search 路由
  const getSearch = () => {
    if (window.location.search && window.location.search !== "") {
      return window.location.search;
    }
    const hash = window.location.hash;
    if (hash.includes("?")) {
      return "?" + hash.split("?")[1];
    }
    return "";
  };

  return useMemo(() => {
    const search = getSearch();
    const params = new URLSearchParams(search);
    const result = {};
    for (const [key, value] of params.entries()) {
      // URLSearchParams 会自动将 + 号解码为空格
      // 如果需要原始值（+ 号），可用正则还原
      const rawValue = search.match(new RegExp(`[?&]${key}=([^&]*)`));
      let parsed = rawValue ? decodeURIComponent(rawValue[1]) : value;
      // 自动类型转换
      if (parsed === "true") parsed = true;
      else if (parsed === "false") parsed = false;
      else if (parsed.startsWith("[") && parsed.endsWith("]"))
        parsed = JSON.parse(parsed); // 数组
      else if (!isNaN(parsed) && parsed.trim() !== "") parsed = Number(parsed);
      result[key] = parsed;
    }
    return result;
  }, [getSearch()]);
}
