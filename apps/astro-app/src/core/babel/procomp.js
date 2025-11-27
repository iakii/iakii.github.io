import * as components from "@ant-design/pro-components";
import { lazy } from "react";
function layload(name) {
  return lazy(() =>
    import("@ant-design/pro-components").then((mod) => ({ default: mod[name] }))
  );
}

// 只保留所有以大写字母开头的导出（即所有图标组件）
const proComponents = {};
for (const key in components) {
  if (/^[A-Z]/.test(key)) {
    const Component = layload(key);
    proComponents[key] = Component;
  }
}

export { proComponents };
