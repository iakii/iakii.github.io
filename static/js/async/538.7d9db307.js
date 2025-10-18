"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["538"],{55273:function(e,t,n){n.r(t),n.d(t,{component:()=>R});var r=n(61421),a=n(90607),s=n(77877),o=n(34617),l=n.t(o,2),i=n(60538),c=n(648),u=n(25267);let d=`const render = ($root) => {
  console.log("$root", $root);
  const App = () => {
    const [name, setName] = $root.useState("张三");
    return (
      <ProCard ghost direction='column'>
        <ProTable
          style={{ margin: "12px 0" }}
          size="small"
          bordered
          request={async({current,pageSize})=>{
            const query = \`page=\${current}&size=\${pageSize}\`;
            return await fetch(\`https://randomuser.me/api?results=60&\${query}\`)
                .then((res) => res.json())
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
          pagination={false}
        />
      </ProCard>
    )
  }
  return {
    component: "div",
    children: <App />
  }
}`;function h(e){let{components:t,onFinish:n}=e,[a,s]=(0,o.useState)(d);return(0,r.jsx)(c.c,{title:"Schema配置",width:"100vw",trigger:(0,r.jsx)("a",{children:"配置"}),drawerProps:{styles:{body:{padding:0}},placement:"bottom",height:"100vh",size:"large"},onFinish:()=>(n(a),!0),children:(0,r.jsx)(u.KE,{height:"calc(100vh - 110px)",width:"100%",theme:"vs-dark",value:a,language:"javascript",options:{fontSize:16,minimap:{enabled:!0},fontFamily:"Consolas, Courier New, monospace",scrollBeyondLastLine:!1,suggestOnTriggerCharacters:!0,quickSuggestions:!0,wordBasedSuggestions:!0,tabCompletion:"on",snippetSuggestions:"inline",parameterHints:{enabled:!0},autoClosingBrackets:"always",autoClosingQuotes:"always",autoSurround:"languageDefined"},onChange:e=>s(e),beforeMount:e=>{let n=Object.keys(t),r=`declare const components: {
${n.map(e=>`  ${e}: any;`).join("\n")}
};`;e.languages.typescript.javascriptDefaults.addExtraLib(r,"ts:filename/components.d.ts"),e.languages.typescript.javascriptDefaults.addExtraLib("declare const $root: any;","ts:filename/root.d.ts")}})})}var m=n(18093),p=n(83393),f=n(29382),g=n(24552),b=n.n(g),x=n(5101),y=n.n(x),j=n(55964),v=n(11458);let w={};for(let e in v)if(/^[A-Z]/.test(e)){let t=function(e){return(0,o.lazy)(()=>Promise.resolve().then(n.bind(n,11458)).then(t=>({default:t[e]})))}(e);w[e]=t}var S=n(81420);let A={};for(let e in S)if(/^[A-Z]/.test(e)){let t=function(e){return o.lazy(()=>Promise.resolve().then(n.bind(n,81420)).then(t=>({default:t[e]})))}(e);A[e]=t}let k={};for(let e in l)/^[A-Z]/.test(e)&&(k[e]=l[e]);var I=n(83224);let z={};for(let e in I)if(/^[A-Z]/.test(e)){let t=function(e){return(0,o.lazy)(()=>Promise.resolve().then(n.bind(n,83224)).then(t=>({default:t[e]})))}(e);z[e]=t}let $={React:o,useState:o.useState,useEffect:o.useEffect,useRef:o.useRef,useMemo:o.useMemo,loadsh:j.A,dayjs:b(),localforage:y(),hooks:p},C={...z,...w,...A,...k,Fragment:o.Fragment,lazy:o.lazy,AsyncComponent:function(e){let{path:t,...n}=e,a=(0,o.lazy)(()=>t);return(0,r.jsx)(o.Suspense,{fallback:(0,r.jsx)(s.Ay,{type:"result"}),children:(0,r.jsx)(a,{...n})})}},P=[/window\b/,/document\b/,/eval\b/,/Function\b/,/XMLHttpRequest\b/,/importScripts\b/,/postMessage\b/,/SharedWorker\b/,/Worker\b/,/WebSocket\b/,/EventSource\b/,/IndexedDB\b/,/top\b/,/require\b/,/globalThis\b/,/for\s*\(\s*;\s*;\s*\)/,/while\s*\(\s*true\s*\)/,/do\s*{[\s\S]*?}\s*while\s*\(\s*true\s*\)/];function R(){let[e,t,n]=function(){let[e,t]=(0,o.useState)({component:"ProCard",children:[{component:"Descriptions",title:"User Info",size:"small",bordered:!0,layout:"vertical",children:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(f.A.Item,{label:"UserName",children:"Zhou Maomao"}),(0,r.jsx)(f.A.Item,{label:"Telephone",children:"1810000000"}),(0,r.jsx)(f.A.Item,{label:"Live",children:"Hangzhou, Zhejiang"}),(0,r.jsx)(f.A.Item,{label:"Remark",children:"empty"}),(0,r.jsx)(f.A.Item,{label:"Address",children:"No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China"})]})}]});return[e,async e=>{try{let n;for(let n of P)if(n.test(e))return void t({component:"Result",status:403,title:"检测到不安全代码，已禁止执行！"});console.time("babel解析耗时");let r=m.transform(e,{presets:["react"]}).code;console.timeEnd("babel解析耗时");let a=["$root","React",...Object.keys(C)];try{let e=Function(...a,`${r}; return render($root);`),t=[$,o,...Object.values(C)],s=Promise.resolve(e(...t));n=await Promise.race([s,new Promise((e,t)=>setTimeout(()=>t(Error("执行超时（2秒）")),2e3))])}catch(e){t({component:"Result",status:403,title:`执行异常: ${e.message}`});return}if("object"!=typeof n||null==n)return void t({component:"Result",status:403,title:"渲染结果无效！"});t(function e(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(n>5)return"[Too deep]";if("string"==typeof t)return t.length>2e3?t.slice(0,2e3)+"...":t;if(Array.isArray(t))return t.length>30?t.slice(0,30).map(t=>e(t,n+1)).concat(["[truncated]"]):t.map(t=>e(t,n+1));if("object"==typeof t&&null!==t){let r=Object.keys(t);if(r.length>30){let a={};return r.slice(0,30).forEach(r=>a[r]=e(t[r],n+1)),a["[truncated]"]=!0,a}let a={};for(let s of r)a[s]=e(t[s],n+1);return a}return t}(n))}catch(e){console.error("render error",e),t({component:"Result",status:403,title:`渲染错误: ${e.message}`})}},C]}();return(0,r.jsx)(a.A,{ghost:!0,children:(0,r.jsx)(a.A,{title:"预览效果",headerBordered:!0,bodyStyle:{padding:12,background:"#f6f6f7"},extra:(0,r.jsx)(h,{components:n,onFinish:t}),children:(0,r.jsx)(o.Suspense,{fallback:(0,r.jsx)(s.v0,{type:"result"}),children:(0,r.jsx)(i.tP,{components:n,children:(0,r.jsx)(i.GD,{schema:e})})})})})}}}]);
//# sourceMappingURL=538.7d9db307.js.map