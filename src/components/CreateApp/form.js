import {
  FooterToolbar,
  ProCard,
  ProForm,
  ProFormField,
  ProFormGroup,
} from "@ant-design/pro-components";
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "@tanstack/react-router";
import { Card, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { babelCacheDB } from "../../core/BabelCacheDB";
import { AppComponents } from "../../core/babel/babelTools";

const codeInitialValue = `const render = ($root) => {
  const { request, useState, useForm } = $root;
  console.log("$root", $root);
  const App = () => {
    const [name, setName] = useState("张三");
    return (<div></div>);
  };
  return {
    component: "div",
    children: <App />
  }
}`;

export function AppFormComponent({ type = "create", record = {} }) {
  // const [components] = useJSXSchema();

  // 注册 components 变量到 monaco 的全局类型声明，提升自动补全体验
  const handleEditorWillMount = (monaco) => {
    // 注册 components 到 js/ts
    const componentKeys = Object.keys(AppComponents);
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

  const history = useNavigate();

  return (
    <ProCard ghost>
      <Card styles={{ body: { position: "relative" } }} variant="borderless">
        <ProForm
          onFinish={async (values) => {
            console.log("values", values);
            if (type === "edit") {
              const result = await babelCacheDB.updateRecord(record.id, values);
              console.log("result", result);

              if (result) {
                message.success("更新成功");
              }
              return;
            }

            const id = uuidv4();
            const params = {
              ...values,
              id,
            };

            const newRecord = await babelCacheDB.addRecord(
              params,
              {} // 自定义 Babel 解析插件
            );
            if (newRecord) {
              message.success("保存成功");
              history({ to: `/app/${newRecord.id}/edit` });
            }
            console.log("newRecord", newRecord);
          }}
          request={() => {
            if (type === "edit") {
              console.log("record", record);
              return { ...record };
            }
            return { code: codeInitialValue };
          }}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
        >
          <ProFormGroup>
            <ProFormField
              label="页面标题"
              name="name"
              rules={[{ message: "请输入页面标题", required: true }]}
            />
          </ProFormGroup>

          <ProFormField
            label="代码"
            rules={[{ message: "请输入代码", required: true }]}
            name="code"
            renderFormItem={(_, { value, onChange }) => {
              return (
                <Editor
                  height="calc(100vh - 308px)"
                  width="100%"
                  theme="vs-dark"
                  value={value}
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
                  onChange={(v) => {
                    console.log("v", v);
                    onChange(v);
                  }}
                  beforeMount={handleEditorWillMount}
                />
              );
            }}
          />
        </ProForm>
      </Card>
    </ProCard>
  );
}
