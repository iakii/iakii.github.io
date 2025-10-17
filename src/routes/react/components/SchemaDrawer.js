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
            {},
            {
              title: "操作",
              valueType: "option",
              align: 'right',
              render: (_, record) => {
                return <DrawerForm title='详情' trigger={<a>详情</a>}>{JSON.stringify(record)}
                  <ProCard>
                    <Button style={{ marginBottom: 16 }} onClick={() => setName("李四 " + Date.now())}>{name}</Button>
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
                </DrawerForm>
              }
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
      drawerProps={{ styles: { body: { padding: 0 } }, placement: "bottom",height: '100vh',size: 'large' }}
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
