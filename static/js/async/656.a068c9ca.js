"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["656"],{84739:function(e,t,n){n.r(t),n.d(t,{component:()=>F});var a=n(61421),r=n(90607),s=n(77877),o=n(18093),l=n(29382),i=n(24552),d=n.n(i),c=n(55964),u=n(34617),h=n.t(u,2),m=n(60538),p=n(47950),g=n(648),f=n(25267);let x=`const render = ($root) => {
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
}`;function y(e){let{components:t,onFinish:n}=e,[r,s]=(0,u.useState)(x);return(0,a.jsx)(g.c,{title:"Schema配置",width:"100vw",trigger:(0,a.jsx)("a",{children:"配置"}),drawerProps:{styles:{body:{padding:0}},placement:"bottom",height:"100vh",size:"large"},onFinish:()=>(n(r),!0),children:(0,a.jsx)(f.KE,{height:"calc(100vh - 110px)",width:"100%",theme:"vs-dark",value:r,language:"javascript",options:{fontSize:16,minimap:{enabled:!0},fontFamily:"Consolas, Courier New, monospace",scrollBeyondLastLine:!1,suggestOnTriggerCharacters:!0,quickSuggestions:!0,wordBasedSuggestions:!0,tabCompletion:"on",snippetSuggestions:"inline",parameterHints:{enabled:!0},autoClosingBrackets:"always",autoClosingQuotes:"always",autoSurround:"languageDefined"},onChange:e=>s(e),beforeMount:e=>{let n=Object.keys(t),a=`declare const components: {
${n.map(e=>`  ${e}: any;`).join("\n")}
};`;e.languages.typescript.javascriptDefaults.addExtraLib(a,"ts:filename/components.d.ts"),e.languages.typescript.javascriptDefaults.addExtraLib("declare const $root: any;","ts:filename/root.d.ts")}})})}var b=n(11458);let j={};for(let e in b)if(/^[A-Z]/.test(e)){let t=function(e){return(0,u.lazy)(()=>Promise.resolve().then(n.bind(n,11458)).then(t=>({default:t[e]})))}(e);j[e]=t}var v=n(42140);let w={};for(let e in v)if(/^[A-Z]/.test(e)){let t=function(e){return u.lazy(()=>Promise.resolve().then(n.bind(n,42140)).then(t=>({default:t[e]})))}(e);w[e]=t}let A={};for(let e in h)/^[A-Z]/.test(e)&&(A[e]=h[e]);var S=n(83224);let z={};for(let e in S)if(/^[A-Z]/.test(e)){let t=function(e){return(0,u.lazy)(()=>Promise.resolve().then(n.bind(n,83224)).then(t=>({default:t[e]})))}(e);z[e]=t}var I=n(5101),k=n.n(I),C=n(83393);let $={...z,...j,...w,...A,Fragment:u.Fragment,lazy:u.lazy,AsyncComponent:function(e){let{path:t,...n}=e,r=(0,u.lazy)(()=>t);return(0,a.jsx)(u.Suspense,{fallback:(0,a.jsx)(s.Ay,{type:"result"}),children:(0,a.jsx)(r,{...n})})}},P={React:u,useState:u.useState,useEffect:u.useEffect,useRef:u.useRef,useMemo:u.useMemo,printMgr:p.A,loadsh:c.A,dayjs:d(),localforage:k(),hooks:C};function F(){let[e,t]=(0,u.useState)({component:"ProCard",children:[{component:"Descriptions",title:"User Info",size:"small",bordered:!0,layout:"vertical",children:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.A.Item,{label:"UserName",children:"Zhou Maomao"}),(0,a.jsx)(l.A.Item,{label:"Telephone",children:"1810000000"}),(0,a.jsx)(l.A.Item,{label:"Live",children:"Hangzhou, Zhejiang"}),(0,a.jsx)(l.A.Item,{label:"Remark",children:"empty"}),(0,a.jsx)(l.A.Item,{label:"Address",children:"No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China"})]})}]});return(0,a.jsx)(r.A,{ghost:!0,children:(0,a.jsx)(r.A,{title:"预览效果",headerBordered:!0,bodyStyle:{padding:12,background:"#f6f6f7"},extra:(0,a.jsx)(y,{components:$,onFinish:function(e){try{console.time("babel解析耗时");let n=o.transform(e,{presets:["react"]}).code;console.timeEnd("babel解析耗时");let a=["$root","React",...Object.keys($)],r=Function(...a,`${n}; return render($root);`),s=[P,u,...Object.values($)],l=r(...s);t(l)}catch(e){console.error("render error",e),t({component:"div",children:`渲染错误: ${e.message}`})}}}),children:(0,a.jsx)(u.Suspense,{fallback:(0,a.jsx)(s.v0,{type:"result"}),children:(0,a.jsx)(m.tP,{components:$,children:(0,a.jsx)(m.GD,{schema:e})})})})})}}}]);
//# sourceMappingURL=656.a068c9ca.js.map