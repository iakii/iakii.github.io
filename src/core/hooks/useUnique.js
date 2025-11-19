import { useMemo } from "react";

/**
 * 通用去重 hook
 *
const uniqueStr = useUnique(['a', 'b', 'a']);
const uniqueNum = useUnique([1, 2, 1]);
const uniqueObj = useUnique([{id:1},{id:2},{id:1}], 'id');
 * @param {Array} arr 原始数组
 * @param {string} [key] 对象去重时的 key
 * @returns {Array} 去重后的数组
 */
export default function useUnique(arr, key) {
  return useMemo(() => {
    if (!Array.isArray(arr)) return [];
    if (!key) {
      // 字符串/数字去重
      return Array.from(new Set(arr));
    }
    // 对象去重
    const seen = new Set();
    return arr.filter((item) => {
      const val = item?.[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  }, [arr, key]);
}


