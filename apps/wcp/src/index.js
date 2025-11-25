import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "antd";
import "./wc-entries/welcome";
// import { CollectionElement } from "./wc-entries/collect";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <welcome-component name='张三' on-hello={(e) => {
      console.log("Hello from Web Component:", e);
    }}>
      <span>ejjj</span>
    </welcome-component>
  </React.StrictMode>
);
