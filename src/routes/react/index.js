import { AppstoreOutlined } from "@ant-design/icons";
import { ProCard, ProSkeleton } from "@ant-design/pro-components";
import * as Babel from "@babel/standalone";
import { createFileRoute } from "@tanstack/react-router";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import loadsh from "lodash-es";
import React, {
  Fragment,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SchemaProvider, SchemaRender } from "react-schema-render";
import printMgr from "../../core/utils";
import SchemaDrawer from "./components/SchemaDrawer";
import { antComponents } from "./utils/antcomp";
import { iconComponents, reactComponents } from "./utils/iconcomp";
import { proComponents } from "./utils/procomp";

const components = {
  ...proComponents,
  ...antComponents,
  ...iconComponents,
  ...reactComponents,
  Fragment,
  lazy,
};

export const Route = createFileRoute("/react/")({
  component: RouteComponent,
  staticData: {
    icon: <AppstoreOutlined />,
    name: "React Schema Render示例",
    index: -1,
  },
});

const $root = {
  React,
  useState,
  useEffect,
  useRef,
  useMemo,
  printMgr,
  loadsh,
  dayjs,
};

function RouteComponent() {
  const [schema, setSchema] = useState({
    component: "ProCard",
    children: [
      {
        component: "Descriptions",
        title: "User Info",
        size: "small",
        bordered: true,
        layout: "vertical",
        children: (
          <>
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </>
        ),
      },
    ],
  });

  function handlePreview(reactCode) {
    try {
      // 使用 Babel 将含 JSX 的代码编译为普通 JS

      console.time("babel解析耗时");
      const transformed = Babel.transform(reactCode, {
        presets: ["react"],
      }).code;
      console.timeEnd("babel解析耗时");
      // 注入 $root、React 以及 components 中的变量
      const argNames = ["$root", "React", ...Object.keys(components)];
      const fn = new Function(
        ...argNames,
        `${transformed}; return render($root);`
      );
      const argValues = [$root, React, ...Object.values(components)];
      const raw = fn(...argValues);
      setSchema(raw);
    } catch (e) {
      console.error("render error", e);
      setSchema({ component: "div", children: `渲染错误: ${e.message}` });
    }
  }

  return (
    <ProCard ghost>
      <ProCard
        title="预览效果"
        headerBordered
        bodyStyle={{ padding: 12, background: "#f6f6f7" }}
        extra={
          <SchemaDrawer components={components} onFinish={handlePreview} />
        }
      >
        <React.Suspense fallback={<ProSkeleton type="result" />}>
          <SchemaProvider components={components}>
            <SchemaRender schema={schema}></SchemaRender>
          </SchemaProvider>
        </React.Suspense>
      </ProCard>
    </ProCard>
  );
}
