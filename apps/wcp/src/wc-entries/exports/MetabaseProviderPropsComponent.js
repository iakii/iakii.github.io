import r2wc from "@r2wc/react-to-web-component";

import {
  defineMetabaseAuthConfig,
  defineMetabaseTheme,
  MetabaseProvider,
} from "@metabase/embedding-sdk-react";
import { useEffect } from "react";

const theme = defineMetabaseTheme({
  fontFamily: "新宋",
  colors: {
    brand: "#088844",
    "text-primary": "#4C5773",
    "text-secondary": "#696E7B",
    "text-tertiary": "#949AAB",
  },
  components: {
    dashboard: {},
  },
});

export function MetaProvider({ children, metabaseInstanceUrl, apiKey }) {
  useEffect(() => {
    const metaBase = document.querySelector("#metabase-sdk-portal-root");
    if (metaBase) metaBase.style.display = "none";
  }, []);

  if (!metabaseInstanceUrl || !apiKey)
    return <Skeleton active avatar paragraph={{ rows: 4 }} />;
  return (
    <MetabaseProvider
      theme={theme}
      isLocalHost
      locale="zh-cn"
      loaderComponent={() => <Skeleton active avatar paragraph={{ rows: 4 }} />}
      errorComponent={({ error, message }) => (
        <Result title={"Oops!!!!!出错了"} extra={message} status="error" />
      )}
      authConfig={defineMetabaseAuthConfig({
        metabaseInstanceUrl,
        apiKey,
      })}
    >
      {children}
    </MetabaseProvider>
  );
}

const MetabaseProviderComponent = r2wc(MetaProvider, {
  props: {},
  shadow: "open", // 启用 Shadow DOM，隔离样式和 DOM
});

export default MetabaseProviderComponent;
