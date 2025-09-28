import template from "../template"
import mammoth from "mammoth";
import * as XLSX from "xlsx";


/**
 * 统一打印方法
 * @param {Object} options
 * @param {'html'|'pdf'|'doc'|'excel'} options.type - 打印类型
 * @param {string} options.template - 模板路径（html/pdf/doc/excel）
 * @param {Object} [options.data] - 渲染数据
 */
export async function printFile({ type = "html", template, data = {} }) {
  if (type === "html") {
    await printHtml(data, template);
    return;
  }
  if (type === "pdf") {
    await printPdf(template);
    return;
  }
  if (type === "doc") {
    await printDoc(data, template);
    return;
  }
  if (type === "excel") {
    await printExcel(data, template);
    return;
  }
  throw new Error("不支持的打印类型: " + type);
}


// content: 模板字符串，data: 渲染数据
export function generateHTML(content, data) {
  try {
    const html = template.render(content, data);
    return html;
  } catch (error) {
    console.log("generateHTML error", error);
    return "";
  }
}

export async function printHtml(data = {}, templateName = "tpl/teplate.html") {
  const templateContent = await fetch(templateName).then((res) => res.text());
  const html = generateHTML(templateContent, { data });
  printTeplate(html);
}

export async function printPdf(templateName = "tpl/teplate.html") {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none"; // 隐藏iframe

  console.log("iframe 加载完成", iframe.src);
  iframe.onload = function () {
    try {
      if (
        iframe.contentWindow &&
        iframe.contentWindow.document.readyState === "complete"
      ) {
        console.log(2);

        //打印前事件
        iframe.contentWindow.onbeforeprint = () => {
          console.log("打开打印弹框");
        }; //打印后事件
        iframe.contentWindow.onafterprint = () => {
          console.log("关闭打印弹框");
          document.body.removeChild(iframe);
        };

        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        console.log(3333);
        setTimeout(() => {
          // document.body.removeChild(iframe);
          // iframe.src = "";
        }, 3000);
      }
    } catch (error) {
      console.error("打印失败：", error);
      alert("无法打印PDF，请检查文件地址或浏览器设置");
    } finally {
    }
  };

  iframe.src = `/${templateName}`;
  document.body.appendChild(iframe);
}

export async function printDoc(data = {}, templateName = "tpl/1.doc") {
  const arrayBuffer = await fetch(templateName).then((res) =>
    res.arrayBuffer()
  );
  // 1. 使用 mammoth 转换 DOCX
  const result = await mammoth.convertToHtml(
    { arrayBuffer },
    { ignoreEmptyParagraphs: true }
  );
  const html = generateHTML(result.value, data); // 转换后的 HTML

  const docHtml = `
  <!DOCTYPE html><html>
  <head>
    <style>
      /* 确保表格边框在打印时显示 */
      body{
        font-family: 'NSimSun', '新宋体', 'SimSun', '宋体', serif;
        font-size: 10.5pt;
      }
        table {
    border-collapse: collapse;
    width: 100%;
    font-family: 'NSimSun', '新宋体', 'SimSun', '宋体', serif;
  }
 table th,table td {
    border: 1px solid #444 !important;
    border-color: #444 !important;
    border-style: solid !important;
    border-width: 1px !important;
    padding: 4px 8px;
    text-align: left;
  }
     table, tr, td, th {
                          page-break-inside: avoid;
                        }
                        tbody {
                          page-break-after: auto;
                        }
 table th {
    font-weight: bold;
    text-shadow: 0.15pt 0px 0px black,
      0.25pt 0px 0px black,
      0.35pt 0px 0px black,
      -0.25pt 0px 0px black,
      0px 0.25pt 0px black,
      0px -0.25pt 0px black;
  }
      /* 打印样式 */
      @media print {

      }
      @page {
        size: A4 {{landscape || 'portrait' }};
        margin: 8mm 8mm 16mm 8mm;
        font-family: 'NSimSun', '新宋体', 'SimSun', '宋体', serif;
        @bottom-center {
          content: "第" counter(page) "页 / 共" counter(pages) "页";
          font-size: 12px;
        }
      }
    </style>
  </head>
    <body>${html}
    </body>
  </html>
  `;

  printTeplate(docHtml);
}

export async function printExcel(data = {}, templateName = "tpl/1.xls") {
  const arrayBuffer = await fetch(templateName).then((res) =>
    res.arrayBuffer()
  );
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  // 获取第一个工作表的名称
  const firstSheetName = workbook.SheetNames[0];
  // 获取第一个工作表的数据
  const worksheet = workbook.Sheets[firstSheetName];
  // 2. 将工作表转换为 HTML 表格
  const excelPrintCss = `
  <style>
  /* 确保表格边框在打印时显示 */
    body{
      font-size: 13px;
      font-family: 'NSimSun', '新宋体', 'SimSun', '宋体', serif;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        font-family: 'NSimSun', '新宋体', 'SimSun', '宋体', serif;
        font-size: 12px;
    }
    table, tr, td, th {
      page-break-inside: avoid;
    }
    tbody {
      page-break-after: auto;
    }
    table th,table td {
        border: 1px solid #444 !important;
        border-color: #444 !important;
        border-style: solid !important;
        border-width: 1px !important;
        padding: 4px 8px;
        text-align: left;
      }
    table th {
        font-weight: bold;
        text-shadow: 0.15pt 0px 0px black,
          0.25pt 0px 0px black,
          0.35pt 0px 0px black,
          -0.25pt 0px 0px black,
          0px 0.25pt 0px black,
          0px -0.25pt 0px black;
      }
  /* 打印样式 */
  @media print {
   table th,table td {
      border: 1px solid #444 !important;
      border-color: #444 !important;
      border-style: solid !important;
      border-width: 1px !important;
    }
   table th {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      background-color: #f2f2f2 !important;
    }
   table tr {
      page-break-inside: avoid;
    }
  }
  @page {
    size: A4 {{landscape || 'portrait' }};
    margin: 8mm 8mm 16mm 8mm;
    font-family: 'NSimSun', '新宋体', 'SimSun', '宋体', serif;
    @bottom-center {
      content: "第" counter(page) "页 / 共" counter(pages) "页";
      font-size: 12px;
    }
  }
  </style>
  `;
  const htmlString = XLSX.utils.sheet_to_html(worksheet, {
    header: `<!DOCTYPE html><html><head>${excelPrintCss}</head><body><div id="printArea">`, // 自定义表格头，方便加样式
    footer: "</div></body></html>",
  });
  // 包裹表格内容，方便打印区域控制
  const html = htmlString;
  printTeplate(html);
}

export async function printTeplate(html = "<h1>Hello World</h1>") {
  console.log(2222, html);

  const iframe = document.createElement("iframe");

  iframe.style.display = "none"; // 隐藏iframe
  document.body.appendChild(iframe);
  iframe.onload = function () {
    // 监听打印事件（需在内容写入后绑定）
    const doc = iframe.contentWindow.document;
    doc.onbeforeprint = () => {
      console.log("打开打印弹框");
    };
    doc.onafterprint = () => {
      console.log("关闭打印弹框");
    };
    // 执行打印
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 500);
  };
  // 写入内容并关闭文档，触发 onload
  iframe.contentDocument.open();
  iframe.contentDocument.writeln(html);
  iframe.contentDocument.close();
}
