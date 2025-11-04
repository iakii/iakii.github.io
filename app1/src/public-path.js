// src/public-path.js（子应用）
if (window.__POWERED_BY_QIANKUN__) {
  // 被主应用加载时，使用 qiankun 注入的路径
  window.__INJECTED_PUBLIC_PATH__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  // 独立运行时，使用 Vite 配置的 base（通常在 vite.config.js 中设置）
  window.__INJECTED_PUBLIC_PATH__ = import.meta.env.BASE_URL;
}

// 覆盖 Vite 的基础路径（关键：让资源加载使用动态路径）
// import.meta.env.BASE_URL = window.__INJECTED_PUBLIC_PATH__;