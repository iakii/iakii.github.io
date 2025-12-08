// 尺寸常量
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PDF_MARGIN_MM = 10;
const PDF_CONTENT_WIDTH_MM = A4_WIDTH_MM - PDF_MARGIN_MM * 2; // 190mm
const PDF_CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PDF_MARGIN_MM * 2; // 277mm

// 1mm = 3.7795275590551 像素（96 DPI）
const MM_TO_PX = 3.7795275590551;

import { jsPDF } from "jspdf";

/**
 * 从分页图片创建 PDF
 */
/**
 * @description
 * @author 熊凯(一只熊猫🐼)
 * @date 08/12/2025
 * @export
 * @param {{dataUrl: string; width: number; height: number;}[]} pages
 * @return {jsPDF}  {jsPDF}
 */
export function createPdfFromPages(pages) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true, // 启用压缩，减小文件体积
  });

  if (pages.length === 0) {
    throw new Error("没有可添加的页面");
  }

  pages.forEach((page, index) => {
    // 第一页直接用，后续需要 addPage
    if (index > 0) {
      pdf.addPage();
    }

    // 像素转毫米（考虑 scale=2）
    const scaleFactor = 2;
    const pageHeightMm = page.height / MM_TO_PX / scaleFactor;

    // 图片适配内容区域宽度
    const finalWidth = PDF_CONTENT_WIDTH_MM; // 190mm
    const finalHeight = pageHeightMm;

    // 位置：左上角对齐，保留 10mm 边距
    const x = PDF_MARGIN_MM;
    const y = PDF_MARGIN_MM;

    console.log(
      `添加第 ${index + 1} 页: ${finalWidth}x${finalHeight.toFixed(2)}mm`
    );

    // 添加图片到 PDF
    pdf.addImage(page.dataUrl, "PNG", x, y, finalWidth, finalHeight);
  });

  return pdf;
}

/**
 * 将长图片分割成多个 A4 页面
 */
/**
 *
 * @param {string} imageDataUrl
 * @returns  { Promise<{dataUrl: string; width: number; height: number;}[]>}
 */
export async function splitImageIntoPages(imageDataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const pages = [];
      const originalWidth = img.width;
      const originalHeight = img.height;

      // 将 A4 内容区域转换为像素（考虑 scale=2）
      const pageContentHeightPx = Math.floor(
        PDF_CONTENT_HEIGHT_MM * MM_TO_PX * 2 // scale=2
      );
      const pageContentWidthPx = Math.floor(
        PDF_CONTENT_WIDTH_MM * MM_TO_PX * 2
      );

      // 计算缩放比例（图片宽度适配页面宽度）
      const widthScale = pageContentWidthPx / originalWidth;
      const scaledHeight = originalHeight * widthScale;

      // 计算总页数
      const totalPages = Math.ceil(scaledHeight / pageContentHeightPx);

      console.log(`原始尺寸: ${originalWidth}x${originalHeight}px`);
      console.log(`缩放后高度: ${scaledHeight}px, 总页数: ${totalPages}`);

      // 逐页裁剪
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startY = pageIndex * pageContentHeightPx;
        const endY = Math.min(startY + pageContentHeightPx, scaledHeight);
        const currentPageHeight = Math.floor(endY - startY);

        // 计算源图片对应的区域
        const sourceStartY = startY / widthScale;
        const sourceHeight = currentPageHeight / widthScale;

        // 创建新 Canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = pageContentWidthPx;
        canvas.height = currentPageHeight;

        // 高质量渲染
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // 绘制当前页内容
        ctx.drawImage(
          img,
          0,
          sourceStartY, // 源图片起始位置
          originalWidth,
          sourceHeight, // 源图片尺寸
          0,
          0, // 目标起始位置
          pageContentWidthPx,
          currentPageHeight // 目标尺寸
        );

        // 转换为 data URL
        const pageDataUrl = canvas.toDataURL(IMAGE_FORMAT, IMAGE_QUALITY);

        pages.push({
          dataUrl: pageDataUrl,
          width: pageContentWidthPx,
          height: currentPageHeight,
        });

        console.log(`第 ${pageIndex + 1}/${totalPages} 页处理完成`);
      }

      resolve(pages);
    };

    img.onerror = () => reject(new Error("图片加载失败"));
    img.src = imageDataUrl;
  });
}
