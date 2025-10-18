import * as Babel from "@babel/standalone";
import * as hooks from "ahooks";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import localforage from "localforage";
import loadsh from "lodash-es";
import React, {
    Fragment,
    lazy,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import AsyncComponent from "../../../components/AsyncComponent";
import { antComponents } from "../utils/antcomp";
import { iconComponents, reactComponents } from "../utils/iconcomp";
import { proComponents } from "../utils/procomp";

const $root = {
  React,
  useState,
  useEffect,
  useRef,
  useMemo,
  // printMgr,
  loadsh,
  dayjs,
  localforage,
  hooks,
  // httpClient: fetch,
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

// 黑名单关键字，禁止危险操作
const blacklist = [
  /window\b/,
  /document\b/,
  /eval\b/,
  /Function\b/,
  // /fetch\b/,
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
// hooks: useJSXSchema
export function useJSXSchema() {
  const [schema, setSchema] = useState({
    component: "ProCard",
    children: [
      {
        component: "Descriptions",
        title: "User Info",
        size: "small",
        bordered: true,
        layout: "vertical",
        children: (
          <>
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </>
        ),
      },
    ],
  });

  // 预览/执行
  const useJSX = async (reactCode) => {
    try {
      for (const reg of blacklist) {
        if (reg.test(reactCode)) {
          setSchema({
            component: "Result",
            status: 403,
            title: "检测到不安全代码，已禁止执行！",
          });
          return;
        }
      }
      // 使用 Babel 将含 JSX 的代码编译为普通 JS
      console.time("babel解析耗时");
      const transformed = Babel.transform(reactCode, {
        presets: ["react"],
      }).code;
      console.timeEnd("babel解析耗时");
      // 注入 $root、React 以及 components 中的变量
      const argNames = ["$root", "React", ...Object.keys(components)];
      let raw;
      try {
        const fn = new Function(
          ...argNames,
          `${transformed}; return render($root);`
        );
        const argValues = [$root, React, ...Object.values(components)];
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
        setSchema({
          component: "Result",
          status: 403,
          title: `执行异常: ${e.message}`,
        });
        return;
      }
      // 限制渲染结果类型和大小
      function limitOutput(obj, depth = 1) {
        const MAX_DEPTH = 5;
        const MAX_KEYS = 30;
        const MAX_STRLEN = 2000;
        if (depth > MAX_DEPTH) return "[Too deep]";
        if (typeof obj === "string") {
          return obj.length > MAX_STRLEN
            ? obj.slice(0, MAX_STRLEN) + "..."
            : obj;
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
      if (typeof raw !== "object" || raw == null) {
        setSchema({
          component: "Result",
          status: 403,
          title: "渲染结果无效！",
        });
        return;
      }
      setSchema(limitOutput(raw));
    } catch (e) {
      console.error("render error", e);
      setSchema({
        component: "Result",
        status: 403,
        title: `渲染错误: ${e.message}`,
      });
    }
  };

  return [schema, useJSX, components];
}
