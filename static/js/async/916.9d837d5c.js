"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["916"],{58383:function(e,t,r){r.r(t),r.d(t,{component:()=>I});var s=r(61421),n=r(90607),a=r(77877),o=r(34617),l=r.t(o,2),i=r(60538),u=r(648),c=r(25267);let d=`const render = ($root) => {
  const { request, useState, useForm } = $root;
  console.log("$root", $root);
  const App = () => {
    const [name, setName] = useState("张三");
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
}`;function p(e){let{components:t,onFinish:r}=e,[n,a]=(0,o.useState)(d);return(0,s.jsx)(u.c,{title:"Schema配置",width:"100vw",trigger:(0,s.jsx)("a",{children:"配置"}),drawerProps:{styles:{body:{padding:0}},placement:"bottom",height:"100vh",size:"large"},onFinish:()=>(r(n),!0),children:(0,s.jsx)(c.KE,{height:"calc(100vh - 110px)",width:"100%",theme:"vs-dark",value:n,language:"javascript",options:{fontSize:16,minimap:{enabled:!0},fontFamily:"Consolas, Courier New, monospace",scrollBeyondLastLine:!1,suggestOnTriggerCharacters:!0,quickSuggestions:!0,wordBasedSuggestions:!0,tabCompletion:"on",snippetSuggestions:"inline",parameterHints:{enabled:!0},autoClosingBrackets:"always",autoClosingQuotes:"always",autoSurround:"languageDefined"},onChange:e=>a(e),beforeMount:e=>{let r=Object.keys(t),s=`declare const components: {
${r.map(e=>`  ${e}: any;`).join("\n")}
};`;e.languages.typescript.javascriptDefaults.addExtraLib(s,"ts:filename/components.d.ts"),e.languages.typescript.javascriptDefaults.addExtraLib("declare const $root: any;","ts:filename/root.d.ts")}})})}var m=r(18093),f=r(5886),h=r(24552),g=r.n(h),b=r(5101),y=r.n(b),x=r(57890),v=r(42922),j=r(11458);let w={};for(let e in j)if(/^[A-Z]/.test(e)){let t=function(e){return(0,o.lazy)(()=>Promise.resolve().then(r.bind(r,11458)).then(t=>({default:t[e]})))}(e);w[e]=t}var S=r(81420);let k={};for(let e in S)if(/^[A-Z]/.test(e)){let t=function(e){return o.lazy(()=>Promise.resolve().then(r.bind(r,81420)).then(t=>({default:t[e]})))}(e);k[e]=t}let $={};for(let e in l)/^[A-Z]/.test(e)&&($[e]=l[e]);var P=r(83224);let z={};for(let e in P)if(/^[A-Z]/.test(e)){let t=function(e){return(0,o.lazy)(()=>Promise.resolve().then(r.bind(r,83224)).then(t=>({default:t[e]})))}(e);z[e]=t}var A=r(21872);let C=r(82644).A.create({baseURL:"/",timeout:1e4,headers:{"Content-Type":"application/json"}});C.interceptors.request.use(e=>e,e=>Promise.reject(e)),C.interceptors.response.use(e=>e.data,e=>{if(e.response){var t;console.error("请求错误:",(null==(t=e.response.data)?void 0:t.message)||e.message)}else console.error("网络异常:",e.message);return Promise.reject(e)});let q={React:o,useState:o.useState,useEffect:o.useEffect,useRef:o.useRef,useMemo:o.useMemo,loadsh:x,dayjs:g(),localforage:y(),...f,useForm:A.U.useForm,zustand:v,request:function(e){return C(e)}},E={...z,...w,...k,...$,Fragment:o.Fragment,lazy:o.lazy,AsyncComponent:function(e){let{path:t,...r}=e,n=(0,o.lazy)(()=>t);return(0,s.jsx)(o.Suspense,{fallback:(0,s.jsx)(a.Ay,{type:"result"}),children:(0,s.jsx)(n,{...r})})}},F=[/window\b/,/document\b/,/eval\b/,/Function\b/,/fetch\b/,/XMLHttpRequest\b/,/importScripts\b/,/postMessage\b/,/SharedWorker\b/,/Worker\b/,/WebSocket\b/,/EventSource\b/,/IndexedDB\b/,/top\b/,/require\b/,/globalThis\b/,/for\s*\(\s*;\s*;\s*\)/,/while\s*\(\s*true\s*\)/,/do\s*{[\s\S]*?}\s*while\s*\(\s*true\s*\)/];function I(){let[e,t,r]=function(){let[e,t]=(0,o.useState)({component:"ProSkeleton",type:"result"});return[e,async e=>{try{let r;for(let r of F)if(r.test(e))return void t({component:"Result",status:403,title:"检测到不安全代码，已禁止执行！"});console.time("babel解析耗时");let s=m.transform(e,{presets:["react"]}).code;console.timeEnd("babel解析耗时");let n=["$root","React",...Object.keys(E)];try{let e=Function(...n,`${s}; return render($root);`),t=[q,o,...Object.values(E)],a=Promise.resolve(e(...t));r=await Promise.race([a,new Promise((e,t)=>setTimeout(()=>t(Error("执行超时（2秒）")),2e3))])}catch(e){t({component:"Result",status:403,title:`执行异常: ${e.message}`});return}if("object"!=typeof r||null==r)return void t({component:"Result",status:403,title:"渲染结果无效！"});t(function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(r>5)return"[Too deep]";if("string"==typeof t)return t.length>2e3?t.slice(0,2e3)+"...":t;if(Array.isArray(t))return t.length>30?t.slice(0,30).map(t=>e(t,r+1)).concat(["[truncated]"]):t.map(t=>e(t,r+1));if("object"==typeof t&&null!==t){let s=Object.keys(t);if(s.length>30){let n={};return s.slice(0,30).forEach(s=>n[s]=e(t[s],r+1)),n["[truncated]"]=!0,n}let n={};for(let a of s)n[a]=e(t[a],r+1);return n}return t}(r))}catch(e){console.error("render error",e),t({component:"Result",status:403,title:`渲染错误: ${e.message}`})}},E]}();return(0,o.useEffect)(()=>{setTimeout(()=>{t(d)},100)},[]),(0,s.jsx)(n.A,{ghost:!0,children:(0,s.jsx)(n.A,{title:"预览效果",headerBordered:!0,bodyStyle:{padding:12,background:"#f6f6f7"},extra:(0,s.jsx)(p,{components:r,onFinish:t}),children:(0,s.jsx)(o.Suspense,{fallback:(0,s.jsx)(a.v0,{type:"result"}),children:(0,s.jsx)(i.tP,{components:r,children:(0,s.jsx)(i.GD,{schema:e})})})})})}}}]);
//# sourceMappingURL=916.9d837d5c.js.map