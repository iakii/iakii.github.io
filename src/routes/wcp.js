import { AppstoreAddOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Skeleton } from "antd";
import React, { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/wcp")({
  component: RouteComponent,
  staticData: {
    name: "WCP - Web Component",
    icon: <AppstoreAddOutlined />,
    index: 98,
  },
});

/**
 * @description 注册script
 * @author 熊凯(一只熊猫🐼)
 * @date 11/11/2025
 * @param {string} src 路径
 * @param {string} scriptId 脚本id
 * @param {boolean} [unmount=false] 是否卸载
 * @return {boolean} 加载状态
 */
function useScript(src, scriptId, unmount = false) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    if (scriptId && document.getElementById(scriptId)) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    if (scriptId) script.id = scriptId;
    script.src = src;
    script.onload = () => {
      setLoaded(true);
      console.log("Script loaded:", window);
    };
    document.body.appendChild(script);

    return () => {
      // 可选：卸载时移除 script
      if (script.parentNode && unmount) script.parentNode.removeChild(script);
    };
  }, [src, scriptId]);

  return loaded;
}

function RouteComponent() {
  const ref = useRef(null);
  const ready = useScript("/wcp/mtba-wcp.cjs", "metabase-wc-script");

  useEffect(() => {
    if (!ready || !ref.current) return;
    const el = ref.current;
    const handler = (e) => {
      alert("Hello事件: " + e.detail.name);
    };
    el.addEventListener("hello", handler);
    return () => el.removeEventListener("hello", handler);
  }, [ready]);

  return (
    <div>
      <h2>动态加载 Web Component</h2>
      {ready ? (
        <>
          <hello-component ref={ref} name="89898"></hello-component>
          <collection-app
            id={6}
            url="/metabase"
          ></collection-app>
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
