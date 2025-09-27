import { HomeFilled, InfoCircleFilled } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
export default function About() {
  return (
    <div style={{ fontSize: 24, margin: 40 }}>
      关于页面（自动路由示例）abiyt
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: About,
  staticData: {
    name: "关于",
    icon: <InfoCircleFilled />,
    index: 9,
  },
  head: () => ({
    meta: [
      {
        name: "description",
        content: "My App is a web application",
      },
      {
        title: "My App",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    styles: [
      {
        media: "all and (max-width: 500px)",
        children: `p {
                  color: blue;
                  background-color: yellow;
                }`,
      },
    ],
    scripts: [
      {
        src: "https://www.google-analytics.com/analytics.js",
      },
    ],
  }),
});
