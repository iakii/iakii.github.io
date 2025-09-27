import { createFileRoute } from "@tanstack/react-router";
import {
  FilePdfOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Button, message, Space, Upload } from "antd";

export const Route = createFileRoute("/pdf")({
  component: PdfTab,
});

export default function PdfTab(props) {
  const { pdfUrl, onFile, onPrint } = props;
  const uploadProps = {
    accept: "application/pdf",
    showUploadList: false,
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error("只支持PDF文件");
        return false;
      }
      onFile({ target: { files: [file] } });
      return false;
    },
  };
  return (
    <ProCard
      title={
        <span>
          <FilePdfOutlined style={{ color: "#d60000", marginRight: 8 }} />
          PDF 文件打印
        </span>
      }
      bordered
      headerBordered
      extra={
        <Space>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} block>
              选择PDF文件
            </Button>
          </Upload>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={onPrint}
            disabled={!pdfUrl}
            block
          >
            打印PDF
          </Button>
        </Space>
      }
      bodyStyle={{ padding: 0 }}
    >
      {/* 右侧A4预览区 */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "100%",
            height: "297mm",
            background: "#fafafa",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 0 12px rgba(0,0,0,0.08)",
            overflow: "hidden",
            position: "relative",
            padding: 0,
          }}
        >
          {pdfUrl ? (
            <embed
              src={pdfUrl}
              type="application/pdf"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                margin: 0,
                padding: 0,
                display: "block",
                background: "#fff",
              }}
            />
          ) : (
            <span
              style={{
                color: "#bbb",
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              请先选择PDF文件进行预览
            </span>
          )}
        </div>
      </div>
    </ProCard>
  );
}
