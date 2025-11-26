import * as Babel from "@babel/standalone";
import * as hooks from "ahooks";
import dayjs from "dayjs";
import localforage from "localforage";
import * as loadsh from "lodash-es";
import * as zustand from "zustand";
import React, {
  Fragment,
  lazy,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AsyncComponent from "../../components/AsyncComponent";
import { antComponents } from "./antcomp";
import { iconComponents, reactComponents } from "./iconcomp";
import { proComponents } from "./procomp";
import { ProForm } from "@ant-design/pro-components";
import { request } from "../request";

/**
 * useJSXSchema hooks：安全执行 JSX/React 代码，返回渲染 schema、执行函数和组件集合。
 * @module useJSXSchema
 */

/**
 * 全局注入对象，供沙箱执行环境访问。
 * @typedef {Object} RootContext
 * @property {typeof React} React - React 主对象
 * @property {Function} useState - React useState
 * @property {Function} useEffect - React useEffect
 * @property {Function} useRef - React useRef
 * @property {Function} useMemo - React useMemo
 * @property {Object} loadsh - lodash-es 工具库
 * @property {Object} dayjs - 日期处理库
 * @property {Object} localforage - 本地存储库
 * @property {Object} hooks - ahooks 工具库
 */

export const AppContext = React.createContext({});

export const useAppContext = () => useContext(AppContext);

/**
 * 组件集合，供 schema 渲染和沙箱执行环境访问。
 * @typedef {Object} ComponentsMap
 * @property {Object} proComponents - Pro 组件库
 * @property {Object} antComponents - Ant Design 组件库
 * @property {Object} iconComponents - 图标组件库
 * @property {Object} reactComponents - 其他 React 组件
 * @property {Fragment} Fragment - React.Fragment
 * @property {Function} lazy - React.lazy
 * @property {AsyncComponent} AsyncComponent - 异步组件
 */

export const inject = {
  React,
  useState,
  useEffect,
  useRef,
  useMemo,
  // printMgr,
  loadsh,
  dayjs,
  localforage,
  ...hooks,
  useForm: ProForm.useForm,
  zustand,
  request,
  useAppContext,
};

const components = {
  ...proComponents,
  ...antComponents,
  ...iconComponents,
  ...reactComponents,
  Fragment,
  lazy,
  AsyncComponent,
};

export const AppComponents = components;

/**
 * 黑名单关键字，禁止危险操作。
 * @type {RegExp[]}
 */
const blacklist = [
  /window\b/,
  /document\b/,
  /eval\b/,
  /Function\b/,
  /fetch\b/,
  /XMLHttpRequest\b/,
  /importScripts\b/,
  /postMessage\b/,
  /SharedWorker\b/,
  /Worker\b/,
  /WebSocket\b/,
  /EventSource\b/,
  /IndexedDB\b/,
  /top\b/,
  /require\b/,
  /globalThis\b/,
  /for\s*\(\s*;\s*;\s*\)/, // 禁止 for(;;)
  /while\s*\(\s*true\s*\)/, // 禁止 while(true)
  /do\s*{[\s\S]*?}\s*while\s*\(\s*true\s*\)/, // 禁止 do{}while(true)
];

/**
 * 限制渲染结果的深度、长度和键数量，防止输出过大或过深。
 * @param {*} obj - 任意对象或数组
 * @param {number} [depth=1] - 当前递归深度
 * @returns {*} 限制后的对象
 */
export function limitOutput(obj, depth = 1) {
  const MAX_DEPTH = 5;
  const MAX_KEYS = 30;
  const MAX_STRLEN = 2000;
  if (depth > MAX_DEPTH) return "[Too deep]";
  if (typeof obj === "string") {
    return obj.length > MAX_STRLEN ? obj.slice(0, MAX_STRLEN) + "..." : obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length > MAX_KEYS)
      return obj
        .slice(0, MAX_KEYS)
        .map((x) => limitOutput(x, depth + 1))
        .concat(["[truncated]"]);
    return obj.map((x) => limitOutput(x, depth + 1));
  }
  if (typeof obj === "object" && obj !== null) {
    const keys = Object.keys(obj);
    if (keys.length > MAX_KEYS) {
      const limited = {};
      keys
        .slice(0, MAX_KEYS)
        .forEach((k) => (limited[k] = limitOutput(obj[k], depth + 1)));
      limited["[truncated]"] = true;
      return limited;
    }
    const limited = {};
    for (const k of keys) {
      limited[k] = limitOutput(obj[k], depth + 1);
    }
    return limited;
  }
  return obj;
}

/**
 * 将jsx解析成js
 * @param {string} reactCode - JSX代码
 * @returns {string | null | undefined} babel对象字符串
 */
export const babelJsx2Js = async (reactCode) => {
  try {
    for (const reg of blacklist) {
      if (reg.test(reactCode)) {
        throw new Error("不安全代码");
      }
    }
    console.time("babel解析耗时");
    const transformed = Babel.transform(reactCode, {
      presets: ["react"],
    }).code;
    console.timeEnd("babel解析耗时");
    return transformed;
  } catch (e) {
    console.error("render error", e);
    alert(`渲染错误: ${e.message}`);
  }
};

/**
 * 将js代码注入并执行，返回渲染结果
 * @param {string} transformed - js babel对象字符串
 * @returns {Record<string,any>} 限制后的对象
 */
export const injectScript2Js = async (transformed) => {
  const argNames = ["$root", "React", ...Object.keys(components)];
  let raw;
  try {
    const fn = new Function(
      ...argNames,
      `${transformed}; return render($root);`
    );
    const argValues = [inject, React, ...Object.values(components)];
    // 超时保护（仅对异步代码有效）
    const timeout = 2000; // 2秒
    const execPromise = Promise.resolve(fn(...argValues));
    raw = await Promise.race([
      execPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("执行超时（2秒）")), timeout)
      ),
    ]);
  } catch (e) {
    alert(`执行异常: ${e.message}`);
    return null;
  }
  // 限制渲染结果类型和大小
  if (typeof raw !== "object" || raw == null) {
    alert("渲染结果无效！");
    return null;
  }
  return limitOutput(raw);
};
