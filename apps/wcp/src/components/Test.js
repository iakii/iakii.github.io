import React from "react";
import r2wc from "@r2wc/react-to-web-component";

function Test({}) {
  return <div>Test</div>;
}

const TestWebComponent = r2wc(Test, {
  props: {},
  shadow: "open", // 启用 Shadow DOM，隔离样式和 DOM
});

export default TestWebComponent;
