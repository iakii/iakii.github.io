"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["33"],{17363:function(e,t,r){r.d(t,{GD:()=>f,tP:()=>b});var n,o=r(38390);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function c(e){return e&&"object"===a(e)&&"_notSchema"in e}var i=[],u={};function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=(t.parsers||i).reduce(function(e,r){return r(e,t)},e),o=t.componentDecorator||n;return o?o({schema:e,children:d(r,t),context:t}):d(r,t)}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.component,n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={};return Object.keys(e).forEach(function(n){var o=e[n];r[n]=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Array.isArray(t)?function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.map(function(t){return e(t,r)})}(t,r):t&&"object"===a(t)&&t.component&&!c(t)?p(t,r):c(t)?(t._notSchema,l(t,["_notSchema"])):t}(o,t)}),r}(l(e,["component"]),t);void 0===n.key&&n.name&&(n.key=n.name);var s=t.components||u;return"string"==typeof r&&s[r]?(0,o.createElement)(s[r],n):(0,o.createElement)(r,n)}var m=(0,o.createContext)({}),f=(0,o.memo)(function(e){var t=e.schema,r=(0,o.useContext)(m);return Array.isArray(t)?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,o.createElement)(o.Fragment,null,e.map(function(e){return p(e,t)}))}(t,r):"object"===a(t)?p(t,r):null}),b=function(e){var t=e.children,r=e.components,n=e.parsers,a=e.componentDecorator,c=l(e,["children","components","parsers","componentDecorator"]);return o.createElement(m.Provider,{value:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){var n;n=r[t],t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({components:r,componentDecorator:a,parsers:n},c)},t)}},12023:function(e,t,r){r.d(t,{ZH:()=>$,ly:()=>D,WQ:()=>P,BR:()=>O,ux:()=>E});var n=r(94336),o=r(94452),a=r(87655),s=r.n(a),l=r(25032),c=r.n(l),i=r(43187),u=r(62137),p=r(38390),d=r.t(p,2),m=r(39974),f=r(72310),b=r(80109);let y={};for(let e in b)if(/^[A-Z]/.test(e)){let t=function(e){return(0,p.lazy)(()=>Promise.resolve().then(r.bind(r,80109)).then(t=>({default:t[e]})))}(e);y[e]=t}var h=r(95550);let g={};for(let e in h)if(/^[A-Z]/.test(e)){let t=function(e){return p.lazy(()=>Promise.resolve().then(r.bind(r,95550)).then(t=>({default:t[e]})))}(e);g[e]=t}let v={};for(let e in d)/^[A-Z]/.test(e)&&(v[e]=d[e]);var j=r(37375);let x={};for(let e in j)if(/^[A-Z]/.test(e)){let t=function(e){return(0,p.lazy)(()=>Promise.resolve().then(r.bind(r,37375)).then(t=>({default:t[e]})))}(e);x[e]=t}var w=r(10843);let S=r(75245).A.create({baseURL:"/",timeout:1e4,headers:{"Content-Type":"application/json"}});S.interceptors.request.use(e=>e,e=>Promise.reject(e)),S.interceptors.response.use(e=>e.data,e=>{if(e.response){var t;console.error("请求错误:",(null==(t=e.response.data)?void 0:t.message)||e.message)}else console.error("网络异常:",e.message);return Promise.reject(e)});let O=p.createContext({}),P={React:p,useState:p.useState,useEffect:p.useEffect,useRef:p.useRef,useMemo:p.useMemo,loadsh:i,dayjs:s(),localforage:c(),...o,useForm:w.U.useForm,zustand:u,request:function(e){return S(e)},useAppContext:()=>(0,p.useContext)(O)},k={...x,...y,...g,...v,Fragment:p.Fragment,lazy:p.lazy,AsyncComponent:function(e){let{path:t,...r}=e,n=(0,p.lazy)(()=>t);return(0,m.jsx)(p.Suspense,{fallback:(0,m.jsx)(f.Ay,{type:"result"}),children:(0,m.jsx)(n,{...r})})}},A=[/window\b/,/document\b/,/eval\b/,/Function\b/,/fetch\b/,/XMLHttpRequest\b/,/importScripts\b/,/postMessage\b/,/SharedWorker\b/,/Worker\b/,/WebSocket\b/,/EventSource\b/,/IndexedDB\b/,/top\b/,/require\b/,/globalThis\b/,/for\s*\(\s*;\s*;\s*\)/,/while\s*\(\s*true\s*\)/,/do\s*{[\s\S]*?}\s*while\s*\(\s*true\s*\)/];function C(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(t>5)return"[Too deep]";if("string"==typeof e)return e.length>2e3?e.slice(0,2e3)+"...":e;if(Array.isArray(e))return e.length>30?e.slice(0,30).map(e=>C(e,t+1)).concat(["[truncated]"]):e.map(e=>C(e,t+1));if("object"==typeof e&&null!==e){let r=Object.keys(e);if(r.length>30){let n={};return r.slice(0,30).forEach(r=>n[r]=C(e[r],t+1)),n["[truncated]"]=!0,n}let n={};for(let o of r)n[o]=C(e[o],t+1);return n}return e}function E(){let[e,t]=(0,p.useState)({component:"ProSkeleton",type:"result"});return[e,async e=>{try{let r;for(let r of A)if(r.test(e))return t({component:"Result",status:403,title:"检测到不安全代码，已禁止执行！"}),null;console.time("babel解析耗时");let o=n.transform(e,{presets:["react"]}).code;console.timeEnd("babel解析耗时");let a=["$root","React",...Object.keys(k)];try{let e=Function(...a,`${o}; return render($root);`),t=[P,p,...Object.values(k)],n=Promise.resolve(e(...t));r=await Promise.race([n,new Promise((e,t)=>setTimeout(()=>t(Error("执行超时（2秒）")),2e3))])}catch(e){return t({component:"Result",status:403,title:`执行异常: ${e.message}`}),null}if("object"!=typeof r||null==r)return t({component:"Result",status:403,title:"渲染结果无效！"}),null;return t(C(r)),C(r)}catch(e){console.error("render error",e),t({component:"Result",status:403,title:`渲染错误: ${e.message}`})}},k]}let $=async e=>{try{for(let t of A)if(t.test(e))return alert("检测到不安全代码，已禁止执行！"),null;return console.time("babel解析耗时"),n.transform(e,{presets:["react"]}).code}catch(e){console.error("render error",e),alert(`渲染错误: ${e.message}`)}},D=async e=>{let t;console.timeEnd("babel解析耗时");let r=["$root","React",...Object.keys(k)];try{let n=Function(...r,`${e}; return render($root);`),o=[P,p,...Object.values(k)],a=Promise.resolve(n(...o));t=await Promise.race([a,new Promise((e,t)=>setTimeout(()=>t(Error("执行超时（2秒）")),2e3))])}catch(e){return alert(`执行异常: ${e.message}`),null}return"object"!=typeof t||null==t?(alert("渲染结果无效！"),null):C(t)}},87248:function(e,t,r){r.r(t),r.d(t,{component:()=>m});var n=r(39974),o=r(28812),a=r(72310),s=r(38390),l=r(17363),c=r(18711),i=r(35094);let u=`const render = ($root) => {
  const { request, useState, useForm, useAppContext } = $root;
  console.log("$root", $root);
  const App = () => {
    const [name, setName] = useState("张三");
    const app = useAppContext();
    console.log(1111, app)
    return (
      <ProCard ghost direction='column'>
        <ProTable
          style={{ margin: "12px 0" }}
          size="small"
          bordered
          request={async({current,pageSize})=>{
            const query = \`page=\${current}&size=\${pageSize}\`;
            return await request(\`https://randomuser.me/api?results=60&\${query}\`)
                .then((res) => ({
                total: res.info.results,
                success: true,
                data: res.results.map((x) => {
                    x.avatar = x.picture?.thumbnail;
                    x.age = x.dob?.age;
                    x.name = x.name?.last;
                    x.state = x.location?.state;
                    return x;
                }),
                }));
            }}
            columns={[
                {
                title: "头像",
                dataIndex: "avatar",
                valueType: "avatar",
                align: "center",
                width: 48,
                },
                {
                title: "姓名",
                width: 100,
                dataIndex: "name",
                },
                {
                title: "年龄",
                width: 48,
                dataIndex: "age",
                },
                {
                title: "手机",
                dataIndex: "phone",
                width: 132,
                },
                {
                title: "性别",
                dataIndex: "gender",
                width: 64,
                },

                {
                title: "email",
                dataIndex: "email",
                // width: 200,
                },
                {
                title: "cell",
                dataIndex: "cell",
                // width: 116,
                },
                {
                title: "国家",
                dataIndex: "state",
                // width: 200,
                },
                {
                title: "nat",
                dataIndex: "nat",
                width: 22,
                },
          ]}
          search={{ layout: "vertical" }}
          rowKey="id"
        />
      </ProCard>
    )
  }
  return {
    component: "div",
    children: <App />
  }
}`;function p(e){let{components:t,onFinish:r}=e,[o,a]=(0,s.useState)(u);return(0,n.jsx)(c.c,{title:"Schema配置",width:"100vw",trigger:(0,n.jsx)("a",{children:"配置"}),drawerProps:{styles:{body:{padding:0}},placement:"bottom",height:"100vh",size:"large"},onFinish:()=>(r(o),!0),children:(0,n.jsx)(i.KE,{height:"calc(100vh - 110px)",width:"100%",theme:"vs-dark",value:o,language:"javascript",options:{fontSize:16,minimap:{enabled:!0},fontFamily:"Consolas, Courier New, monospace",scrollBeyondLastLine:!1,suggestOnTriggerCharacters:!0,quickSuggestions:!0,wordBasedSuggestions:!0,tabCompletion:"on",snippetSuggestions:"inline",parameterHints:{enabled:!0},autoClosingBrackets:"always",autoClosingQuotes:"always",autoSurround:"languageDefined"},onChange:e=>a(e),beforeMount:e=>{let r=Object.keys(t),n=`declare const components: {
${r.map(e=>`  ${e}: any;`).join("\n")}
};`;e.languages.typescript.javascriptDefaults.addExtraLib(n,"ts:filename/components.d.ts"),e.languages.typescript.javascriptDefaults.addExtraLib("declare const $root: any;","ts:filename/root.d.ts")}})})}var d=r(12023);function m(){let[e,t,r]=(0,d.ux)();return(0,s.useEffect)(()=>{setTimeout(()=>{t(u)},100)},[]),(0,n.jsx)(o.A,{ghost:!0,children:(0,n.jsx)(o.A,{title:"预览效果",headerBordered:!0,bodyStyle:{padding:12,background:"#f6f6f7"},extra:(0,n.jsx)(p,{components:r,onFinish:t}),children:(0,n.jsx)(d.BR.Provider,{value:{id:1223,item:{app:123},...d.WQ},children:(0,n.jsx)(s.Suspense,{fallback:(0,n.jsx)(a.v0,{type:"result"}),children:(0,n.jsx)(l.tP,{components:r,children:(0,n.jsx)(l.GD,{schema:e})})})})})})}}}]);
//# sourceMappingURL=33.fd00e116.js.map