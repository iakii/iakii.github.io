import { getQuickJS } from "quickjs-emscripten";
import { useState } from "react";
import * as Babel from "@babel/standalone";

// 4. 自定义 Hook：懒加载 QuickJS 并执行 JSX
export function useQuickJS() {
  const [vm, setVm] = useState(null);

  useEffect(() => {
    getQuickJS().then((QJS) => {
      const ctx = QJS.newContext();
      ctx.evalCode(reactShim);
      setVm(ctx);
    });
  }, []);

  const runJSX = async (jsx) => {
    if (!vm) throw new Error("QuickJS 尚未加载");
    const js = Babel.transform(jsx, {
      presets: [["react", { runtime: "classic" }]],
    }).code;
    const res = vm.evalCode(`${js}; App()`);
    if (res.error) throw new Error(res.error);
    return vm.dump(res.value);
  };

  return { ready: !!vm, runJSX };
}
