import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * a4纸的尺寸[595.28,841.89], 单位毫米
 * @type {[number, number]}
 */
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;

/**
 * 纸张配置
 * @type {{portrait: {height: number, width: number, contentWidth: number}, landscape: {height: number, width: number, contentWidth: number}}}
 */
const PAPER_CONFIG = {
  /** 竖向 */
  portrait: {
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    contentWidth: 560
  },
  /** 横向 */
  landscape: {
    height: PAGE_WIDTH,
    width: PAGE_HEIGHT,
    contentWidth: 800
  }
};

/**
 * 将元素转化为canvas元素，通过放大提高清晰度
 * @param {HTMLElement} element - 需要转化的DOM元素
 * @param {number} width - 内容宽度
 * @returns {Promise<{width: number, height: number, data: string}>}
 */
async function toCanvas(element, width) {
  if (!element) return { width, height: 0 };

  const canvas = await html2canvas(element, {
    scale: window.devicePixelRatio * 1,
    useCORS: true
  });

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const height = (width / canvasWidth) * canvasHeight;
  const canvasData = canvas.toDataURL('image/jpeg', 1.0);

  return { width, height, data: canvasData };
}

/**
 * 生成pdf(A4多页pdf截断问题， 包括页眉、页脚 和 上下左右留空的护理)
 * @param {Object} options
 * @param {HTMLElement} options.element - pdf内容的dom元素
 * @param {HTMLElement} [options.footer] - 页脚dom元素
 * @param {HTMLElement} [options.header] - 页眉dom元素
 * @param {string} options.filename - pdf文件名
 * @param {'portrait'|'landscape'} [options.orientation] - a4值的方向
 * @returns {Promise<void>}
 */
export async function outputPDF({
  element,
  footer,
  header,
  filename,
  orientation = 'portrait'
}) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  if (!['portrait', 'landscape'].includes(orientation)) {
    return Promise.reject(
      new Error(
        'Invalid Parameters: the parameter {orientation} is assigned wrong value, you can only assign it with {portrait} or {landscape}'
      )
    );
  }
  const A4_WIDTH = PAPER_CONFIG[orientation].width;
  const A4_HEIGHT = PAPER_CONFIG[orientation].height;
  const contentWidth = PAPER_CONFIG[orientation].contentWidth;

  const pdf = new jsPDF({
    unit: 'pt',
    format: 'a4',
    orientation
  });

  const { width, height, data } = await toCanvas(element, contentWidth);

  function addImage(_x, _y, pdfInstance, base_data, _width, _height) {
    pdfInstance.addImage(base_data, 'JPEG', _x, _y, _width, _height);
  }

  function addBlank(x, y, _width, _height) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, Math.ceil(_width), Math.ceil(_height), 'F');
  }

  const footerResult = footer ? await toCanvas(footer, contentWidth) : { height: 0, data: undefined };
  const headerResult = header ? await toCanvas(header, contentWidth) : { height: 0, data: undefined };
  const tFooterHeight = footerResult.height;
  const headerData = footerResult.data;
  const tHeaderHeight = headerResult.height;
  const footerData = headerResult.data;

  async function addHeader(headerElement) {
    if (headerData) {
      pdf.addImage(headerData, 'JPEG', 0, 0, contentWidth, tHeaderHeight);
    }
  }

  async function addFooter(pageNum, now, footerElement) {
    if (footerData) {
      pdf.addImage(
        footerData,
        'JPEG',
        0,
        A4_HEIGHT - tFooterHeight,
        contentWidth,
        tFooterHeight
      );
    }
  }

  const baseX = (A4_WIDTH - contentWidth) / 2;
  const baseY = 15;
  const originalPageHeight = A4_HEIGHT - tFooterHeight - tHeaderHeight - 2 * baseY;
  const elementWidth = element.offsetWidth;
  const rate = contentWidth / elementWidth;

  function getElementTop(contentElement) {
    if (contentElement.getBoundingClientRect) {
      const rect = contentElement.getBoundingClientRect() || {};
      const topDistance = rect.top;
      return topDistance;
    }
  }

  const pages = [rate * getElementTop(element)];

  function traversingNodes(nodes) {
    for (const element of nodes) {
      const one = element;
      const isTableRow = one.classList && one.classList.contains('ant4-table-row');
      const offsetHeight = one.offsetHeight;
      const offsetTop = getElementTop(one);
      const top = rate * offsetTop;
      const rateOffsetHeight = rate * offsetHeight;
      if (isTableRow) {
        updateTablePos(rateOffsetHeight, top);
      } else {
        updateNormalElPos(top);
        traversingNodes(one.childNodes);
      }
      updatePos();
    }
  }

  function updateNormalElPos(top) {
    if (
      top - (pages.length > 0 ? pages[pages.length - 1] : 0) >= originalPageHeight
    ) {
      pages.push(
        (pages.length > 0 ? pages[pages.length - 1] : 0) + originalPageHeight
      );
    }
  }

  function updateTablePos(eHeight, top) {
    if (
      top - (pages.length > 0 ? pages[pages.length - 1] : 0) >= originalPageHeight
    ) {
      pages.push(
        (pages.length > 0 ? pages[pages.length - 1] : 0) + originalPageHeight
      );
    } else if (
      top + eHeight - (pages.length > 0 ? pages[pages.length - 1] : 0) >
        originalPageHeight &&
      top !== (pages.length > 0 ? pages[pages.length - 1] : 0)
    ) {
      pages.push(top);
    }
  }

  traversingNodes(element.childNodes);

  function updatePos() {
    while (pages[pages.length - 1] + originalPageHeight < height) {
      pages.push(pages[pages.length - 1] + originalPageHeight);
    }
  }

  const newPages = pages.map(function(item) { return item - pages[0]; });

  for (let i = 0; i < newPages.length; ++i) {
    addImage(
      baseX,
      baseY + tHeaderHeight - newPages[i],
      pdf,
      data,
      width,
      height
    );
    addBlank(0, tHeaderHeight, A4_WIDTH, baseY);
    addBlank(0, A4_HEIGHT - baseY - tFooterHeight, A4_WIDTH, baseY);
    if (i < newPages.length - 1) {
      const imageHeight = newPages[i + 1] - newPages[i];
      addBlank(
        0,
        baseY + imageHeight + tHeaderHeight,
        A4_WIDTH,
        A4_HEIGHT - imageHeight
      );
    }
    if (header) {
      await addHeader(header);
    }
    if (footer) {
      await addFooter(newPages.length, i + 1, footer);
    }
    if (i !== newPages.length - 1) {
      pdf.addPage();
    }
  }
  return pdf.save(filename);
}
