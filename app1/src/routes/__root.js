import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <ul>
        <li>
          <Link to={"/"}>首页</Link>
        </li>
        <li>
          <Link to={"/app"}>应用</Link>
        </li>
        <li>
          <Link to={"/about"}>关于</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
