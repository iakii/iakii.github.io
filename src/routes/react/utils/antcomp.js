import * as components from 'antd';

// 只保留所有以大写字母开头的导出（即所有图标组件）
const antComponents = {};
for (const key in components) {
  if (/^[A-Z]/.test(key)) {
    antComponents[key] = components[key];
  }
}

// console.log('antComponents', Object.keys(antComponents));

export { antComponents };
