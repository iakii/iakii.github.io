import { createFileRoute } from "@tanstack/react-router";

import jsPreviewDocx from "@js-preview/docx";
import "@js-preview/docx/lib/index.css";
import { Button } from "antd";
import mammoth from "mammoth";
import html2pdf from "html2pdf";

//初始化时指明要挂载的父元素Dom节点

//传递要预览的文件地址即可

export const Route = createFileRoute("/previewDoc")({
  component: RouteComponent,
  staticData: {
    name: "在线预览docx文件",
  },
});

export const importSDK = (src, fn, type) => {
  let document = window.document;
  const scripts = Array.from(document.getElementsByTagName("script")).map(
    (s) => s.src
  );
  // 判断是否已包含该 src 的 script 标签
  const exist = scripts.some(
    (s) => s.src && s.src.indexOf(src.replace(".", "")) > -1
  );
  if (exist) {
    fn && fn();
    return;
  }

  const body = document.head || document.body;
  const oScript = document.createElement("script");
  oScript.type = type || "text/javascript";
  oScript.src = src;
  oScript.onload = fn;
  oScript.onerror = fn;
  body.appendChild(oScript);
};

async function convertDocxToPdf(file) {
  // 1. 将 File 对象转为 ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // 2. 使用 mammoth 转为 HTML
  const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
  const html = result.value; // 转换后的 HTML 内容

  // 3. 创建一个隐藏容器来承载 HTML
  const container = document.createElement("div");
  container.innerHTML = html;
  container.style.padding = "20px";
  document.body.appendChild(container);

  // 4. 使用 html2pdf 导出
  const opt = {
    margin: 1,
    filename: "output.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  document.querySelector("#previewdocx").appendChild(container);

  importSDK(
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",
    async () => {
      console.log("html2pdf.js loaded");
      await html2pdf().set(opt).from(container).save();
    }
  );

  // await html2pdf().set(opt).from(container).save();
  // 5. 移除临时容器
  document.body.removeChild(container);
}

function RouteComponent() {
  return (
    <div id="previewdocx">
      <Button
        onClick={() => {
          console.log("选择文件进行预览");
          const input = document.createElement("input");
          input.type = "file";
          // input.accept =
          //   ".doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
              await convertDocxToPdf(file);
            }
          };

          input.click();
        }}
      >
        预览
      </Button>
    </div>
  );
}
