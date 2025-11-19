import { useState, useCallback } from "react";

/**
 * 生成 uuid 的 hook
 * @returns { [string, () => void] } 当前 uuid 和刷新方法
 */
function genUUID() {
  // 简单版 uuid v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 *
 * const [uuid, refreshUUID] = useUUID();
// uuid: 当前唯一值
// refreshUUID(): 生成新的 uuid
 * @description
 * @author 熊凯(一只熊猫🐼)
 * @date 19/11/2025
 * @export
 * @return {*}
 */
export default function useUUID() {
  const [uuid, setUUID] = useState(() => genUUID());
  const refresh = useCallback(() => setUUID(genUUID()), []);
  return [uuid, refresh];
}
