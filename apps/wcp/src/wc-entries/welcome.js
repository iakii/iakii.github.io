import r2wc from "@r2wc/react-to-web-component";
import { Button, Modal } from "antd";
// @ts-ignore
import React  from "react";

function HelloS({ name, onHello, children }) {
  console.log("Hello props:", { name, onHello, children });
  return (
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
      Hello World! {name} ~~~
      <button
        onClick={() => {
          if (onHello) onHello({ name });
          alert("Clicked");
        }}
      >
        Click Me!
      </button>
      <Button
        onClick={() => {
          Modal.confirm({ title: "提示", content: "我是内容" });
        }}
      >
        oiioi
      </Button>
      {children}
    </>
  );
}

export const WelcomeComponent = r2wc(HelloS, {
  props: {
    name: "string",
    onHello: "function",
    // children:""
  },
  // shadow: "open", // 启用 Shadow DOM，隔离样式和 DOM
});

const tagName = "welcome-component";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, WelcomeComponent);
}
