"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["297"],{76936:function(e,t,n){n.r(t),n.d(t,{component:()=>x});var r,a=n(61421),l=n(18093),s=n(3190),i=n(11458),u=n(54554);async function c(e){let t=d(await e),[r,a,{QuickJSWASMModule:l}]=await Promise.all([t.importModuleLoader().then(d),t.importFFI(),Promise.all([n.e("783"),n.e("193")]).then(n.bind(n,55320)).then(d)]),s=await r();s.type="sync";let i=new a(s);return new l(s,i)}function d(e){return e&&"default"in e&&e.default?e.default&&"default"in e.default&&e.default.default?e.default.default:e.default:e}var o={type:"sync",importFFI:()=>n.e("898").then(n.bind(n,94921)).then(e=>e.QuickJSFFI),importModuleLoader:()=>n.e("206").then(n.bind(n,52789)).then(e=>e.default)};async function p(e=o){return c(e)}async function f(){return r??(r=p().then(e=>e)),await r}var h=n(34617);let{TextArea:y}=s.A,{Space:m,Button:v,message:g}=i,A={Button:v,Input:s.A,Space:m,message:g},w=`
const React = {
  createElement(type, props, ...children) {
    return { type, props: props||{}, children };
  },
  Fragment: 'REACT_FRAGMENT'
};
`;function x(){let[e,t]=(0,h.useState)(`const App = () => (
  <Space>
    <Button type="primary" onClick={() => message.success('Hello')}>
      点我
    </Button>
    <Input placeholder="请输入" />
  </Space>
);`),[n,r]=(0,h.useState)(null),[s,i]=(0,h.useState)(""),{ready:c,runJSX:d}=function(){let[e,t]=(0,h.useState)(null);(0,h.useEffect)(()=>{f().then(e=>{let n=e.newContext();n.evalCode(w),t(n)})},[]);let n=async t=>{if(!e)throw Error("QuickJS 尚未加载");let n=l.transform(t,{presets:[["react",{runtime:"classic"}]]}).code,r=e.evalCode(`${n}; App()`);if(r.error)throw Error(r.error);return e.dump(r.value)};return{ready:!!e,runJSX:n}}();return(0,h.useEffect)(()=>{c&&d(e).then(e=>{r(function e(t){var n;if("string"==typeof t||"number"==typeof t)return t;let{type:r,props:a,children:l}=t,s=A[r];if(!s)return React.createElement(r,a,...Array.isArray(l)?l.map(e):[l]);if((null==a||null==(n=a.onClick)?void 0:n.__event)==="message.success"){let e=a.onClick.msg;a.onClick=()=>u.Ay.success(e)}return React.createElement(s,a,...Array.isArray(l)?l.map(e):[l])}(e)),i("")}).catch(e=>i(e.message))},[e,c,d]),(0,a.jsxs)("div",{style:{display:"flex",height:"100vh"},children:[(0,a.jsxs)("div",{style:{flex:1,borderRight:"1px solid #ddd",padding:16},children:[(0,a.jsx)("h3",{children:"JSX 编辑器（支持 AntD 组件）"}),(0,a.jsx)(y,{rows:18,style:{width:"100%"},value:e,onChange:e=>t(e.target.value)}),s&&(0,a.jsx)("pre",{style:{color:"red"},children:s})]}),(0,a.jsxs)("div",{style:{flex:1,padding:24},children:[(0,a.jsx)("h3",{children:"Ant Design 实时预览"}),(0,a.jsx)("div",{id:"appd",children:n})]})]})}}}]);
//# sourceMappingURL=297.b9ec4590.js.map