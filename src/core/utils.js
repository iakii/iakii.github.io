const { snapdom } = require("./snapdom.mjs");
import docToHtml from "./docToHtml";

export default class printMgr {
  static async snapshotFunc(html, params = { landscape: "portrait" }) {
    const size =
      params.landscape === "landscape" ? "width:296mm;" : "width:209mm;";
    const img = await printMgr.snapshotHtmlToImg(html, params);
    printMgr.print("html", {
      html: `<div class="img" style="${size}"><img src="${img.src}" style="width:100%;height:auto;"/></div>`,
      ...params,
    });
  }

  static getIframe() {
    let existed = !!document.querySelector("#print-iframe");
    let iframe;
    if (existed) {
      iframe = document.querySelector("#print-iframe");
    } else {
      iframe = document.createElement("iframe");
      iframe.id = "print-iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }
    return iframe;
  }

  static print(type, options) {
    const iframe = printMgr.getIframe();
    function doPrint(cleanup) {
      setTimeout(() => {
        try {
          iframe.contentWindow?.print();
        } finally {
          cleanup?.();
          if (type === "html") {
            iframe.parentNode?.removeChild(iframe);
          } else {
            window.onhashchange = function () {
              iframe.parentNode?.removeChild(iframe);
              window.onhashchange = null;
            };
          }
        }
      }, 20);
    }
    if (type === "html" && options.html) {
      iframe.onload = () => doPrint();
      iframe.contentDocument?.open();
      const htmlContent = options.html.includes("<!DOCTYPE html>")
        ? options.html
        : printMgr._generateHtml(options.html, options);
      iframe.contentDocument?.write(htmlContent);
      iframe.contentDocument?.close();
    } else if (type === "pdf" && options.pdf) {
      if (typeof options.pdf === "string") {
        iframe.onload = () => doPrint(() => {});
        iframe.src = options.pdf;
      } else if (options.pdf instanceof Blob) {
        const url = URL.createObjectURL(options.pdf);
        iframe.onload = () => doPrint(() => URL.revokeObjectURL(url));
        iframe.src = url;
      }
    }
  }

  static async snapshotHtmlToImg(html, options = { landscape: "portrait" }) {
    // 创建隐藏 iframe
    const iframe = document.createElement("iframe");
    iframe.style.zIndex = "-1";
    iframe.style.position = "fixed";
    iframe.style.top = "-9999px";
    iframe.style.left = "-9999px";
    // iframe.style.top = "0";
    // iframe.style.left = "0";
    iframe.style.border = "0";
    iframe.style.background = "white";
    if (options.landscape === "landscape") {
      iframe.style.width = "297mm";
      iframe.style.minHeight = "190mm";
    } else {
      iframe.style.width = "210mm";
      iframe.style.minHeight = "287mm";
    }
    document.documentElement.insertBefore(iframe, document.body);
    // 内容写入
    return new Promise((resolve, reject) => {
      iframe.onload = async function () {
        setTimeout(async () => {
          try {
            const image = await snapdom.toPng(iframe.contentDocument.body, {
              embedFonts: true,
              type: "svg",
              dpr: 3,
            });
            resolve(image);
          } catch (err) {
            reject(err);
          } finally {
            iframe.parentNode?.removeChild(iframe);
          }
        }, 20);
      };
      iframe.contentDocument?.open();
      const htmlContent = printMgr._generateHtml(html, options);
      iframe.contentDocument?.write(htmlContent);
      iframe.contentDocument?.close();
    });
  }
  static _generateHtml(html, options) {
    const size =
      options.landscape === "landscape"
        ? "width:297mm;height:210mm;"
        : "width: 210mm;height: 297mm;";

    const showPageSize = options.showPageSize
      ? `@bottom-center { content: "第" counter(page) "页 / 共" counter(pages) "页";font-size: 12px; color:grey;font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif; } `
      : "";

    const showPrintTime = options.showPrintTime
      ? `@top-left { content: "打印时间：${new Date().toLocaleString()}";color:grey; font-size: 12px;font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif; } `
      : "";

    return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print</title>
          <style>
            body { margin: 0; padding: 0; background: #fff; ${size} color: #000; font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif; font-size: 14px; }
            table { border-collapse: collapse; font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif; }
            table thead th { font-weight: bold; -webkit-text-stroke: 0.4px; }
            th, td { padding: 0 4px; text-align: left; font-size: 14px; border: 1px solid #000; }
            @page { size: A4 ${options.landscape || "portrait"}; ${size} ${showPageSize} ${showPrintTime}  margin: 8mm 8mm 16mm 0;}
            .font-500-bold { font-weight: 500; -webkit-text-stroke: 0.2px; }
            .font-600-bold { font-weight: 600; -webkit-text-stroke: 0.3px; }
            .font-700-bold { font-weight: 700; -webkit-text-stroke: 0.4px; }
            .font-800-bold { font-weight: 800; -webkit-text-stroke: 0.5px; }
            .font-900-bold { font-weight: 900; -webkit-text-stroke: 0.6px; }
            .font-bold { font-weight: bold; -webkit-text-stroke: 0.4px; }
            .no-border { border-left: 0; border-right: 0; border-top: 0  }
            .d-flex {  display: flex; align-items: center; justify-content: center; gap:8px; }
          </style>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `;
  }
}

const word = document.querySelector("#word");
word?.addEventListener("click", async function () {
  const arrayBuffer = await fetch("123.docx").then((res) => res.arrayBuffer());

  docToHtml(arrayBuffer)
    .then(function (resHtml) {})
    .catch(function (err) {
      console.log(err);
    });
});

export function showPreviewModal(resHtml) {
  console.log(111, resHtml);

  // if (resHtml) {
  //   printMgr.print("html", { html: resHtml });
  //   return;
  // }
  // 遮罩层
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.transition = "opacity 0.3s";
  overlay.style.opacity = "0";

  // 内容区
  const content = document.createElement("div");
  content.innerHTML = resHtml;
  content.style.width = "210mm";
  content.style.height = "297mm";
  content.style.background = "#fff";
  content.style.borderRadius = "8px";
  content.style.boxShadow = "0 0 24px rgba(0,0,0,0.25)";
  content.style.position = "relative";
  content.style.overflow = "auto";
  content.style.padding = "8mm 8mm 16mm";
  content.style.transform = "scale(0.85)";
  content.style.opacity = "0";
  content.style.transition =
    "transform 0.3s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.3s";

  // 关闭按钮
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "关闭";
  closeBtn.style.padding = "8px 32px";
  closeBtn.style.background = "#d60000";
  closeBtn.style.color = "#fff";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "4px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.fontSize = "16px";
  closeBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.removeChild(overlay);
  });
  overlay.appendChild(closeBtn);

  const print = document.createElement("button");
  print.innerText = "打印";
  print.style.padding = "8px 32px";
  print.style.background = "#2915ddff";
  print.style.color = "#fff";
  print.style.border = "none";
  print.style.borderRadius = "4px";
  print.style.cursor = "pointer";
  print.style.fontSize = "16px";
  print.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  print.addEventListener("click", (e) => {
    e.stopPropagation();
    printMgr.print("html", { html: resHtml });
  });
  overlay.appendChild(print);

  // 点击遮罩关闭
  overlay.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
  content.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  overlay.appendChild(content);
  document.body.appendChild(overlay);

  // 弹出动画
  setTimeout(() => {
    overlay.style.opacity = "1";
    content.style.transform = "scale(1)";
    content.style.opacity = "1";
  }, 10);
}
