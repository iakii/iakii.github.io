import {
  AndroidOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  RestTwoTone,
  SettingOutlined,
  SolutionOutlined,
  SwapOutlined,
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

const iconMap = {
  "fa-code": <CodeOutlined />,
  "fa-file-code": <FileTextOutlined />,
  "fa-exchange-alt": <SwapOutlined />,
  "fab fa-android": <AndroidOutlined />,
  "fa-cog": <SettingOutlined />,
  "fa-heartbeat": <HeartOutlined />,
  "fa-check": <CheckCircleOutlined />,
  "fa-clipboard-check": <AuditOutlined />,
  "fa-vial": <ExperimentOutlined />,
  "fa-pills": <MedicineBoxOutlined />,
  "fa-prescription": <SolutionOutlined />,
};

const list = [
  {
    title: "医疗常识",
    icon: "fa-heartbeat",
    items: [
      {
        title: "护理质量检查",
        url: "/html/护理质量检查.html",
        type: "医疗常识",
        date: "2025.05.30",
        icon: "fa-check",
      },
      {
        title: "护理质量检查流程图",
        url: "/html/护理质量检查-流程图.html",
        type: "医疗常识",
        date: "2025.05.30",
        icon: "fa-clipboard-check",
      },
      {
        title: "临床采血管功能指南",
        url: "/html/临床采血管功能指南.html",
        type: "医疗常识",
        date: "2025.05.15",
        icon: "fa-vial",
      },
      {
        title: "给药途径概述与分类",
        url: "/html/给药途径概述与分类.html",
        type: "医疗常识",
        date: "2025.05.15",
        icon: "fa-pills",
      },
      {
        title: "医嘱频次缩写指南",
        url: "/html/医嘱频次缩写指南.html",
        type: "医疗常识",
        date: "2025.05.15",
        icon: "fa-prescription",
      },
    ],
  },
];

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
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
      <ProCard colSpan={"200px"} bodyStyle={{ padding: 0 }}>
        <Menu
          mode="inline"
          items={list.map((group) => ({
            key: group.title,
            label: group.title,
            type: "group",
            children: group.items.map((item) => ({
              key: item.url,
              icon: iconMap[item.icon],
              label: item.title,
            })),
          }))}
          onClick={({ key }) => {
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
