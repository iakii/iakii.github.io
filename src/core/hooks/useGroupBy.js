import { useMemo } from "react";

/**
 * 通用分组 hook，类似 lodash groupBy
 * @param {Array} arr 原始数组
 * @param {string|function} key 分组依据（属性名或分组函数）
 * @returns {Object} 分组结果
 *
 * 用法示例：
 * useGroupBy([{type:'a'},{type:'b'}], 'type')
 * useGroupBy([{age:10},{age:20}], item => item.age > 15 ? 'adult' : 'child')
 */
export default function useGroupBy(arr, key) {
  return useMemo(() => {
    if (!Array.isArray(arr)) return {};
    const getKey = typeof key === "function" ? key : (item) => item?.[key];
    return arr.reduce((acc, item) => {
      const group = getKey(item);
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    }, {});
  }, [arr, key]);
}