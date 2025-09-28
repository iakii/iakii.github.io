import React, { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input, Button, Radio, Space, message } from "antd";
import Editor from "@monaco-editor/react";
import { ProCard } from "@ant-design/pro-components";
import { CodeTwoTone } from "@ant-design/icons";

const defaultJson = `{
  "run": "这里是示例数据，可以通过输入字段名提取内容"
}`;

const typeOptions = [
  { label: "Javascript", value: "javascript" },
  { label: "HTML", value: "html" },
  { label: "JSON", value: "json" },
];

function JsonJsTool() {
  const [inputValue, setInputValue] = useState("run");
  const [type, setType] = useState("javascript");
  const inputEditorRef = useRef(null);
  /** @type {import("react").MutableRefObject<IStandaloneCodeEditor>} */
  const outputEditorRef = useRef(null);

  // 提取字段
  const handleExtract = () => {
    const inputEditor = inputEditorRef.current;
    const outputEditor = outputEditorRef.current;
    if (!inputEditor) return;
    const jsonValue = inputEditor.getValue();
    if (!jsonValue) {
      message.warning("请先输入数据");
      return;
    }
    if (!inputValue) {
      message.warning("请先输入提取字段");
      return;
    }
    try {
      const data = JSON.parse(jsonValue);
      outputEditor && outputEditor.setValue(data[inputValue] || "没有该字段");
    } catch (e) {
      outputEditor && outputEditor.setValue("");
      message.error("数据格式不正确: " + e.message);
    }
  };

  // 保存（Ctrl+S）- input 区
  const handleExtractSave = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleExtract();
    }
  };

  // 保存（Ctrl+S）- output 区
  const handleRestoreSave = (e) => {
    e.preventDefault();
    const inputEditor = inputEditorRef.current;
    const outputEditor = outputEditorRef.current;
    if (!inputEditor || !outputEditor) return;
    const jsonValue = inputEditor.getValue();
    const outputValue = outputEditor.getValue();
    if (!inputValue) {
      message.warning("请先输入提取字段");
      return;
    }
    try {
      const data = JSON.parse(jsonValue);
      if (outputValue === data[inputValue]) {
        message.info("数据没有变化");
        return;
      }
      data[inputValue] = outputValue;
      inputEditor.setValue(JSON.stringify(data, null, 2));
      message.success("已还原到原数据");
    } catch (err) {
      message.error("数据格式不正确: " + err.message);
    }
  };

  return (
    <ProCard
      title="处理JSON字符串的JavaScript数据"
      direction="row"
      wrap
      headerBordered
      gutter={[12, 12]}
      bodyStyle={{ padding: 0, background: "#f6f6f7" }}
    >
      <ProCard
        colSpan={12}
        bodyStyle={{ padding: 0 }}
        direction="column"
        headerBordered
        title={
          <Space>
            <Radio.Group
              options={typeOptions}
              onChange={(e) => setType(e.target.value)}
              value={type}
              optionType="button"
              buttonStyle="solid"
            />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleExtract();
                handleExtractSave(e);
              }}
              style={{ fontSize: 16 }}
              placeholder="请输入字段名"
            />
          </Space>
        }
        extra={
          <Button type="primary" onClick={handleExtract}>
            提取字段
          </Button>
        }
      >
        <Editor
          height="calc(100vh - 142px)"
          defaultLanguage="json"
          language="json"
          defaultValue={defaultJson}
          onMount={(editor) => {
            inputEditorRef.current = editor;
            editor.onKeyDown((e) => {
              if ((e.ctrlKey || e.metaKey) && e.code === "KeyS") {
                handleExtractSave({
                  ctrlKey: e.ctrlKey,
                  metaKey: e.metaKey,
                  key: "s",
                  preventDefault: () => e.preventDefault(),
                });
              }
              if (e.code === "Enter") {
                handleExtract();
              }
            });
          }}
          options={{
            fontSize: 16,
            fontFamily: "monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            theme: "vs",
          }}
          key="source"
        />
      </ProCard>
      <ProCard
        colSpan={12}
        bodyStyle={{ padding: 0 }}
        direction="column"
        headerBordered
        title={
          <Button
            type="primary"
            onClick={(e) => {
              // 还原字段逻辑
              if (!inputValue) {
                message.warning("请先输入提取字段");
                return;
              }
              try {
                handleRestoreSave(e);
              } catch (err) {
                message.error("数据格式不正确: " + err.message);
              }
            }}
          >
            还原字段
          </Button>
        }
      >
        <Editor
          height="calc(100vh - 142px)"
          defaultLanguage={type}
          language={type}
          onMount={(editor) => {
            outputEditorRef.current = editor;
            editor.onKeyDown((e) => {
              if ((e.ctrlKey || e.metaKey) && e.code === "KeyS") {
                handleRestoreSave(e);
              }
            });
          }}
          options={{
            fontSize: 16,
            fontFamily: "monospace",
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            theme: "vs",
          }}
          key="out"
        />
      </ProCard>
    </ProCard>
  );
}

export const Route = createFileRoute("/jsonJs")({
  component: JsonJsTool,
  staticData: {
    name: "JSON & JS",
    icon: <CodeTwoTone />,
    index: 4,
  },
});
