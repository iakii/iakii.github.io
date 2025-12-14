import { AppstoreFilled } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import { html, LitElement } from "lit";
import { directive } from "lit/async-directive.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import DOMPurify from "dompurify";
import WujieReact from "wujie-react";
import { Spin } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/cdn")({
  component: RouteComponent,

  staticData: {
    name: "Iframe CDN",
    icon: <AppstoreFilled />,
    index: 99,
  },
});

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  return (
    <Spin spinning={loading}>
      <iframe
        onLoad={() => setLoading(false)}
        onLoadStart={() => setLoading(true)}
        name="cdn"
        src="/cdn-react"
        style={{
          width: "100%",
          height: "calc(100vh - 118px)",
          overflow: "auto",
          border: "none",
          background: "transparent",
        }}
      />
    </Spin>
  );
}

export class Contaner extends LitElement {
  constructor() {
    super();
    this.html = "World";
    console.log(2222, this.url);
    // getContent().then((res) => {
    //   this.html = `${res}`;
    // });
    this.loadRemoteContent();
  }

  static get properties() {
    return {
      /**
       * @type {string}
       */
      url: { type: String },
      html: { state: Boolean },
    };
  }

  async loadRemoteContent() {
    this.loading = true;

    try {
      const response = await fetch("/html/cdn-antd.html", {
        headers: { Accept: "text/html" },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      // const cleanHtml = DOMPurify.sanitize(html, {
      //   ALLOWED_TAGS: [
      //     "div",
      //     "p",
      //     "span",
      //     "h1",
      //     "h2",
      //     "h3",
      //     "ul",
      //     "li",
      //     "a",
      //     "img",
      //   ],
      //   ALLOWED_ATTR: ["class", "style", "href", "src", "alt"],
      // });

      this.renderContent(html);
    } catch (error) {
      console.error("加载失败:", error);
      this.renderError(error.message);
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`<div class="container">
      ${this.loading ? html`<div class="loading">加载中...</div>` : ""}
      <div id="content"></div>
    </div>`;
  }
}

const tagName = "app-container";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Contaner);
}
