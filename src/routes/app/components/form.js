import {
  FooterToolbar,
  ProCard,
  ProForm,
  ProFormField,
  ProFormGroup,
} from "@ant-design/pro-components";
import { Editor } from "@monaco-editor/react";
import { useNavigate } from "@tanstack/react-router";
import { Card } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useLocalForage } from "../../../core/hooks/useLocalForage";
import { useJSXSchema } from "../../online/hooks/useJSXSchema";

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
  const [schema, useJSX, components] = useJSXSchema();

  const { add, update } = useLocalForage("app");

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

  const history = useNavigate();

  return (
    <ProCard ghost>
      <Card styles={{ body: { position: "relative" } }} variant="borderless">
        <ProForm
          onFinish={async (values) => {
            const schema = await useJSX(values.code);
            const code = window.btoa(JSON.stringify(schema));
            if (type === "edit") {
              const params = {
                id: record.id,
                name: values.name,
                code,
                codeSource: values.code,
              };
              console.log("update params", params, values);
              update(record.id, params).then(() => {
                alert("更新成功");
              });
              return;
            }

            const params = {
              id,
              name: values.name,
              code,
              codeSource: values.code,
            };
            const id = uuidv4();
            add(params).then(() => {
              alert("保存成功");
              history({ to: `/app/${id}/edit` });
            });
          }}
          request={() => {
            if (type === "edit") {
              console.log("record", record);
              return { ...record, code: record.codeSource };
            }
            return { code: codeInitialValue };
          }}
          //   initialValues={{ code: codeInitialValue, ...record }}
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
              console.log("value", value);
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
