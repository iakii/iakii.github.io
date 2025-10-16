import { AppstoreOutlined } from "@ant-design/icons";
import { ProCard, ProTable } from "@ant-design/pro-components";
import { Editor } from "@monaco-editor/react";
import { createFileRoute } from "@tanstack/react-router";

import * as Babel from "@babel/standalone";
import { Button, Card, Collapse, Descriptions, Space, Tag } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SchemaProvider, SchemaRender } from "react-schema-render";
const { Panel } = Collapse;

const components = {
  Collapse,
  Panel,
  Space,
  Button,
  ProCard,
  Card,
  ProTable,
  Tag,
  Descriptions,
};

export const Route = createFileRoute("/react")({
  component: RouteComponent,
  staticData: {
    icon: <AppstoreOutlined />,
    name: "React Schema Render示例",
    index: -1,
  },
});

const $root = {
  useState,
  useEffect,
  useRef,
  useMemo,
  React,
};

const initialSchema = `const render = ($root) => {
  console.log("$root", $root);
  const App = () => {
    const  [name,setName]=$root.useState("张三");
    return (
      <div onClick={()=>setName("李四")}>{name}</div>
    )
  }
  return {
    component: "ProCard",
    children: [
      {
        component: "ProTable",
        dataSource: [
          { id: 1, name: "张三", age: 28 },
          { id: 2, name: "李四", age: 32 },
          { id: 3, name: "王五", age: 24 },
        ],
        columns: [
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "姓名", dataIndex: "name", key: "name" },
          {
            title: "年龄", dataIndex: "age", key: "age", render: (_, { age }) => {
              return {
                component: 'Tag', children: age + " 1 岁"
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
        ],
        rowKey: "id",
        pagination: false,
        search: false,
      },

      {
        component: 'div', children: (
          <App />
        )
      },
      {
        component: "Descriptions",
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


        )

      }

    ]
  }
}`;

function RouteComponent() {
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
      console.log("raw schema", raw);
      const normalized = normalizeSchema(raw);
      setSchema(normalized);
    } catch (e) {
      console.error("render error", e);
      setSchema({ component: "div", children: `渲染错误: ${e.message}` });
    }
  }

  // 递归归一化 schema：如果 children 是对象则包装成数组，保证 children 要么为数组，要么为基本类型/字符串
  function normalizeSchema(node) {
    if (node == null) return node;
    // 如果传入的是一个数组，递归处理每一项
    if (Array.isArray(node)) {
      return node.map(normalizeSchema);
    }
    // 基本类型直接返回
    if (typeof node !== "object") return node;
    const copy = { ...node };
    if (copy.children !== undefined) {
      const ch = copy.children;
      if (Array.isArray(ch)) {
        copy.children = ch.map(normalizeSchema);
      } else if (ch == null) {
        // keep null/undefined
      } else if (typeof ch === "object") {
        // single object -> wrap to array
        copy.children = [normalizeSchema(ch)];
      } else {
        copy.children = ch;
      }
    }
    return copy;
  }

  return (
    <ProCard ghost>
      <ProCard
        ghost
        title="代码"
        headerBordered
        extra={<Button onClick={handlePreview}>预览</Button>}
      >
        <Editor
          height="calc(100vh - 300px)"
          width="100%"
          language="javascript"
          theme="vs-dark"
          value={reactCode}
          options={{
            fontSize: 16,
            minimap: { enabled: true },
            fontFamily: "Consolas, Courier New, monospace",
            scrollBeyondLastLine: false,
          }}
          onChange={(v) => setReactCode(v)}
        />
      </ProCard>

      <ProCard title="预览效果" ghost>
        <SchemaProvider components={components}>
          <SchemaRender schema={schema}></SchemaRender>
        </SchemaProvider>
      </ProCard>
    </ProCard>
  );
}
