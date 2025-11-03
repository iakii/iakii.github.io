import {
  defineMetabaseAuthConfig,
  defineMetabaseTheme,
  MetabaseProvider,
} from "@metabase/embedding-sdk-react";
import { useLocation } from "@tanstack/react-router";
import { Result } from "antd";
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

export default function MetaProvider({ children }) {
  const { apiKey, metabaseInstanceUrl } = useLocation().search;

  useEffect(() => {
    const metaBase = document.querySelector("#metabase-sdk-portal-root");
    if (metaBase) metaBase.style.display = "none";
  }, []);

  console.log("MetaProvider:", { apiKey, metabaseInstanceUrl });

  return (
    <MetabaseProvider
      theme={theme}
      isLocalHost
      locale="zh-cn"
      errorComponent={({ error, message }) => (
        <Result title={"Oops!!!!!出错了"} extra={message} status="error" />
      )}
      authConfig={defineMetabaseAuthConfig({
        metabaseInstanceUrl: metabaseInstanceUrl || "/metabase-proxy",
        apiKey: apiKey || "mb_G4WwC6QzXY/ez2p7yztmcvfMfrXmW+iL1YtCF2ESGfg=",
      })}
    >
      {children}
    </MetabaseProvider>
  );
}
