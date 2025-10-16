import * as icons from "@ant-design/icons";

import * as reactComp from "react";

// 只保留所有以大写字母开头的导出（即所有图标组件）
const iconComponents = {};
for (const key in icons) {
  if (/^[A-Z]/.test(key)) {
    iconComponents[key] = icons[key];
  }
}

const reactComponents = {};

for (const key in reactComp) {
  if (/^[A-Z]/.test(key)) {
    reactComponents[key] = reactComp[key];
  }
}

export { iconComponents, reactComponents };
