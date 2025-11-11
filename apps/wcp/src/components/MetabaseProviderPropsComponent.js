import {
  defineMetabaseAuthConfig,
  defineMetabaseTheme,
  MetabaseProvider,
} from "@metabase/embedding-sdk-react";
import { React, useEffect } from "react";

export function MetaProvider({ children, metabaseInstanceUrl, apiKey, brand }) {
  const theme = defineMetabaseTheme({
    fontFamily: "新宋",
    colors: {
      brand: brand || "#088844",
      "text-primary": "#4C5773",
      "text-secondary": "#696E7B",
      "text-tertiary": "#949AAB",
    },
    components: {
      dashboard: {},
    },
  });

  useEffect(() => {
    const metaBase = document.querySelector("#metabase-sdk-portal-root");
    if (metaBase) metaBase.style.display = "none";
  }, []);

  if (!metabaseInstanceUrl || !apiKey) return <div>加载中...</div>;
  return (
    <MetabaseProvider
      theme={theme}
      isLocalHost
      locale="zh-cn"
      loaderComponent={() => <div>加载中...</div>}
      errorComponent={({ error, message }) => (
        <div>
          Oops!!!!!出错了 {message} <br /> {error.toString()}
        </div>
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
