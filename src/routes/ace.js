import { RestTwoTone } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/ace")({
  component: RouteComponent,
  staticData: {
    name: "Ace 编辑器",
    icon: <RestTwoTone />,
    index: 3,
  },
});

function RouteComponent({}) {
  useEffect(() => {
    loadScript("/js-library/ace/ace.js", async () => {
      console.log("Ace editor script loaded.");
      await loadScript("/js-library/ace/ext-language_tools.js");
      await loadScript("/js-library/ace/theme-chrome.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.7/mode-json.js");
    //   await loadScript("/js-library/ace/mode-json.js");

      new JSONEditor("editor", {
        fontSize: "14px",
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        printMargin: false,
        value: `{a:"b"}`,
      });

      // 这里可以初始化 Ace 编辑器
    });
  }, []);
  return <div id="editor" style={{ height: "60vh" }}></div>;
}

function loadScript(url, callback) {
  // 检查是否已有相同 src 的 script 元素（支持相对/绝对 URL 比较）
  const existing = Array.from(document.getElementsByTagName("script")).find((s) => {
    const attr = s.getAttribute("src");
    if (!attr) return false;
    if (attr === url) return true;
    try {
      return new URL(attr, location.href).href === new URL(url, location.href).href;
    } catch (e) {
      return attr.endsWith(url);
    }
  });

  if (existing) {
    // 如果已有且已加载，立即回调
    if (
      existing.getAttribute("data-loaded") === "true" ||
      existing.readyState === "complete" ||
      existing.readyState === "loaded"
    ) {
      console.log("Script already loaded:", url);
      if (callback) callback();
      return;
    }

    // 如果已有但尚未加载，绑定回调到已有元素
    const onLoadHandler = function () {
      existing.setAttribute("data-loaded", "true");
      existing.removeEventListener("load", onLoadHandler);
      if (callback) callback();
    };
    const onErrorHandler = function () {
      existing.removeEventListener("error", onErrorHandler);
      console.error("Failed to load script:", url);
    };
    existing.addEventListener("load", onLoadHandler);
    existing.addEventListener("error", onErrorHandler);
    return;
  }

  const script = document.createElement("script");
  script.src = url;
  script.setAttribute("data-loaded", "false");
  script.addEventListener("load", function () {
    script.setAttribute("data-loaded", "true");
    console.log("Script loaded:", url);
    if (callback) {
      callback(); // 执行回调
    }
  });
  script.addEventListener("error", function () {
    console.error("Failed to load script:", url);
  });
  document.body.appendChild(script);
}

class JSONEditor {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }

    // 创建编辑器
    this.editor = ace.edit(this.container);
    this.editor.setTheme("ace/theme/chrome");
    this.editor.session.setMode("ace/mode/json");
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      fontSize: options.fontSize || "14px",
      tabSize: options.tabSize || 2,
      useSoftTabs: true,
      showPrintMargin: false,
    });

    // 初始化 schema 验证
    this.schema = options.schema || null;
    if (this.schema && typeof Ajv !== "undefined") {
      this.ajv = new Ajv();
      this.validateSchema = this.ajv.compile(this.schema);
    }

    // 设置初始内容
    if (options.value) {
      this.setValue(options.value);
      this.format()
    }

    // 绑定事件
    this.bindEvents();
  }

  setValue(value) {
    if (typeof value === "string") {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // 如果不是有效的JSON，保持原样
        this.editor.setValue(value);
        return;
      }
    }
    this.editor.setValue(JSON.stringify(value, null, 2));
    this.editor.clearSelection();
  }

  getValue() {
    try {
      return JSON.parse(this.editor.getValue());
    } catch (e) {
      return this.editor.getValue();
    }
  }

  format() {
    try {
      const json = this.getValue();
      this.editor.setValue(JSON.parse(JSON.stringify(json, null, 2)));
      return true;
    } catch (e) {
      this.highlightError(e);
      return false;
    }
  }

  minify() {
    try {
      const json = this.getValue();
      this.editor.setValue(JSON.stringify(json));
      return true;
    } catch (e) {
      this.highlightError(e);
      return false;
    }
  }

  validate() {
    try {
      const json = this.getValue();

      // 如果有schema，进行schema验证
      if (this.validateSchema) {
        const valid = this.validateSchema(json);
        if (!valid) {
          const errors = this.validateSchema.errors.map((err) => ({
            row: 0, // 简化版，实际应该计算正确位置
            column: 0,
            text: `${err.instancePath} ${err.message}`,
            type: "error",
          }));
          this.editor.session.setAnnotations(errors);
          return false;
        }
      }

      this.editor.session.clearAnnotations();
      return true;
    } catch (e) {
      this.highlightError(e);
      return false;
    }
  }

  highlightError(error) {
    const match = error.message.match(/position (\d+)/);
    if (match) {
      const pos = parseInt(match[1], 10);
      const doc = this.editor.session.getDocument();
      const range = doc.indexToPosition(pos);

      this.editor.session.setAnnotations([
        {
          row: range.row,
          column: range.column,
          text: error.message,
          type: "error",
        },
      ]);

      this.editor.gotoLine(range.row + 1, range.column);
    }
  }

  bindEvents() {
    // 内容变化时自动验证
    this.editor.session.on("change", () => {
      this.validate();
    });

    // 失去焦点时自动格式化
    this.editor.on("blur", () => {
      this.format();
    });
  }
}
