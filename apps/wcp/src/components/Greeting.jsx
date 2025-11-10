import React, { useState } from "react";
// import './Greeting.css';
import r2wc from "@r2wc/react-to-web-component";

function Greeting({ name, onNameChange }) {
  const [inputName, setInputName] = useState(name);

  const handleInput = (e) => {
    setInputName(e.target.value);
  };

  const handleClick = () => {
    // 当按钮点击时，调用从父组件（或 WC 使用者）传入的 onNameChange 函数
    // r2wc 会自动将其转换为一个自定义事件
    if (onNameChange) {
      onNameChange(inputName);
    }
  };

  return (
    <div className="greeting-container">
      <h1>Hello, {name}!</h1>
      <input
        type="text"
        value={inputName}
        onChange={handleInput}
        placeholder="Enter your name"
      />
      <button onClick={handleClick}>Update Name</button>
    </div>
  );
}

const GreetingWebComponent = r2wc(Greeting, {
  props: {
    name: String, // 声明 'name' 属性为字符串类型
    onNameChange: Function, // 声明 'onNameChange' 属性为函数类型（用于事件回调）
  },
  shadow: "open", // 启用 Shadow DOM，隔离样式和 DOM
});

export default GreetingWebComponent;
