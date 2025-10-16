import { AppstoreOutlined } from "@ant-design/icons";
import { ProCard, ProTable } from "@ant-design/pro-components";
import { Editor } from "@monaco-editor/react";
import { createFileRoute } from "@tanstack/react-router";
import * as Babel from "@babel/standalone";
import { Button, Descriptions, Space } from "antd";
import React, {
  Fragment,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { formatCode } from "./utils/formatCode";
import { SchemaProvider, SchemaRender } from "react-schema-render";
import printMgr from "../../core/utils";
import { antComponents } from "./utils/antcomp";
import { iconComponents, reactComponents } from "./utils/iconcomp";
import { proComponents } from "./utils/procomp";
import loadsh from "lodash-es";
import dayjs from "dayjs";

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

const initialSchema = `const render = ($root) => {
  console.log("$root", $root);
  const App = () => {
    const [name, setName] = $root.useState("张三");
    return (
      <ProCard ghost direction='column'>
        <Button onClick={() => setName("李四")}>{name}</Button>

        <ProTable
          style={{ margin: "12px 0" }}
          size="small"
          bordered
          dataSource={[
            { id: 1, name: "张三", age: 28 },
            { id: 2, name: "李四", age: 32 },
            { id: 3, name: "王五", age: 24 },
          ]}
          columns={[
            { title: "ID", dataIndex: "id", key: "id" },
            { title: "姓名", dataIndex: "name", key: "name" },
            {
              title: "年龄", dataIndex: "age", key: "age", render: (_, { age }) => {
                return {
                  component: 'Tag', children: age + " 岁"
                };
              }
            },
            {
              title: "操作",
              valueType: "option",
              render: (_, record) => {
                return {
                  component: 'Button', type: 'link', children: '查看详情', onClick: () => {
                    alert("查看 " + record.name + " 的详情");
                  }
                }
              }
            },
          ]}
          rowKey="id"
          pagination={false}
          search={false}
        />
        <ProCard>
          <Descriptions title='用户信息' layout='vertical' size='small' bordered>
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </ProCard>
      </ProCard>
    )
  }
  return {
    component: "div",
    children: <App />
  }
}`;

function RouteComponent() {
  // 格式化代码
  function format() {
    try {
      setReactCode(formatCode(reactCode));
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert("格式化失败：" + e.message);
    }
  }
  const [reactCode, setReactCode] = useState(initialSchema);

  const [schema, setSchema] = useState({
    component: "Descriptions",
    title: "User Info",
    size: "small",
    bordered: true,
    layout: "vertical",
    children: (
      <>
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </>
    ),
  });

  function handlePreview() {
    try {
      // 使用 Babel 将含 JSX 的代码编译为普通 JS
      const transformed = Babel.transform(reactCode, {
        presets: ["react"],
      }).code;
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

  // 注册 components 变量到 monaco 的全局类型声明，提升自动补全体验
  const handleEditorWillMount = (monaco) => {
    // 注册 components 到 js/ts
    const componentKeys = Object.keys(components);
    const componentTypeDefs = `declare const components: {\n${componentKeys.map((k) => `  ${k}: any;`).join("\n")}\n};`;
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      componentTypeDefs,
      "ts:filename/components.d.ts"
    );
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      "declare const $root: any;",
      "ts:filename/root.d.ts"
    );
  };

  return (
    <ProCard ghost>
      <ProCard
        title="代码"
        headerBordered
        bodyStyle={{ padding: 0 }}
        extra={
          <Space>
            <a onClick={handlePreview}>预览</a>
            {/* <a onClick={format}>格式化</a> */}
          </Space>
        }
      >
        <Editor
          height="calc(100vh - 90px)"
          width="100%"
          theme="vs-dark"
          value={reactCode}
          language="javascript"
          options={{
            fontSize: 16,
            minimap: { enabled: true },
            fontFamily: "Consolas, Courier New, monospace",
            scrollBeyondLastLine: false,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            wordBasedSuggestions: true,
            tabCompletion: "on",
            snippetSuggestions: "inline",
            parameterHints: { enabled: true },
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            autoSurround: "languageDefined",
          }}
          onChange={(v) => setReactCode(v)}
          beforeMount={handleEditorWillMount}
        />
      </ProCard>

      <ProCard
        title="预览效果"
        headerBordered
        bodyStyle={{ padding: 12, background: "#f6f6f7" }}
      >
        <SchemaProvider components={components}>
          <SchemaRender schema={schema}></SchemaRender>
        </SchemaProvider>
      </ProCard>
    </ProCard>
  );
}
