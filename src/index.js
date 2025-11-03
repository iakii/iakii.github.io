import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";
import { routeTree } from "./router";
import "@ant-design/v5-patch-for-react-19";
import { registerMicroApps, start } from "qiankun";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}

function render(props) {
  const { container } = props;
  // ReactDOM.render(
  //   <App />,
  //   container
  //     ? container.querySelector("#root")
  //     : document.querySelector("#root")
  // );

  ReactDOM.createRoot(
    container
      ? container.querySelector("#root")
      : document.getElementById("root")
  ).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});

  // registerMicroApps([
  //   {
  //     name: "reactApp",
  //     entry: "//localhost:5173",
  //     container: "#container",
  //     activeRule: "/app-react",
  //   },
  // ]);
  // 启动 qiankun
  start();
}
