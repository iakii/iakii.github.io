import {
  AndroidOutlined,
  AntDesignOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  ExperimentOutlined,
  FileMarkdownOutlined,
  FileTextOutlined,
  HeartOutlined,
  JavaOutlined,
  JavaScriptOutlined,
  MedicineBoxOutlined,
  PythonOutlined,
  RestTwoTone,
  SettingOutlined,
  SignatureOutlined,
  SolutionOutlined,
  SwapOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Menu } from "antd";
import { createFileRoute } from "@tanstack/react-router";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
  staticData: {
    name: "资源目录",
    icon: <RestTwoTone />,
    index: 3,
  },
});

const list = [
  {
    title: "医疗常识",
    icon: <HeartOutlined />,
    items: [
      {
        title: "护理质量检查",
        url: "/html/护理质量检查.html",
        type: "医疗常识",
        date: "2025.05.30",
        icon: <CheckCircleOutlined />,
      },
      {
        title: "护理质量检查流程图",
        url: "/html/护理质量检查-流程图.html",
        type: "医疗常识",
        date: "2025.05.30",
        icon: <AuditOutlined />,
      },
      {
        title: "临床采血管功能指南",
        url: "/html/临床采血管功能指南.html",
        type: "医疗常识",
        date: "2025.05.15",
        icon: <ExperimentOutlined />,
      },
      {
        title: "给药途径概述与分类",
        url: "/html/给药途径概述与分类.html",
        type: "医疗常识",
        date: "2025.05.15",
        icon: <MedicineBoxOutlined />,
      },
      {
        title: "医嘱频次缩写指南",
        url: "/html/医嘱频次缩写指南.html",
        type: "医疗常识",
        date: "2025.05.15",
        icon: <SolutionOutlined />,
      },
    ],
  },
  {
    title: "工具",
    icon: <ToolOutlined />,
    items: [
      {
        title: "签名小工具",
        url: "https://lazybrush.dulnan.net/",
        type: "工具",
        date: "2025.05.30",
        icon: <SignatureOutlined />,
      },
      {
        title: "React+Antd CDN使用示例",
        url: "/html/cdn-antd.html",
        type: "工具",
        date: "2025.05.30",
        icon: <AntDesignOutlined />,
      },
      {
        title: "解析yaml",
        url: "/tools/parse_yaml/",
        type: "工具",
        date: "2025.10.19",
        icon: <JavaOutlined />,
      },
      {
        title: "JSON转Dart在线工具",
        url: "/tools/json2dart/",
        type: "工具",
        date: "2025.10.19",
        icon: <PythonOutlined />,
      },
      {
        title: "JSON转TS在线工具",
        url: "/tools/json2ts/",
        type: "工具",
        date: "2025.10.19",
        icon: <JavaScriptOutlined />,
      },
    ],
  },

  {
    title: "文档",
    icon: <FileMarkdownOutlined />,
    items: [
      {
        title: "OpenHarmony API11 设备开发预研与问题解决方案",
        url: "/md?name=app",
        type: "文档",
        date: "2025.05.30",
        icon: <FileMarkdownOutlined />,
      },
      {
        title: "静配中心（PIVAS）流程图",
        url: "/md?name=2",
        type: "工具",
        date: "2025.10.19",
        icon: <FileMarkdownOutlined />,
      },
      {
        title: "Mermaid中文网",
        url: "/md?name=3",
        type: "工具",
        date: "2025.10.19",
        icon: <FileMarkdownOutlined />,
      },
      {
        title: "护理质量检查流程图",
        url: "/md?name=1",
        type: "工具",
        date: "2025.10.19",
        icon: <FileMarkdownOutlined />,
      },
    ],
  },
];

function RouteComponent() {
  const [loading, setLoading] = useState(true);
  const [iframeSrc, setIframeSrc] = useState("/tools/json2ts/");
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeSrc) {
      iframeRef.current.contentDocument.write("<h3>请选择左侧的资源</h3>");
      return;
    }
  }, [iframeSrc]);

  return (
    <ProCard
      title="资源目录"
      headerBordered
      direction="row"
      bodyStyle={{ background: "#f6f6f7", padding: 0 }}
    >
      <ProCard colSpan={"230px"} bodyStyle={{ padding: 0 }}>
        <Menu
          mode="inline"
          accessKey={iframeSrc}
          items={list.map((group) => ({
            key: group.title,
            label: group.title,
            icon: group.icon,
            type: "group",
            children: group.items.map((item) => ({
              key: item.url,
              icon: item.icon,
              label: item.title,
            })),
          }))}
          onClick={({ key }) => {
            if (key === iframeSrc) return;
            setLoading(true);
            setIframeSrc(key);
          }}
        />
      </ProCard>

      <ProCard ghost>
        <Spin spinning={loading} tip="Loading..." size="large">
          <iframe
            id="iframe"
            ref={iframeRef}
            src={iframeSrc}
            onLoad={() => setLoading(false)}
            style={{ width: "100%", height: "calc(100vh - 65px)", border: 0 }}
          />
        </Spin>
      </ProCard>
    </ProCard>
  );
}
