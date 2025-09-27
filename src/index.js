const { snapdom } = require('./snapdom.mjs');

export default class printMgr {

  /**
   * @description
   * @author 熊凯(一只熊猫🐼)
   * @date 26/09/2025
   * @static
   * @return {HTMLIFrameElement}
   * @memberof printMgr
   */
  static getIframe() {
    let existed = !!document.querySelector("#print-iframe");
    let iframe;
    if (existed) {
      iframe = document.querySelector("#print-iframe");
    } else {
      iframe = document.createElement('iframe');
      iframe.id = 'print-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    return iframe;
  }
  /**
   * @description
   * @author 熊凯(一只熊猫🐼)
   * @date 26/09/2025
   * @static
   * @param {'html' | 'pdf'} type
   * @param {{html?: string; pdf?: string | Blob}} options
   * @memberof printMgr
   */
  static print(type, options) {
    const iframe = printMgr.getIframe();
    function doPrint(cleanup) {
      setTimeout(() => {
        try {
          iframe.contentWindow?.print();
        } finally {
          cleanup?.();
          if (type === 'html') {
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
    if (type === 'html' && options.html) {
      iframe.onload = () => doPrint();
      iframe.contentDocument?.open();
      iframe.contentDocument?.writeln(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print</title>
          <style>
            img, body {
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
    } else if (type === 'pdf' && options.pdf) {
      if (typeof options.pdf === 'string') {
        iframe.onload = () => doPrint(() => { });
        iframe.src = options.pdf;
      } else if (options.pdf instanceof Blob) {
        const url = URL.createObjectURL(options.pdf);
        iframe.onload = () => doPrint(() => URL.revokeObjectURL(url));
        iframe.src = url;
      }
    }
  }


  /**
   * @description
   * @author 熊凯(一只熊猫🐼)
   * @date 26/09/2025
   * @static
   * @param {string} html
   * @memberof printMgr
   * @returns {HTMLImageElement}
   */
  static async snapshotHtmlToImg(html) {
    // 创建隐藏 iframe
    const iframe = document.createElement('iframe');
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
      iframe.contentDocument?.writeln(html);
      iframe.contentDocument?.close();
    });
  }
}
