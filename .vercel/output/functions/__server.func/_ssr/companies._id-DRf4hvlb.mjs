import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-10 text-sm text-destructive", children: [
  "加载失败：",
  error.message
] });
export {
  SplitErrorComponent as errorComponent
};
