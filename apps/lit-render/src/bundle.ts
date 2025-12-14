console.log(111, window);
const { useState } = React;
const { Button, Flex, Rate } = antd; // 函数组件，无状态组件
const { ProCard, ModalForm } = ProComponents;
function MyApp() {
  const [count, setCount] = useState(1);
  const [time, setTime] = useState(new Date().toLocaleString());
  const [obj, setObj] = useState({ name: "张三", age: "21" });
  const AllowHalfFn = () => <Rate allowHalf defaultValue={2.5} />;
  let plus = () => {
    setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setTime(new Date().toLocaleString());
    }, 1000);
    //class 组件的 this.setState会自动合并更新对象
    // //useState 不会自动合并更新对象，
    // 不会把新的 state 和旧的 state 进行合并，更新 state 变量是完全替换。
    // //所以要object.assign合并对象或者 {...preVal,{name:'李四'}} 手动合并

    setObj((preVal) => Object.assign(obj, { name: "李四" }));
  };

  return (
    <div style={{ padding: 16 }}>
      <ProCard>
        <AllowHalfFn></AllowHalfFn>{" "}
        <Button type="primary">Primary Button</Button> <h1> {count} </h1>{" "}
        <h2>时间:{time}</h2>{" "}
        <h3>
          {" "}
          姓名：{obj.name} ; 年龄：{obj.age}{" "}
        </h3>{" "}
        <button onClick={plus}>start plus & start time</button>{" "}
        <ModalForm trigger={<a>弹窗</a>} title="弹出实例">
          我是弹窗内容
        </ModalForm>
      </ProCard>
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
