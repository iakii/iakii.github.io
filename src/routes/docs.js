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
import { ProCard, ProList } from "@ant-design/pro-components";
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
  meta: { title: "资源目录 - iAkii的个人资源目录" },
  // 添加cdn
  head: {
    scripts: [
      {
        src: "https://cdn.tailwindcss.com/3.4.1",
        crossOrigin: "anonymous",
      },
    ],
    styles: [
      {
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
        integrity:
          "sha512-dNmEQz5N4d7e6e5z1Z5f5e5z1Z5f5e5z1Z5f5e5z1Z5f5e5z1Z5f5e5z1Z5f5e5z1Z5f5e5z1Z5f5e5z1Z5f5e==",
        crossOrigin: "anonymous",
      },
    ],
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
    title: "开发助手",
    icon: "fa-code",
    items: [
      {
        title: "处理JSON字符串的JavaScript数据",
        url: "/tools/json_js/",
        type: "开发助手",
        icon: "fa-file-code",
        date: "2025.05.18",
      },
      {
        title: "处理JSON字符串转TS模型",
        url: "/tools/json2ts/",
        type: "开发助手",
        icon: "fa-exchange-alt",
        date: "2025.05.18",
      },
      {
        title: "处理JSON字符串转Dart模型",
        url: "/tools/json2dart/",
        type: "开发助手",
        icon: "fab fa-android",
        date: "2025.05.18",
      },
      {
        title: "解析YAML文件",
        url: "/tools/parse_yaml/",
        type: "开发助手",
        icon: "fa-cog",
        date: "2025.05.18",
      },
    ],
  },
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
      <ProCard colSpan={4}>
        {list.map((item) => (
          <ProList
            tableStyle={{ width: 200 }}
            key={item.title}
            cardProps={{
              headerBordered: true,
              title: item.title,
            }}
            rowKey="title"
            dataSource={item.items}
            showActions="hover"
            onRow={(row) => {
              return {
                onClick: () => {
                  setLoading(true);
                  setIframeSrc(row.url);
                },
              };
            }}
            metas={{
              title: {
                dataIndex: "title",
                render: (dom, row) => <a>{dom}</a>,
              },
              avatar: {
                render: (_, row) => iconMap[row.icon],
              },
              description: {
                render: (_, row) => row.type + row.date,
              },
              onClick: (_, row) => {
                alert(row.url);
              },
            }}
            style={{ background: "transparent" }}
            bordered={false}
            split
          />
        ))}
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
