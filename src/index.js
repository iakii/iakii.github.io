import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./router";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

