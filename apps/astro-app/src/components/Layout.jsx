import { ProSkeleton } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import React from "react";
import {
  SchemaProvider,
  SchemaRender
} from "react-schema-render";
import {
  AppComponents,
  AppContext,
  babelJsx2Js,
  injectScript2Js,
} from "../core/babel/babelTools";


export const initialSchema = `const render = ($root) => {
  const { request, useState, useForm, useAppContext } = $root;
  console.log("$root", $root);
  const App = () => {
    const [name, setName] = useState("张三");
    const app = useAppContext();
    console.log(1111, app)
    return (
      <ProCard ghost direction='column'  >
        <ProTable
          style={{ margin: "12px 0" }}
          size="small"
          bordered

          request={async({current,pageSize})=>{
            const query = \`page=\${current}&size=\${pageSize}\`;
            return await request(\`https://randomuser.me/api?results=${30 * 2}&\${query}\`)
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
}`;


export function Layout({}) {
  const { data = {}, loading } = useRequest(
    async () => {
      const babel =await babelJsx2Js(initialSchema);
      return injectScript2Js(babel);
    },
    {
      refreshDeps: [],
    }
  );
  console.log(908, data, loading);

  return loading ? (
    <ProSkeleton type="result" />
  ) : (
    <AppContext.Provider value={{ name: "test", ...data }}>
      <React.Suspense fallback={<ProSkeleton type="result" />}>
        <SchemaProvider components={AppComponents}>
          <SchemaRender schema={data || ""}></SchemaRender>
        </SchemaProvider>
      </React.Suspense>
    </AppContext.Provider>
  );
}
