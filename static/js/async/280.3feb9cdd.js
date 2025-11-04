"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["280"],{45955:function(e,t,a){a.r(t),a.d(t,{component:()=>h});var n=a(61421),s=a(90607),r=a(77877),o=a(34617),i=a(60538),l=a(648),d=a(25267);let c=`const render = ($root) => {
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
}`;function u(e){let{components:t,onFinish:a}=e,[s,r]=(0,o.useState)(c);return(0,n.jsx)(l.c,{title:"Schema配置",width:"100vw",trigger:(0,n.jsx)("a",{children:"配置"}),drawerProps:{styles:{body:{padding:0}},placement:"bottom",height:"100vh",size:"large"},onFinish:()=>(a(s),!0),children:(0,n.jsx)(d.KE,{height:"calc(100vh - 110px)",width:"100%",theme:"vs-dark",value:s,language:"javascript",options:{fontSize:16,minimap:{enabled:!0},fontFamily:"Consolas, Courier New, monospace",scrollBeyondLastLine:!1,suggestOnTriggerCharacters:!0,quickSuggestions:!0,wordBasedSuggestions:!0,tabCompletion:"on",snippetSuggestions:"inline",parameterHints:{enabled:!0},autoClosingBrackets:"always",autoClosingQuotes:"always",autoSurround:"languageDefined"},onChange:e=>r(e),beforeMount:e=>{let a=Object.keys(t),n=`declare const components: {
${a.map(e=>`  ${e}: any;`).join("\n")}
};`;e.languages.typescript.javascriptDefaults.addExtraLib(n,"ts:filename/components.d.ts"),e.languages.typescript.javascriptDefaults.addExtraLib("declare const $root: any;","ts:filename/root.d.ts")}})})}var p=a(19348);function h(){let[e,t,a]=(0,p.ux)();return(0,o.useEffect)(()=>{setTimeout(()=>{t(c)},100)},[]),(0,n.jsx)(s.A,{ghost:!0,children:(0,n.jsx)(s.A,{title:"预览效果",headerBordered:!0,bodyStyle:{padding:12,background:"#f6f6f7"},extra:(0,n.jsx)(u,{components:a,onFinish:t}),children:(0,n.jsx)(p.BR.Provider,{value:{id:1223,item:{app:123},...p.WQ},children:(0,n.jsx)(o.Suspense,{fallback:(0,n.jsx)(r.v0,{type:"result"}),children:(0,n.jsx)(i.tP,{components:a,children:(0,n.jsx)(i.GD,{schema:e})})})})})})}}}]);
//# sourceMappingURL=280.3feb9cdd.js.map