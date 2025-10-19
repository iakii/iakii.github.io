import { PrinterTwoTone } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Space } from "antd";
import { printDoc, printExcel, printHtml, printPdf } from "../../../core/printCore";
import { ProCard, ProTable } from "@ant-design/pro-components";

export const Route = createFileRoute("/print/components/printCore")({
  component: PrintV1Compoent,
  // staticData: {
  //   icon: <PrinterTwoTone />,
  //   name: "打印测试",
  //   index: 1,
  // },
});

const option = {
  columns: [
    {
      field: "0",
      title: "姓名",
    },
    {
      field: "1",
      title: "年龄",
    },
    {
      field: "2",
      title: "性别",
    },
    {
      field: "3",
      title: "爱好",
    },
  ],
};
const records = new Array(80).fill(["张三", 18, "男性", "🏀"]);

export function PrintV1Compoent() {
  return (
    <ProCard>
      <ProTable
        options={false}
        toolBarRender={() => (
          <Space>
            <Button
              onClick={() => {
                printHtml(
                  {
                    landscape: "portrait",
                    // src: canvas.src,
                    name: "张三",
                    age: 18,
                    options: option,
                    records: records,
                  },
                  "tpl/teplate.html"
                );
              }}
            >
              打印
            </Button>

            <Button
              onClick={() => {
                printHtml(
                  {
                    options: option,
                    records: records,
                    landscape: "landscape",
                    // src: canvas.src,
                    name: "张三",
                    age: 18,
                  },
                  "tpl/teplate.html"
                );
              }}
            >
              打印(横屏)
            </Button>

            <Button
              onClick={() => {
                printPdf("tpl/1.pdf");
              }}
            >
              打印(PDF)
            </Button>

            <Button
              onClick={() => {
                printDoc(
                  {
                    护士长审核: { reason: "222" },
                    待科护士长审核: { zgyq: 111 },
                    landscape: "landscape",
                  },
                  "tpl/test.docx"
                );
              }}
            >
              打印(word)
            </Button>

            <Button
              onClick={() => {
                printExcel(
                  {
                    护士长审核: { reason: "222" },
                    待科护士长审核: { zgyq: 111 },
                    landscape: "landscape",
                  },
                  "tpl/1.xls"
                );
              }}
            >
              打印(Excel)
            </Button>
          </Space>
        )}
        style={{ width: "210mm", margin: "0 auto" }}
        search={false}
        pagination={false}
        size="small"
        bordered
        columns={option.columns.map((x) => ({ ...x, dataIndex: x.field }))}
        dataSource={records}
      />
    </ProCard>
  );
}
