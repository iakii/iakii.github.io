import { ChromeOutlined } from "@ant-design/icons";
import * as Babel from "@babel/standalone";
import { createFileRoute } from "@tanstack/react-router";
import * as antd from "antd";
import { getQuickJS } from "quickjs-emscripten";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/quickjs")({
  component: RouteComponent,
  staticData: {
    name: "QuickJS + JSX示例",
    icon: <ChromeOutlined />,
    index: 10,
  },
});


const { TextArea } = antd.Input
const { Space, Button, message } = antd

// 1. 白名单：允许用户在 JSX 里使用的 Ant 组件
const antdMap = {
  Button,
  Input: antd.Input,
  Space,
  message,
}



// 2. 沙箱垫片：只返回虚拟 DOM 对象
const reactShim = `
const React = {
  createElement(type, props, ...children) {
    return { type, props: props||{}, children };
  },
  Fragment: 'REACT_FRAGMENT'
};
`

// 3. 虚拟 DOM → 真实 React 节点（递归）
function renderAntVdom(vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') return vnode
  const { type, props, children } = vnode
  const Component = antdMap[type]
  if (!Component) {
    // fallback：原生标签
    return React.createElement(
      type,
      props,
      ...(Array.isArray(children) ? children.map(renderAntVdom) : [children])
    )
  }
  // 事件桥接示例：onClick 里如果返回 {__event:'message.success',msg}
  if (props?.onClick?.__event === 'message.success') {
    const msg = props.onClick.msg
    props.onClick = () => antd.message.success(msg)
  }
  return React.createElement(
    Component,
    props,
    ...(Array.isArray(children) ? children.map(renderAntVdom) : [children])
  )
}

// 4. 自定义 Hook：懒加载 QuickJS 并执行 JSX
function useQuickJS() {
  const [vm, setVm] = useState(null)

  useEffect(() => {
    getQuickJS().then((QJS) => {
      const ctx = QJS.newContext()
      ctx.evalCode(reactShim)
      setVm(ctx)
    })
  }, [])

  const runJSX = async (jsx) => {
    if (!vm) throw new Error('QuickJS 尚未加载')
    const js = Babel.transform(jsx, {
      presets: [['react', { runtime: 'classic' }]],
    }).code
    const res = vm.evalCode(`${js}; App()`)
    if (res.error) throw new Error(res.error)
    return vm.dump(res.value)
  }

  return { ready: !!vm, runJSX }
}


function RouteComponent() {
  const [code, setCode] = useState(
    `const App = () => (
  <Space>
    <Button type="primary" onClick={() => message.success('Hello')}>
      点我
    </Button>
    <Input placeholder="请输入" />
  </Space>
);`
  )
  const [node, setNode] = useState(null)
  const [err, setErr] = useState('')
  const { ready, runJSX } = useQuickJS()

  useEffect(() => {
    if (!ready) return
    runJSX(code)
      .then((tree) => {
        setNode(renderAntVdom(tree))
        setErr('')
      })
      .catch((e) => setErr(e.message))
  }, [code, ready, runJSX])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ddd', padding: 16 }}>
        <h3>JSX 编辑器（支持 AntD 组件）</h3>
        <TextArea
          rows={18}
          style={{ width: '100%' }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {err && <pre style={{ color: 'red' }}>{err}</pre>}
      </div>
      <div style={{ flex: 1, padding: 24 }}>
        <h3>Ant Design 实时预览</h3>
        <div id='appd'>{node}</div>
      </div>
    </div>
  )
}
