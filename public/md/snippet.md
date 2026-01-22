# 代码片段
## 导入CDN js代码
```js
  const addScript = (url) => {
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      url = url.replace("/nms", "")
    }

    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src === url) return
    }
    var script = document.createElement("script")
    script.type = "application/javascript"
    script.src = url
    document.head.appendChild(script)
  }

// 使用
  addScript("/nms/javascript/html2pdf.bundle.min.js")

```
## 导入cdn style.css文件
```js
  const loadStyle = (url) => {
    var link = document.createElement("link")
    link.type = "text/css"
    link.rel = "stylesheet"
    link.href = url
    var head = document.getElementsByTagName("head")[0]
    head.appendChild(link)
  }

// 使用
   addScript("/nms/javascript/snapdom.js")
```
## html生成pdf
```js
  const generateHtml = (tabTable, filename, departmentNames, date) => {
    const isolatedTableStyle = `
      <style>
          #pdf-isolated-container {
            background: #fff;
            text-align:center;
            padding: 8mm 4mm;
          }

          /* 1. 允许显示 Footer (因为里面有图表) */
          #pdf-isolated-container .ant-table-footer {
            display: block !important;
            border: none !important;
            padding: 0 !important;
            border-top: none !important; /* 避免跟表格底线重合变粗 */
          }

          /* 1. 隐藏多余组件 */
          #pdf-isolated-container .ant-pro-card-header,
          #pdf-isolated-container .ant-tabs-nav,
          #pdf-isolated-container .ant-table-pagination,
          #pdf-isolated-container .ant-pagination,
          #pdf-isolated-container .ant-table-title {
            display: none !important;
          }

          /* 2. 强制表格模型 */
          #pdf-isolated-container table {
            width: 99% !important;
            border-collapse: collapse !important; /* 核心：合并边框 */
            border-spacing: 0 !important;
            table-layout: fixed !important;
            border: 0.5px solid #666 !important; /* 外边框 */
          }

          /* 3. 核心：强制所有单元格显示边框 */
          /* 这里直接瞄准 ant-table-cell，因为 antd 会在 td 上挂载这个类名 */
          #pdf-isolated-container .ant-table-cell,
          #pdf-isolated-container th,
          #pdf-isolated-container td {
            border: 1px solid #666 !important; /* 内边框加深至 #333 */
            padding: 0 4px !important;
            text-align: center !important;
            background: #ffffff !important;
            color: #333 !important;
            font-size: 12px !important;
            visibility: visible !important;
          }

          /* 4. 清除 Antd 6.x 默认的伪元素分割线（避免干扰） */
          #pdf-isolated-container .ant-table-cell::before {
            display: none !important;
          }

          /* 5. 样式降级：移除 Antd 所有的装饰性容器样式 */
          #pdf-isolated-container .ant-table,
          #pdf-isolated-container .ant-table-container,
          #pdf-isolated-container .ant-table-content {
            border: none !important;
            background: none !important;
            box-shadow: none !important;
            overflow: visible !important; /* 确保边框不被溢出隐藏 */
          }

          /* 6. 标题防截断 */
          .ant-pro-table-list-toolbar-title {
            page-break-inside: avoid !important;
            display: block !important;
            font-weight: bold;
            font-size: 16px;
            color: #000;
          }

          /* 7. 分页保护 */
          #pdf-isolated-container tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* 8. 遵循您的习惯：处理混合内容的 span */
          #pdf-isolated-container span {
            display: inline-block !important; /* 改为 inline-block 在截图模式下更稳 */
            vertical-align: middle !important;
          }

          .pdf-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
          }

          .basic-table-wrapper {
            text-align: left;
          }
      </style>
    `
    // 1. 深度克隆原始 DOM
    const cloneNode = tabTable.cloneNode(true)

    // 2. 处理克隆后的 DOM 中的 Canvas
    // 因为 cloneNode 不会复制 Canvas 的图像内容，我们需要手动转换
    const sourceCanvases = tabTable.querySelectorAll("canvas")
    const clonedCanvases = cloneNode.querySelectorAll("canvas")

    sourceCanvases.forEach((sourceCanvas, index) => {
      const clonedCanvas = clonedCanvases[index]
      if (clonedCanvas) {
        // 将原始 Canvas 转为 DataURL 图片
        const img = document.createElement("img")
        img.src = sourceCanvas.toDataURL("image/png")
        // --- 修改部分 ---
        img.style.display = "block" // 必须转为块级元素才能使用 auto margin
        img.style.margin = "12px auto" // 上下 12px，左右自动居中
        img.style.maxWidth = "100%" // 防止图片超出 A4 宽度
        img.style.height = "256px" // 您原来的高度设定
        img.style.objectFit = "contain"
        // ----------------
        clonedCanvas.parentNode.replaceChild(img, clonedCanvas)
        // 可选：强制父容器居中（更稳妥）
        if (img.parentNode) {
          img.parentNode.style.textAlign = "center"
          img.parentNode.style.width = "100%"
          // img.parentNode.style.padding = "12px"
          // img.parentNode.style.borderRadius = "8px"
          // img.parentNode.style.background = "#f6f6f7"
        }
      }
    })

    // 2. 组合隔离后的 HTML
    const finalHtml = `
      <html>
        <head>
          ${isolatedTableStyle}
        </head>
        <body>
          <div id="pdf-isolated-container">
            <div class="pdf-title">
              <h1>${filename}</h1>
              <h3>科室：${departmentNames} | 日期：${date}</h3>
            </div>
            <div class="basic-table-wrapper">
              ${cloneNode.innerHTML}
            </div>
          </div>
        </body>
      </html>
    `

    return finalHtml
  }

  const dowmloadPdf = (loading) => {
    const tabTable = document.querySelector(`#html2pdf`)
    if (!tabTable) return loading()

    state.exporting = true
    forceRender()
    let departmentNames = ``
    let filename = ``
    let date = ``

    departmentNames += `${
      state.params.departmentId == -1
        ? "全院"
        : state.departmentName || departmentName
    }`

    if (state.tempalteName) {
      filename += `${state.tempalteName}`
    }

    if (state.params.surveyType) {
      const type = {
        1: "微信扫码",
        0: "微信推送",
        2: "调查计划",
      }[state.params.surveyType]
      filename += `（${type}）`
    }

    if (state.params.startTime && state.params.endTime) {
      date += `${moment(state.params.startTime).format("YYYY-MM-DD")}~${moment(
        state.params.endTime
      ).format("YYYY-MM-DD")}`
    }

    setTimeout(() => {
      const finalHtml = generateHtml(tabTable, filename, departmentNames, date)

      // 3. 配置 html2pdf
      html2pdf(finalHtml, {
        filename: departmentNames + filename + date + `_满意度分析.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css"] },
      }).finally(() => {
        loading()
        state.exporting = false
        forceRender()
      })
    }, 2000)
  }
```