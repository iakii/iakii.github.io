const { snapdom } = require("./snapdom.mjs");
import docToHtml from "./docToHtml";
// import "./index.css";

// const rootEl = document.querySelector("#root");
// if (rootEl) {
//   rootEl.innerHTML = `
//   <div class="content">
//     <h1>Vanilla Rsbuild</h1>
//     <p>Start building amazing things with Rsbuild.</p>
//     <button class="btn" id='print'>打印PDF</button>
//     <button class="btn" id='change'>change</button>
//     <button class="btn" id='snapshot'>截图</button>
//     <button class="btn" id='word'>Word</button>
//   </div>
// `;
// }

export default class printMgr {
  static async snapshotFunc() {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>政府公文示例</title>
      <style>
        body {
          margin: 0;
          padding: 8mm 8mm 16mm;
          background: #fff;
          width: 210mm;
          height: 297mm;
          color: #d60000;
          font-family: '宋体', '宋体-简', Avenir, Helvetica, Arial, sans-serif;
          position: relative;
        }
        .doc-title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-top: 40px;
          margin-bottom: 30px;
          color: #d60000;
        }
        .doc-meta {
          text-align: center;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .doc-content {
          font-size: 18px;
          line-height: 2;
          text-indent: 2em;
          margin-bottom: 40px;
          color: #d60000;
        }
        .doc-footer {
          text-align: right;
          font-size: 16px;
          margin-top: 60px;
        }
        .seal {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 80px;
          height: 80px;
          pointer-events: none;
          z-index: 2;
        }
      </style>
    </head>
    <body>
      <div class="doc-title">关于进一步加强政务信息化建设的通知</div>
      <div class="doc-meta">发文单位：国家信息中心</div>
      <div class="doc-meta">文号：国信发〔2025〕12号</div>
      <div class="doc-content">
        各省、自治区、直辖市信息中心：<br><br>
        为贯彻落实党中央、国务院关于数字中国建设的决策部署，进一步提升政务信息化水平，现就有关事项通知如下：<br><br>
        一、加强顶层设计，完善信息化发展规划。各地要结合实际，制定切实可行的信息化发展方案，确保与国家总体规划相衔接。<br><br>
        二、加快基础设施建设，提升数据资源整合能力。要推进政务数据共享交换平台建设，实现数据互联互通。<br><br>
        三、强化安全保障，完善信息安全管理体系。要落实网络安全责任制，提升应急处置能力。<br><br>
        请各地认真贯彻执行本通知要求，及时反馈工作进展情况。
      </div>
      <div class="doc-footer" style="position: relative; min-height: 90px;">
        国家信息中心<br>
        2025年9月26日
        <div class="seal">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <!-- 路径半径32，距离外边框4px -->
              <path id="textCirclePath" d="M40,40 m-32,0 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0"/>
            </defs>
            <circle cx="40" cy="40" r="36" stroke="#d60000" stroke-width="4" fill="none"/>
            <text fill="#d60000" font-size="12" font-family="'宋体', Arial" font-weight="bold">
              <textPath xlink:href="#textCirclePath" startOffset="0">
                国家信息中心国家信息中心
              </textPath>
            </text>
            <!-- 五角星居中，标准五角星算法 -->
            <polygon points="40,26 46.18,36.18 58.04,38.09 49.02,46.18 51.76,58.09 40,52 28.24,58.09 30.98,46.18 21.96,38.09 33.82,36.18" fill="#d60000" />
          </svg>
        </div>
      </div>
    </body>
    </html>
  `;
    const img = await printMgr.snapshotHtmlToImg(html);
    printMgr.print("html", { html: `<img class='img' src="${img.src}"/>` });
  }

  static getIframe() {
    let existed = !!document.querySelector("#print-iframe");
    let iframe;
    if (existed) {
      iframe = document.querySelector("#print-iframe")  ;
    } else {
      iframe = document.createElement("iframe");
      iframe.id = "print-iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }
    return iframe;
  }

  static print(
    type,
    options
  ) {
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
      iframe.contentDocument?.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print</title>
          <style>
             .img {
              width: 210mm;
              height: 297mm;
             }
             body {
              margin: 0;
              padding: 0;
              background: #fff;
              width: 210mm;
              height: 297mm;
              color: #000;
              font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
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

  static async snapshotHtmlToImg(html) {
    // 创建隐藏 iframe
    const iframe = document.createElement("iframe");
    iframe.style.zIndex = "-1";
    iframe.style.position = "fixed";
    iframe.style.top = "-9999px";
    iframe.style.left = "-9999px";
    iframe.style.border = "0";
    iframe.style.width = "210mm";
    iframe.style.height = "297mm";
    document.documentElement.insertBefore(iframe, document.body);

    // 内容写入
    return new Promise((resolve, reject) => {
      iframe.onload = async function () {
        setTimeout(async () => {
          try {
            const image = await snapdom.toPng(iframe, { embedFonts: false });
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
