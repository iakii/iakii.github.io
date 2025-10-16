"use strict";(self.webpackChunkprint_js=self.webpackChunkprint_js||[]).push([["831"],{62258:function(e,t,n){n.r(t),n.d(t,{component:()=>C});var a=n(61421),r=n(90607),o=n(25267),s=n(18093),i=n(29382),l=n(20399),c=n(34617),d=n.t(c,2),m=n(60538),u=n(47950),p=n(11458);let g={};for(let e in p)/^[A-Z]/.test(e)&&(g[e]=p[e]);var h=n(78151);let f={};for(let e in h)/^[A-Z]/.test(e)&&(f[e]=h[e]);let y={};for(let e in d)/^[A-Z]/.test(e)&&(y[e]=d[e]);var b=n(87191);let j={};for(let e in b)/^[A-Z]/.test(e)&&(j[e]=b[e]);var x=n(55964),D=n(24552),I=n.n(D);let k={...j,...g,...f,...y,Fragment:c.Fragment,lazy:c.lazy},A={React:c,useState:c.useState,useEffect:c.useEffect,useRef:c.useRef,useMemo:c.useMemo,printMgr:u.A,loadsh:x.A,dayjs:I()},v=`const render = ($root) => {
  console.log("$root", $root);
  const App = () => {
    const [name, setName] = $root.useState("张三");
    return (
      <ProCard ghost direction='column'>
        <Button onClick={() => setName("李四")}>{name}</Button>

        <ProTable
          style={{ margin: "12px 0" }}
          size="small"
          bordered
          dataSource={[
            { id: 1, name: "张三", age: 28 },
            { id: 2, name: "李四", age: 32 },
            { id: 3, name: "王五", age: 24 },
          ]}
          columns={[
            { title: "ID", dataIndex: "id", key: "id" },
            { title: "姓名", dataIndex: "name", key: "name" },
            {
              title: "年龄", dataIndex: "age", key: "age", render: (_, { age }) => {
                return {
                  component: 'Tag', children: age + " 岁"
                };
              }
            },
            {
              title: "操作",
              valueType: "option",
              render: (_, record) => {
                return {
                  component: 'Button', type: 'link', children: '查看详情', onClick: () => {
                    alert("查看 " + record.name + " 的详情");
                  }
                }
              }
            },
          ]}
          rowKey="id"
          pagination={false}
          search={false}
        />
        <ProCard>
          <Descriptions title='用户信息' layout='vertical' size='small' bordered>
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </ProCard>
      </ProCard>
    )
  }
  return {
    component: "div",
    children: <App />
  }
}`;function C(){let[e,t]=(0,c.useState)(v),[n,d]=(0,c.useState)({component:"Descriptions",title:"User Info",size:"small",bordered:!0,layout:"vertical",children:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.A.Item,{label:"UserName",children:"Zhou Maomao"}),(0,a.jsx)(i.A.Item,{label:"Telephone",children:"1810000000"}),(0,a.jsx)(i.A.Item,{label:"Live",children:"Hangzhou, Zhejiang"}),(0,a.jsx)(i.A.Item,{label:"Remark",children:"empty"}),(0,a.jsx)(i.A.Item,{label:"Address",children:"No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China"})]})});return(0,a.jsxs)(r.A,{ghost:!0,children:[(0,a.jsx)(r.A,{title:"代码",headerBordered:!0,bodyStyle:{padding:0},extra:(0,a.jsx)(l.A,{children:(0,a.jsx)("a",{onClick:function(){try{let t=s.transform(e,{presets:["react"]}).code,n=["$root","React",...Object.keys(k)],a=Function(...n,`${t}; return render($root);`),r=[A,c,...Object.values(k)],o=a(...r);d(o)}catch(e){console.error("render error",e),d({component:"div",children:`渲染错误: ${e.message}`})}},children:"预览"})}),children:(0,a.jsx)(o.KE,{height:"calc(100vh - 90px)",width:"100%",theme:"vs-dark",value:e,language:"javascript",options:{fontSize:16,minimap:{enabled:!0},fontFamily:"Consolas, Courier New, monospace",scrollBeyondLastLine:!1,suggestOnTriggerCharacters:!0,quickSuggestions:!0,wordBasedSuggestions:!0,tabCompletion:"on",snippetSuggestions:"inline",parameterHints:{enabled:!0},autoClosingBrackets:"always",autoClosingQuotes:"always",autoSurround:"languageDefined"},onChange:e=>t(e),beforeMount:e=>{let t=Object.keys(k),n=`declare const components: {
${t.map(e=>`  ${e}: any;`).join("\n")}
};`;e.languages.typescript.javascriptDefaults.addExtraLib(n,"ts:filename/components.d.ts"),e.languages.typescript.javascriptDefaults.addExtraLib("declare const $root: any;","ts:filename/root.d.ts")}})}),(0,a.jsx)(r.A,{title:"预览效果",headerBordered:!0,bodyStyle:{padding:12,background:"#f6f6f7"},children:(0,a.jsx)(m.tP,{components:k,children:(0,a.jsx)(m.GD,{schema:n})})})]})}}}]);