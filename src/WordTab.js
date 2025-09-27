import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Card, Button, Space, Typography, Upload, message } from "antd";
import { ProCard } from "@ant-design/pro-components";
import {
  FileWordOutlined,
  EyeOutlined,
  PrinterOutlined,
  UploadOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import art from "./template";

export default function WordTab({
  wordParams,
  setWordParams,
  wordPreviewHtml,
  onPreview,
  onPrint,
  setWordFile,
  onWordFilePreview,
}) {
  const [artPreviewHtml, setArtPreviewHtml] = useState("");
  // 示例参数
  const exampleParams =
    '{\n  "title": "示例标题",\n  "author": "张三",\n  "date": "2025-09-27"\n}';

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
    <ProCard split="vertical" ghost bordered style={{ minHeight: 600 }}>
      <ProCard
        headerBordered
        title={
          <span>
            <FileWordOutlined style={{ color: "#1890ff", marginRight: 8 }} />
            Word 参数与预览
          </span>
        }
        collapsible
        defaultCollapsed={false}
        style={{ flex: 1 }}
        bodyStyle={{ padding: 24 }}
      >
        <Typography.Text strong>参数设置 (JSON)</Typography.Text>
        <MonacoEditor
          height={500}
          width="100%"
          language="json"
          theme="vs-dark"
          value={wordParams}
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            fontFamily: "monospace",
            scrollBeyondLastLine: false,
          }}
          onChange={(v) => setWordParams(v)}
        />
        <Space style={{ marginTop: 12 }}>
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
        <div style={{ marginTop: 24 }}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} block>
              选择Word文件
            </Button>
          </Upload>
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
