import { PrinterTwoTone } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Space } from "antd";
import { printDoc, printExcel, printHtml, printPdf } from "../core/printCore";

export const Route = createFileRoute("/print")({
  component: RouteComponent,
  staticData: {
    icon: <PrinterTwoTone />,
    name: "打印测试",
    index: 1,
  },
});

const option = {
  columns: [
    {
      field: "0",
      title: "name",
    },
    {
      field: "1",
      title: "age",
    },
    {
      field: "2",
      title: "gender",
    },
    {
      field: "3",
      title: "hobby",
    },
  ],
};
const records = new Array(80).fill(["张三", 18, "男性", "🏀"]);

function RouteComponent() {
  return (
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
  );
}
