import { useRef, useCallback } from "react";

/**
 * useNextTick: 在下一轮微任务（DOM更新后）执行回调
 * 用法：const nextTick = useNextTick(); nextTick(() => { ... });
 */
export default function useNextTick() {
  const queueRef = useRef([]);

  const nextTick = useCallback((cb) => {
    queueRef.current.push(cb);
    Promise.resolve().then(() => {
      // 只执行本轮队列，防止多次触发
      const queue = queueRef.current;
      queueRef.current = [];
      queue.forEach(fn => fn());
    });
  }, []);

  return nextTick;
}