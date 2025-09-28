const { snapdom } = require("./snapdom.mjs");
import docToHtml from "./docToHtml";
export default class printMgr {
  static async snapshotFunc(html, params = { landscape: "portrait" }) {
    const size =
      params.landscape === "landscape"
        ? "width:296mm;"
        : "width:209mm;";
    const htmls = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif;
        }
      </style>
    </head>
    <body>
    ${html}
    </body>
    </html>
  `;
    const img = await printMgr.snapshotHtmlToImg(htmls, params.landscape);

    document.body.appendChild(img)

    printMgr.print("html", {
      html: `<img style="${size};object-fit:contain" src="${img.src}"/>`,
      landscape: params.landscape,
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

      const size =
        options.landscape === "landscape"
          ? "width:297mm;height:210mm;"
          : "width: 210mm;height: 297mm;";

      iframe.contentDocument?.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print</title>
          <style>
             .img {
              ${size}
             }
             @page {
              size: A4 ${options.landscape || "portrait"};
              ${size}
              @bottom-center {
                content: "第" counter(page) "页 / 共" counter(pages) "页";
                font-size: 12px;
                color:grey;
              }
              @top-left {
                content: "打印时间：${new Date().toLocaleString()}";
                color:grey;
                font-size: 12px;
              }
             }
             body {
              margin: 0;
              padding: 0;
              background: #fff;
              ${size}
              color: #000;
              font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          ${options.html}
        </body>
        </html>
      `);
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

  static async snapshotHtmlToImg(html, landscape = "portrait") {
    // 创建隐藏 iframe
    const iframe = document.createElement("iframe");
    iframe.style.zIndex = "-1";
    iframe.style.position = "fixed";
    // iframe.style.top = "-9999px";
    // iframe.style.left = "-9999px";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.border = "0";
    // iframe.style.background = "green";
    // iframe.style.padding= "8mm 8mm 16mm";
    if (landscape === "landscape") {
      iframe.style.width = "297mm";
      iframe.style.height = "190mm";
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
            const image = await snapdom.toPng(iframe, {
              embedFonts: false,
              type: "svg",
              dpr: 2,
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
      iframe.contentDocument?.write(html);
      iframe.contentDocument?.close();
    });
  }
}

const btn = document.querySelector("#print");
btn?.addEventListener("click", function () {
  console.log(3333);
  printMgr.print("pdf", { pdf: "/123.pdf" });
});

const word = document.querySelector("#word");
word?.addEventListener("click", async function () {
  const arrayBuffer = await fetch("123.docx").then((res) => res.arrayBuffer());

  docToHtml(arrayBuffer)
    .then(function (resHtml) {
      console.log(111, resHtml);

      if (resHtml) {
        printMgr.print("html", { html: resHtml });
        return;
      }
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
    })
    .catch(function (err) {
      console.log(err);
    });
});
