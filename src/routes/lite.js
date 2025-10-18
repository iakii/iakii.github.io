// // import { createFileRoute } from "@tanstack/react-router";
// // import { Button } from "antd";
// // import { useEffect, useRef } from "react";
// // import ReactDOM from "react-dom/client";
// // import { useJSXSchema } from "./online/hooks/useJSXSchema";
// // // import { initialSchema } from "./online/components/SchemaDrawer";
// // import * as Babel from "@babel/standalone";

// import { ProForm } from "@ant-design/pro-components";

// // const initialSchema = `
// // <Fragment>
// // <h1>33</h1>
// // <Button type="primary">按钮</Button>
// // </Fragment>
// // `;

// // export const Route = createFileRoute("/lite")({
// //   component: RouteComponent,
// // });

// function RouteComponent() {
//   const containerRef = useRef(null);

//   const [schema, useJSX] = useJSXSchema();

//   useEffect(() => {
//     console.log("lite schema", schema);

//     // const transformed = Babel.transform(initialSchema, {
//     //   presets: ["react"],
//     // }).code;
//     // containerRef.current?.innerHTML = transformed;

//     // let root = ReactDOM.createRoot(containerRef.current);
//     // root.render(transformed);
//   }, [schema]);

// //  const [form]= ProForm.useForm()

//   return (
//     <div>
//       <Button onClick={() => useJSX(initialSchema)}>生成</Button>

//       <div ref={containerRef}></div>


//     </div>
//   );
// }
