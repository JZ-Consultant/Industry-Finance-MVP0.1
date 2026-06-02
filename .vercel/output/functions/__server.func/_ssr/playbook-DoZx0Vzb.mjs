import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as playbookSegments } from "./playbook-D-huzS1X.mjs";
function PlaybookPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-8 px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-2 border-b border-border pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-6 bg-[var(--gold)]" }),
        "客群经营 · 营销手册"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: "客户经理营销手册" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-relaxed text-muted-foreground", children: "按细分客群组织客群特征、典型融资需求、营销切入话术、产品适配方案与交叉经营机会，供客户经理在拜访与方案制订环节直接调用。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: playbookSegments.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border bg-muted/40 px-6 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
            "S-",
            String(idx + 1).padStart(2, "0")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold tracking-tight text-foreground", children: s.segment })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "客群经营方案" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-px bg-border md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: "客群特征", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90", children: s.profile }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: "典型融资需求", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: s.needs.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 bg-[var(--gold)]" }),
          n
        ] }, n)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: "客户经理营销话术", children: /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "border-l-2 border-[var(--gold)] bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground", children: s.pitch }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: "推荐产品适配", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: s.products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 bg-[var(--primary)]" }),
          p
        ] }, p)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: "交叉经营机会", full: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-1.5 sm:grid-cols-3", children: s.crossSell.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1 w-1 shrink-0 bg-muted-foreground" }),
          c
        ] }, c)) }) })
      ] })
    ] }, s.segment)) })
  ] });
}
function Block({
  label,
  children,
  full
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-2 bg-card p-5 ${full ? "md:col-span-2" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: label }),
    children
  ] });
}
export {
  PlaybookPage as component
};
