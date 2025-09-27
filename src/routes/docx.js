import { useRef, useState } from "react";
import {
  EyeOutlined,
  FileAddOutlined,
  FileWordOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import Editor from '@monaco-editor/react';
import { Button, Space, Typography, Upload, message } from "antd";
import art from "../core/template";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/docx')({
  component: WordTab,
});

/**
 * WordTab 组件
 * @param {Object} props
 * @param {string} props.wordParams - Word 参数 JSON 字符串
 * @param {function(string):void} props.setWordParams - 设置 Word 参数的方法
 * @param {string} props.wordPreviewHtml - Word 预览 HTML
 * @param {function():void} props.onPreview - 触发预览的方法
 * @param {function():void} props.onPrint - 触发打印的方法
 * @param {function(File):void} props.setWordFile - 设置 Word 文件的方法
 * @param {function(File):void} props.onWordFilePreview - Word 文件上传后预览的方法
 */
export default function WordTab(props) {
  const {
    wordParams,
    setWordParams,
    wordPreviewHtml,
    onPreview,
    onPrint,
    setWordFile,
    onWordFilePreview,
  } = props;
  const [artPreviewHtml, setArtPreviewHtml] = useState("");
  // 示例参数
  const exampleParams =
    '{\n  "title": "示例标题",\n  "author": "张三",\n  "date": "2025-09-27"\n}';

  // monaco editor 实例用 useRef
  const editorRef = useRef(null);

  // 格式化 JSON
  const handleFormat = () => {
    if (editorRef.current) {
      const action = editorRef.current.getAction('editor.action.formatDocument');
      if (action) action.run();
    }
  };

  const uploadProps = {
    accept:
      ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    showUploadList: false,
    beforeUpload: (file) => {
      if (!file.name.endsWith(".docx")) {
        message.error("只支持.docx文件");
        return false;
      }
      setWordFile(file);
      onWordFilePreview(file);
      return false;
    },
  };

  // art-template 合并参数和html
  const handleArtPreview = () => {
    try {
      const params = JSON.parse(wordParams);
      const html = art.render(wordPreviewHtml, params);
      console.log(wordPreviewHtml, params, html);
      setArtPreviewHtml(html);
    } catch (e) {
      setArtPreviewHtml(
        `<div style='color:red'>参数或模板错误: ${e.message}</div>`
      );
    }
  };

  return (
    <ProCard layout="column" ghost bordered style={{ minHeight: 600 }}>
      <ProCard
        headerBordered
        title={
          <span>
            <FileWordOutlined style={{ color: "#1890ff", marginRight: 8 }} />
            Word 参数与预览
          </span>
        }
        colSpan={15}
        bodyStyle={{ padding: 24 }}
        extra={
          <Space>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} block>
                选择Word文件
              </Button>
            </Upload>
            <Button
              icon={<FileAddOutlined />}
              onClick={() => setWordParams(exampleParams)}
            >
              示例参数
            </Button>
            <Button icon={<EyeOutlined />} onClick={handleArtPreview}>
              设置参数预览
            </Button>
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={onPrint}
              disabled={!wordPreviewHtml}
            >
              打印
            </Button>
          </Space>
        }
      >
        <Typography.Text strong>参数设置 (JSON)</Typography.Text>
        <Button size="small" style={{ marginBottom: 8 }} onClick={handleFormat}>
          格式化
        </Button>
        <Editor
          height={500}
          width="100%"
          language="json"
          theme="vs-dark"
          value={wordParams}
          options={{
            fontSize: 16,
            minimap: { enabled: true },
            fontFamily: "monospace",
            scrollBeyondLastLine: false,
            contextmenu: true,
            formatOnPaste: true,
            formatOnType: true,
            selectOnLineNumbers: true
          }}
          onChange={(v) => setWordParams(v)}
          onMount={(editor) => { editorRef.current = editor; }}
        />

        <div style={{ marginTop: 24 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            选择文件后自动预览，支持.docx
          </Typography.Text>
        </div>
      </ProCard>
      <ProCard
        headerBordered
        title={<Typography.Text strong>预览</Typography.Text>}
        bodyStyle={{
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "auto",
          height: "100%",
        }}
        colSpan={8}
        style={{
          background: "#fff",
          borderRadius: 8,
          minHeight: 300,
          width: "210mm",
          maxHeight: "calc(100vh - 120px)",
        }}
      >
        <div
          style={{
            background: "#fff",
            width: "210mm",
            minHeight: "297mm",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            borderRadius: 8,
            padding: 24,
            overflow: "auto",
            maxHeight: "calc(100vh - 160px)",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: artPreviewHtml || wordPreviewHtml,
            }}
          />
        </div>
      </ProCard>
    </ProCard>
  );
}
