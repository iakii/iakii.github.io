import { DrawerForm } from "@ant-design/pro-components";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

const initialSchema = `const render = ($root) => {
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
            return await fetch(\`https://randomuser.me/api?results=${30 * 2}&\${query}\`)
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
}`;

export default function SchemaDrawer({ components, onFinish }) {
  const [reactCode, setReactCode] = useState(initialSchema);

  // 注册 components 变量到 monaco 的全局类型声明，提升自动补全体验
  const handleEditorWillMount = (monaco) => {
    // 注册 components 到 js/ts
    const componentKeys = Object.keys(components);
    const componentTypeDefs = `declare const components: {\n${componentKeys.map((k) => `  ${k}: any;`).join("\n")}\n};`;
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      componentTypeDefs,
      "ts:filename/components.d.ts"
    );
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      "declare const $root: any;",
      "ts:filename/root.d.ts"
    );
  };

  return (
    <DrawerForm
      title="Schema配置"
      width={"100vw"}
      trigger={<a>配置</a>}
      drawerProps={{
        styles: { body: { padding: 0 } },
        placement: "bottom",
        height: "100vh",
        size: "large",
      }}
      onFinish={() => {
        onFinish(reactCode);
        return true;
      }}
    >
      <Editor
        height="calc(100vh - 110px)"
        width="100%"
        theme="vs-dark"
        value={reactCode}
        language="javascript"
        options={{
          fontSize: 16,
          minimap: { enabled: true },
          fontFamily: "Consolas, Courier New, monospace",
          scrollBeyondLastLine: false,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          wordBasedSuggestions: true,
          tabCompletion: "on",
          snippetSuggestions: "inline",
          parameterHints: { enabled: true },
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoSurround: "languageDefined",
        }}
        onChange={(v) => setReactCode(v)}
        beforeMount={handleEditorWillMount}
      />
    </DrawerForm>
  );
}
