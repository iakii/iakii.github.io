import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// entry
import './public-path';

// index.js
window.unmount = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<></>);
};

window.mount = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

  handleMicroData();
};

// 与基座的数据交互
function handleMicroData() {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log('child-react17 getData:', window.microApp.getData());

    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log('child-react17 addDataListener:', data);
    });

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({ myname: 'app2' });
    }, 3000);
  }
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  // @ts-ignore
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
} else {
  // 非微前端环境直接渲染
  window.mount();
}
