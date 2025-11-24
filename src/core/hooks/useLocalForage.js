/**
 * 根据 id 获取单条数据的 Hook，会自动监听 data 变化
 * @param {string} key - 存储集合 key
 * @param {string|number} id - 元素 id
 * @returns {Object} { item, loading, error, refresh }
 * @example
 * const { item, loading } = useLocalForageItemById('users', 123);
 */
export function useLocalForageItemById(key, id, parse) {
  const { data, loading, error, get } = useLocalForage(key);
  const [item, setItem] = useState(null);
  const [itemLoading, setItemLoading] = useState(loading);
  const [itemError, setItemError] = useState(error);

  // 监听 data 或 id 变化，自动查找
  useEffect(() => {
    if (loading) {
      setItemLoading(true);
      return;
    }
    let found = data.find((d) => d && d.id == id) || null;

    if (parse) found = parse(found);
    console.log("1result", found);
    setItem(found);
    setItemLoading(false);
    setItemError(null);
  }, [data, id, loading]);

  // 支持手动刷新（从存储层重新查）
  const refresh = useCallback(async () => {
    setItemLoading(true);
    try {
      let result = await get(id);
      console.log("1result", result);
      if (parse) result = parse(result);
      setItem(result);
      setItemError(null);
    } catch (err) {
      setItemError(err);
    } finally {
      setItemLoading(false);
    }
  }, [get, id]);

  return { item, loading: itemLoading, error: itemError, refresh };
}

import { useState, useEffect, useCallback, useRef } from "react";
import localforage from "localforage";

/**
 * React LocalForage Hook
 * @param {string} key - 存储集合 key
 * @returns {Object} { data, loading, error, add, get, update, delete: remove, clear }
 * @example
 * const { data, add, update, delete: remove } = useLocalForage('users');
 */
export function useLocalForage(key) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const instanceRef = useRef(null);

  // 初始化实例
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const instance = localforage.createInstance({
          name: "ReactLocalForageDB",
          storeName: `store_${key}`,
        });
        await instance.ready();
        instanceRef.current = instance;
        // 加载所有数据
        const items = [];
        await instance.iterate((value) => items.push(value));
        if (!cancelled) setData(items);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  // 刷新数据
  const refreshData = useCallback(async () => {
    const instance = instanceRef.current;
    if (!instance) return;
    try {
      const items = [];
      await instance.iterate((value) => items.push(value));
      setData(items);
    } catch (err) {
      setError(err);
    }
  }, []);

  // 添加元素
  const add = useCallback(
    async (item) => {
      const instance = instanceRef.current;
      if (!instance) throw new Error("存储尚未初始化");
      try {
        const id = item.id || Date.now().toString();
        const itemWithId = { ...item, id };
        // localforage.setItem(`item_${id}`, item.babel);

        await instance.setItem(`item_${id}`, itemWithId);
        await refreshData();
        return itemWithId;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [refreshData]
  );

  // 查询元素
  const get = useCallback(async (id) => {
    const instance = instanceRef.current;
    if (!instance) throw new Error("存储尚未初始化");
    try {
      return await instance.getItem(`item_${id}`);
    } catch (err) {
      setError(err);
      return null;
    }
  }, []);

  // 更新元素
  const update = useCallback(
    async (id, updates, refresh = false) => {
      const instance = instanceRef.current;
      if (!instance) throw new Error("存储尚未初始化");
      try {
        const existing = await instance.getItem(`item_${id}`);
        if (!existing) throw new Error(`id 为 ${id} 的元素不存在`);
        const updated = { ...existing, ...updates, id };
        await instance.setItem(`item_${id}`, updated);
        if (refresh) await refreshData();
        return updated;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [refreshData]
  );

  // 删除元素
  const remove = useCallback(
    async (id) => {
      const instance = instanceRef.current;
      if (!instance) throw new Error("存储尚未初始化");
      try {
        await instance.removeItem(`item_${id}`);
        await refreshData();
        return true;
      } catch (err) {
        setError(err);
        return false;
      }
    },
    [refreshData]
  );

  // 清空集合
  const clear = useCallback(async () => {
    const instance = instanceRef.current;
    if (!instance) throw new Error("存储尚未初始化");
    try {
      await instance.clear();
      setData([]);
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  }, []);

  return {
    data,
    loading,
    error,
    add,
    get,
    update,
    delete: remove,
    clear,
  };
}
