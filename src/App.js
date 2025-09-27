import React, { useState } from "react";
import React, { useState } from "react";
import docToHtml from "./docToHtml";
import "./index.css";
import printMgr from "./utils";
import PdfTab from "./PdfTab";
import WordTab from "./WordTab";
import HtmlTab from "./HtmlTab";
import { ProCard } from "@ant-design/pro-components";
import "antd/dist/reset.css";

const tabList = [
  { key: "pdf", label: "打印PDF" },
  { key: "word", label: "打印Word" },
  { key: "html", label: "打印Html模板" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("pdf");

  // Word 文件上传后立即预览
  const handleWordFilePreview = async (file) => {
    setWordFile(file);
    await handleWordPreview(file, wordParams);
  };
  // PDF
  const [pdfUrl, setPdfUrl] = useState("");
  // Word
  const [wordParams, setWordParams] = useState('{\n  "title": "示例标题"\n}');
  const [wordPreviewHtml, setWordPreviewHtml] = useState("");
    const [wordFile, setWordFile] = useState(null);
  // HTML
  const [htmlParams, setHtmlParams] = useState('{\n  "name": "张三"\n}');
  const [htmlTemplate, setHtmlTemplate] = useState("<div>你好，{{name}}</div>");
  const [htmlPreview, setHtmlPreview] = useState("");

  // PDF Tab
  const handlePdfFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfUrl(URL.createObjectURL(file));
    }
  };
  const handlePdfPrint = () => {
    if (pdfUrl) printMgr?.print("pdf", { pdf: pdfUrl });
  };

  // Word Tab
  // Word 预览（参数或文件变化时调用）
  const handleWordPreview = async (file = wordFile, params = wordParams) => {
    try {
      let arrayBuffer;
      if (file instanceof File) {
        arrayBuffer = await file.arrayBuffer();
      } else if (typeof file === 'string') {
        // 兼容老逻辑，默认示例文件
        arrayBuffer = await fetch(file).then(res => res.arrayBuffer());
      } else {
        // 没有文件，直接报错
        throw new Error('请先选择Word文件');
      }
      const html = await docToHtml(arrayBuffer, JSON.parse(params));
      setWordPreviewHtml(html);
    } catch (e) {
      setWordPreviewHtml(`<div style='color:red'>参数或文件错误: ${e.message}</div>`);
    }
  };
  const handleWordPrint = () => {
    if (wordPreviewHtml) printMgr?.print("html", { html: wordPreviewHtml });
  };

  // HTML Tab
  const handleHtmlPreview = () => {
    let html = htmlTemplate;
    try {
      const params = JSON.parse(htmlParams);
      Object.keys(params).forEach((k) => {
        html = html.replaceAll(`{{${k}}}`, params[k]);
      });
    } catch {}
    setHtmlPreview(html);
  };
  const handleHtmlPrint = () => {

    console.log(2,htmlPreview);

    if (htmlPreview) printMgr?.print("html", { html: htmlPreview });
  };

  return (
    <ProCard
      title="多功能打印示例"
      tabs={{
        type: "card",
        activeKey: activeTab,
        onChange: setActiveTab,
        items: [
          {
            key: "pdf",
            label: "打印PDF",
            children: (
              <PdfTab
                pdfUrl={pdfUrl}
                onFile={handlePdfFile}
                onPrint={handlePdfPrint}
              />
            ),
          },
          {
            key: "word",
            label: "打印Word",
            children: (
              <WordTab
                wordParams={wordParams}
                setWordParams={setWordParams}
                wordPreviewHtml={wordPreviewHtml}
                onPreview={() => handleWordPreview()}
                onPrint={handleWordPrint}
                setWordFile={setWordFile}
                onWordFilePreview={handleWordFilePreview}
              />
            ),
          },
          {
            key: "html",
            label: "打印Html模板",
            children: (
              <HtmlTab
                htmlParams={htmlParams}
                setHtmlParams={setHtmlParams}
                htmlTemplate={htmlTemplate}
                setHtmlTemplate={setHtmlTemplate}
                htmlPreview={htmlPreview}
                onPreview={handleHtmlPreview}
                onPrint={handleHtmlPrint}
              />
            ),
          },
        ],
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 100,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      }}
      bodyStyle={{ padding: 24, paddingTop: 56 }}
    />
  );
}
