import React from "react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom/client";

function Hello({ name, onHello, children }) {
  return (
    <div>
      Hello World! {name} ~~~
      <button
        onClick={() => {
          if (onHello) onHello({ name });
          alert("Clicked");
        }}
      >
        Click Me!
      </button>
      {children}
    </div>
  );
}

// export const HelloComponent = r2wc(Hello, {
//   props: {
//     name: { type: String },
//     onHello: { type: Function },
//   },
//   shadow: "open", // 启用 Shadow DOM，隔离样式和 DOM
// });

export class HelloComponent extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    // 创建 Shadow DOM，实现样式隔离
    this.attachShadow({ mode: "open" });
    this._root = null;
    this._props = {};
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._props[name] = newValue;
    this._render();
  }

  _handleHello = (detail) => {
    this.dispatchEvent(new CustomEvent("hello", { detail, bubbles: true }));
  };

  _render() {
    if (!this._root) {
      // React 渲染到 Shadow DOM
      this._root = ReactDOM.createRoot(this.shadowRoot);
    }

    this._root.render(
      <>
        <style>{`
          :host {
            display: block;
            font-family: system-ui, sans-serif;
            border: 1px solid #eee;
            padding: 1em;
            border-radius: 8px;
            background: #fafcff;
            box-shadow: 0 2px 8px #0001;
          }
          button {
            padding: 0.5em 1em;
            border-radius: 4px;
            border: none;
            background: #1677ff;
            color: #fff;
            cursor: pointer;
            font-size: 1em;
          }
          button:hover {
            background: #4096ff;
          }
        `}</style>
        <Hello name={this._props.name} onHello={this._handleHello}></Hello>
      </>
    );
  }
}

const tagName = "hello-component";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, HelloComponent);
}
