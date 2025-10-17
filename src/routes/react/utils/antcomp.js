import * as components from "antd";
import { lazy } from "react";

// 只保留所有以大写字母开头的导出（即所有图标组件）
const antComponents = {};
for (const key in components) {
  if (/^[A-Z]/.test(key)) {
    const Component = layload(key);
    antComponents[key] = Component;
  }
}

// console.log('antComponents', Object.keys(antComponents));

export { antComponents };

function layload(name) {
  return lazy(() => import("antd").then((mod) => ({ default: mod[name] })));
}
