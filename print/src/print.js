/**
 * 打印管理器
 * @class printMgr
 */
export default class printMgr {
  /**
   * 获取或创建隐藏打印 iframe
   * @returns {HTMLIFrameElement} 打印用的 iframe 元素
   */
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

  /**
   * 触发打印操作
   * @param {('html'|'pdf')} type 打印类型，支持 html 或 pdf
   * @param {Object} options 打印参数
   * @param {string} [options.html] 要打印的 HTML 字符串
   * @param {string|Blob} [options.pdf] 要打印的 PDF 路径或 Blob
   */
  static print(type, options) {
    const iframe = printMgr.getIframe();
    /**
     * 执行打印并清理 iframe
     * @param {Function} [cleanup] 打印后清理回调
     */
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
