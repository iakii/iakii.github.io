/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}
function waitForRender(cb) {
  if (typeof window.render === "function") {
    cb();
  } else {
    setTimeout(() => waitForRender(cb), 50);
  }
}

// 微前端环境下，注册mount和unmount方法
if (window.__POWERED_BY_QIANKUN__) {
  console.log("注册微前端生命周期");
} else {
  waitForRender(() => {
    window.render();
  });
}

((global) => {
  global["purehtml"] = {
    bootstrap: () => {
      console.log("purehtml bootstrap");
      return Promise.resolve();
    },
    mount: () => {
      console.log("purehtml mount");
      return new Promise((resolve, reject) => {
        try {
          waitForRender(() => {
            try {
              window.render();
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        } catch (e) {
          reject(e);
        }
      });
    },
    unmount: () => {
      console.log("purehtml unmount");
      return unmount();
    },
  };
})(window);
