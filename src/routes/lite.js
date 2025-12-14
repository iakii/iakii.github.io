import { ProCard } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";
import { css, html, LitElement, render } from "lit";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/lite")({
  component: RouteComponent,
});

function RouteComponent() {
  const containerRef = useRef(null);

  useEffect(() => {
    dynamicLoad("/js-library/lit-all.min.js").then(() => {
      console.log("lit-element loaded", window.LitElement);
    });

    const content = html`<div>
      <h1>Lite Page</h1>
      <Test></Test>
    </div>`;
    render(content, containerRef.current);
  }, []);

  return (
    <ProCard>
      <div ref={containerRef}></div>
      <simple-greeting name="张三">
        <Test></Test>
      </simple-greeting>
    </ProCard>
  );
}

const Test = () => {
  return <div> Test</div>;
};

export class SimpleGreeting extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
  `;
  name = "World";
  render() {
    return html`<style>
        p {
          font-size: 20px;
          font-weight: bold;
          color: green;
        }
      </style>
      <p>Hello, ${this.name}!</p>
      <slot></slot>`;
  }
}

const tagName = "simple-greeting";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, SimpleGreeting);
}

function dynamicLoad(src) {
  const normalize = (url) => {
    if (!url) return "";
    try {
      return new URL(url, location.href).href;
    } catch (e) {
      return String(url);
    }
  };

  const targetUrl = normalize(src);
  const existing = Array.from(document.getElementsByTagName("script")).find(
    (s) => {
      const attr = s.getAttribute("src");
      if (!attr) return false;
      if (attr === src) return true;
      return normalize(attr || s.src) === targetUrl;
    }
  );

  return new Promise((resolve, reject) => {
    if (existing) {
      if (
        existing.getAttribute("data-loaded") === "true" ||
        existing.readyState === "complete" ||
        existing.readyState === "loaded"
      ) {
        resolve();
        return;
      }

      const onLoad = () => {
        existing.setAttribute("data-loaded", "true");
        existing.removeEventListener("load", onLoad);
        existing.removeEventListener("error", onError);
        resolve();
      };
      const onError = (error) => {
        existing.removeEventListener("load", onLoad);
        existing.removeEventListener("error", onError);
        reject(error);
      };
      existing.addEventListener("load", onLoad);
      existing.addEventListener("error", onError);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.type = "module";
    script.setAttribute("data-loaded", "false");

    script.addEventListener("load", () => {
      script.setAttribute("data-loaded", "true");
      console.log("finish loading lib from ");
      resolve();
    });
    script.addEventListener("error", (error) => {
      console.error("Error loading lib from ", error);
      reject(error);
    });
    document.head.appendChild(script);
  });
}
