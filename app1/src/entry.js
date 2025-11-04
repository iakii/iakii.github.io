// import "./public-path";
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./router";
const base = window.__POWERED_BY_QIANKUN__ ? "/app1" : "/";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
  basepath: base,
});

const App = ({ onRouteCallback }) => {
  const navigate = router.navigate;

  useEffect(() => {
    if (onRouteCallback) onRouteCallback(navigate);
  }, [onRouteCallback]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

function render(props) {
  const { container } = props;
  createRoot(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  ).render(<App {...props} />);
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}

export async function mount(props) {
  console.log("[react16] props from main framework", props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  createRoot(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  ).render(<span />);
}
