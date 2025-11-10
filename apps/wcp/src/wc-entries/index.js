// greeting-wc.js
// 导入你想要转换的 React 组件
import {
  defineMetabaseAuthConfig,
  defineMetabaseTheme,
  EditableDashboard,
  InteractiveDashboard,
  InteractiveQuestion,
  MetabaseProvider,
} from "@metabase/embedding-sdk-react";
import GreetingWebComponent from "../components/Greeting";
import TestWebComponent from "../components/Test";
import MetabaseProviderComponent from "./exports/MetabaseProviderPropsComponent";

// 注册 Web Component
// 标签名必须包含连字符 (-)
customElements.define("my-test", TestWebComponent);
customElements.define("my-greeting", GreetingWebComponent);
customElements.define("metabase-provider", MetabaseProviderComponent);

// (可选) 如果你需要在其他 JS 模块中引用这个 WC 类，可以导出它
export default {
  GreetingWebComponent,
  TestWebComponent,
  MetabaseProviderComponent,
  MetabaseProvider,
  EditableDashboard,
  InteractiveDashboard,
  InteractiveQuestion,
  defineMetabaseAuthConfig,
  defineMetabaseTheme,
};
