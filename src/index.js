import "@ant-design/v5-patch-for-react-19";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./router";
// import { registerMicroApps, start } from "qiankun";

import microApp from "@micro-zoe/micro-app";

microApp.start({
  disableScopecss: true,
  // shadowDOM: true,
});

const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

const App = () => {
  return (
    <StrictMode>
      <div id="container" />
      <RouterProvider router={router} />
    </StrictMode>
  );
};

function render(props) {
  const { container } = props;
  ReactDOM.createRoot(
    container
      ? container.querySelector("#root")
      : document.getElementById("root")
  ).render(<App />);
}

render({});

// registerMicroApps([
//   {
//     name: "app1",
//     entry: {
//       scripts: ["/app1/app1.umd.cjs"],
//       html: `<div id="root"></div>`,
//     },
//     container: "#app1container",
//     activeRule: "/#/micro/",
//     props: {},
//   },
// ]);
// // // 启动 qiankun
// start({
//   sandbox: { strictStyleIsolation: true }, // 样式隔离（可选）
// });
