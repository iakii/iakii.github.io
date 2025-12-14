// const { babelJsx2Js, injectScript2Js } = require("./babelTools");
// 浏览器环境不支持 require，请确保 babelTools.js 已在 HTML 中引入，并将以下方法挂载到 window
// const { babelJsx2Js, injectScript2Js } = window;

const initialSchema = `const render = ($root) => {
  const {useAppContext } = $root;
  console.log("$root", $root);
  const { ProCard,Space , ProTable,AccountBookFilled} = AntComponents;
  const App = () => {
    const [name, setName] = useState("张三");
    const app = useAppContext();
    console.log(1111, app)
    return (
      <ProCard ghost direction='column' title={<Space>
        <AccountBookFilled />
        <a href="/cdn-react" target="_blank">{app.name}</a>
      </Space>} >

        <ProTable
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

const { ProSkeleton } = ProComponents;
const { useRequest } = ahooks;
const ComponentsMap = {};
window.AntComponents = { ...ProComponents, ...antd, ...icons };

console.log("ComponentsMap", ComponentsMap, window);
function Bootscrap() {
  const { data = {}, loading } = useRequest(
    async () => {
      const babel = await babelJsx2Js(initialSchema);
      return injectScript2Js(babel);
    },
    {
      refreshDeps: [],
    }
  );

  return loading ? (
    <ProSkeleton type="result" />
  ) : (
    <div style={{ padding: 16 }}>
      <AppContext.Provider value={{ name: "CDN React Antd 实例" }}>
        <React.Suspense fallback={<ProSkeleton type="result" />}>
          <SchemaProvider components={ComponentsMap}>
            <SchemaRender schema={data || schema}></SchemaRender>
          </SchemaProvider>
        </React.Suspense>
      </AppContext.Provider>
    </div>
  );
}

window.render = () => {
  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(<Bootscrap />);
  return Promise.resolve();
};
