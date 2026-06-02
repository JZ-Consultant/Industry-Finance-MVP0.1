import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as creditFramework } from "./creditFramework-Du3uuqFO.mjs";
function CreditPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-8 px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-2 border-b border-border pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-6 bg-[var(--gold)]" }),
        "授信准入 · 风险识别"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: "汽车零部件行业信审评估框架" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-relaxed text-muted-foreground", children: "覆盖赛道景气度、技术壁垒、客户结构、订单稳定性、毛利率与现金流、产能利用率、应收账款质量及负面风险信号共 8 个维度，统一前中后台评估口径，支撑授信准入与持续风险识别。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px overflow-hidden bg-border md:grid-cols-2", children: creditFramework.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between border-b border-border pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
            "D-",
            String(idx + 1).padStart(2, "0")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: c.dim })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: "Dimension" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: c.desc }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground", children: "关键风险信号" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: c.signals.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 bg-[var(--gold)]" }),
          s
        ] }, s)) })
      ] })
    ] }, c.dim)) })
  ] });
}
export {
  CreditPage as component
};
