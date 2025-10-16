import * as components from '@ant-design/pro-components';

// 只保留所有以大写字母开头的导出（即所有图标组件）
const proComponents = {};
for (const key in components) {
  if (/^[A-Z]/.test(key)) {
    proComponents[key] = components[key];
  }
}

// console.log('proComponents', Object.keys(proComponents));

export { proComponents };
