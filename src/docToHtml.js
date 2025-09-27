import mammoth from "mammoth";

/**
 * @description 将 Word document 对象转为 HTML，所有样式写在 style 上
 * @param {*} document Word 解析后的对象
 * @returns {string} HTML 字符串
 *
 */
async function documentToHtml(document) {
  const htmlArr = await Promise.all((document.children || []).map(nodeToHtml));
  return htmlArr.join("");
}

async function nodeToHtml(node) {
  // const  ddd=mammoth.transforms.getDescendants(node )

  //  console.log(ddd); // => '#ff0000'

  if (!node) return "";
  switch (node.type) {
    case "paragraph":
      return await paragraphToHtml(node);
    case "table":
      return await tableToHtml(node);
    case "tableRow":
      return await tableRowToHtml(node);
    case "tableCell":
      return await tableCellToHtml(node);
    // 其他类型可扩展
    default:
      return "";
  }
}

async function paragraphToHtml(paragraph) {
  // 标题判断
  let tag = "p";
  let style = "";
  if (paragraph.styleName) {
    const s = paragraph.styleName.toLowerCase();
    if (s.includes("heading 1") || s.includes("title")) tag = "h1";
    else if (s.includes("heading 2") || s.includes("subtitle")) tag = "h2";
    else if (s.includes("heading 3")) tag = "h3";
  }
  // 对齐
  if (paragraph.alignment === "center") style += "text-align:center;";
  if (paragraph.alignment === "right") style += "text-align:right;";
  // 字号（取最大）
  let maxFontSize = null;
  if (Array.isArray(paragraph.children)) {
    for (const run of paragraph.children) {
      if (run.fontSize && (!maxFontSize || run.fontSize > maxFontSize)) {
        maxFontSize = run.fontSize;
      }
    }
  }
  if (maxFontSize) style += `font-size:${maxFontSize}px;`;
  // 空行
  const isEmpty =
    !paragraph.children ||
    paragraph.children.length === 0 ||
    paragraph.children.every(
      (run) =>
        run.type === "run" &&
        Array.isArray(run.children) &&
        run.children.length === 0
    );
  if (isEmpty) {
    return `<${tag} style="${style}height:1em">&nbsp;</${tag}>`;
  }
  // 正文内容，处理空白下划线
  let inner = "";
  for (const run of paragraph.children || []) {
    if (run.type === "run" && run.isUnderline && Array.isArray(run.children)) {
      // 统计空白 text 节点数量
      const blankCount = run.children.filter((c) => c.type === "tab").length;
      if (blankCount > 0) {
        // 拼接对应数量的下划线 span，增加 display:inline-block 使 width 生效
        inner +=
          `<span style="text-decoration:underline;">` +
          "&nbsp;".repeat(blankCount * 6) +
          "</span>";
        // 继续处理非空内容
        const nonBlank = run.children.filter(
          (c) => !(c.type === "text" && c.value === "")
        );
        if (nonBlank.length > 0) {
          // 构造一个 run 的副本，仅包含非空内容
          const runCopy = { ...run, children: nonBlank };
          inner += await runToHtml(runCopy);
        }
        continue;
      }
    }
    inner += await runToHtml(run);
  }
  return `<${tag} style="${style}">${inner}</${tag}>`;
}

async function runToHtml(run) {
  if (!run) return "";
  if (run.type === "text") {
    return escapeHtml(run.value || "");
  }

  if (run.type === "image") {
    console.log(987654321, run);
    // 处理图片节点，输出 <img src=... width=... height=...>
    let attrs = "";
    if (typeof run.readAsBase64String === "function") {
      const imageBase64 = await run.readAsBase64String();
      if (imageBase64) {
        attrs += ` src="data:${
          run.contentType || "image/png"
        };base64,${imageBase64}"`;
      }
    } else if (run.src) {
      attrs += ` src="${run.src}"`;
    }
    if (run.width) attrs += ` width="${run.width/10000}mm"`;
    if (run.height) attrs += ` height="${run.height/10000}mm"`;
    // 兼容 alt
    if (run.alt) attrs += ` alt="${escapeHtml(run.alt)}"`;
    return `<img${attrs} style="vertical-align:middle;max-width:100%;" />`;
  }
  if (run.type === "run") {
    let style = "";
    if (run.isBold) style += "font-weight:bold;";
    if (run.isItalic) style += "font-style:italic;";
    if (run.isUnderline) style += "text-decoration:underline;";
    if (run.fontSize) style += `font-size:${run.fontSize}px;`;
    if (run.fontFamily) style += `font-family:${run.fontFamily};`;
    if (run.color) {
      style += `color:${run.color};`;
      console.log(555555, style);
    }

    // 颜色等可扩展
    let inner = "";
    if (run.children && run.children.length > 0) {
      const innerArr = await Promise.all(run.children.map(runToHtml));
      inner = innerArr.join("");
    }
    return `<span style="${style}">${inner}</span>`;
  }
  return "";
}

async function tableToHtml(table) {
  let html = '<table style="border-collapse:collapse;width:100%;">';
  if (table.children && table.children.length > 0) {
    const rowArr = await Promise.all(table.children.map(nodeToHtml));
    html += rowArr.join("");
  }
  html += "</table>";
  return html;
}
async function tableRowToHtml(row) {
  let html = "<tr>";
  if (row.children && row.children.length > 0) {
    const cellArr = await Promise.all(row.children.map(nodeToHtml));
    html += cellArr.join("");
  }
  html += "</tr>";
  return html;
}

async function tableCellToHtml(cell) {
  let attrs = "";
  if (cell.colSpan && cell.colSpan > 1) attrs += ` colspan="${cell.colSpan}"`;
  if (cell.rowSpan && cell.rowSpan > 1) attrs += ` rowspan="${cell.rowSpan}"`;
  // 可扩展样式
  let style = "border:1px solid #000;";
  // 渲染内容
  let inner = "";
  if (cell.children && cell.children.length > 0) {
    const innerArr = await Promise.all(cell.children.map(nodeToHtml));
    inner = innerArr.join("");
  }
  return `<td${attrs} style="${style}">${inner}</td>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function docToHtml(document) {
  return new Promise((resolve, reject) => {
    mammoth
      .convertToHtml(
        { arrayBuffer: document },
        {
          transformDocument: async (document) => {
            console.log(3333, document);
            const html = await documentToHtml(document);
            const insertTag = "<body>";
            const insertIndex =
              tempHtml.lastIndexOf(insertTag) + insertTag.length;
            const resHtml =
              tempHtml.slice(0, insertIndex) +
              html +
              tempHtml.slice(insertIndex);
            resolve(resHtml);
            return document;
          },
        }
      )
      .then(null);
  });
}

const tempHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title></title>
    <style>
      html {background: white;color:black;height: 100%;}
      body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
        margin:0;padding:0;
        font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif;
        font-size:12pt;
      }
      body{padding:20px;line-height: 2; max-width: 1200px;margin: 0 auto;}
      h1, .title, .heading1 { font-size: 24pt; font-weight: bold; margin: 1em 0 0.5em 0; }
      h2, .subtitle, .heading2 { font-size: 20pt; font-weight: bold; margin: 1em 0 0.5em 0; }
      h3, .heading3 { font-size: 16pt; font-weight: bold; margin: 1em 0 0.5em 0; }
      h4{font-size:16pt;padding:10px 0;}
      ol,ul {list-style:none;}
      ol,ul,p,table{font-size:14px;}
      i{font-style: normal;}
      a:hover {text-decoration:none;}
      a,dt{-webkit-tap-highlight-color: transparent;-webkit-tap-highlight-color: transparent;}
      a:active {text-decoration:none;-webkit-tap-highlight-color: transparent;-webkit-tap-highlight-color: transparent;}
      ins,a {text-decoration:none;}
      .text-center{text-align: center;}
      .text-right{text-align: right;}
      .underline{text-decoration: underline;}
      table {width: 100%;margin-bottom: 1rem;color: #212529;box-sizing: border-box;}
      table, th, td {border: 1px solid black;border-collapse: collapse;}
      td {padding: 0 10px;}
      .empty {height: 1em;}
    </style>
  </head>
  <body></body>
</html>
`;
