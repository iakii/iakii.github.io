import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  index("routes/app.tsx", { id: "app" }),
] satisfies RouteConfig;
