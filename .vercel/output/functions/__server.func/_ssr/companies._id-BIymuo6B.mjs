import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route } from "./router-BZEHP-A3.mjs";
import { g as ArrowLeft } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
function Section({
  no,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-3 border-b border-border bg-muted/40 px-5 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: no }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-tight text-foreground", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 text-sm leading-relaxed text-foreground", children })
  ] });
}
function BulletList({
  items,
  accent = "gold"
}) {
  const color = accent === "gold" ? "bg-[var(--gold)]" : "bg-[var(--primary)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: items.map((i, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-2 h-1 w-1 shrink-0 ${color}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90", children: i })
  ] }, idx)) });
}
function priorityLabel(p) {
  if (p === "高") return {
    color: "bg-[var(--gold)]",
    text: "高优先级"
  };
  if (p === "中") return {
    color: "bg-[var(--teal)]",
    text: "中优先级"
  };
  return {
    color: "bg-muted-foreground/50",
    text: "低优先级"
  };
}
function CompanyDetail() {
  const {
    company
  } = Route.useLoaderData();
  const pri = priorityLabel(company.priority);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6 px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/companies", className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " 返回目标企业名单"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-3 border-b border-border pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: company.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: company.segment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${pri.color}` }),
          pri.text
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: company.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-sm leading-relaxed text-muted-foreground", children: company.intro })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { no: "01", title: "企业基本信息", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-3 gap-y-2.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "所在城市" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "col-span-2 text-foreground", children: company.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "细分赛道" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "col-span-2 text-foreground", children: company.segment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "营销优先级" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "col-span-2 text-foreground", children: pri.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "营销切入" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "col-span-2 text-foreground", children: company.opportunity }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "风险识别" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "col-span-2 text-foreground", children: company.risk })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { no: "02", title: "主营产品与业务", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90", children: company.products }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { no: "03", title: "营销切入路径", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: company.marketingHooks, accent: "gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { no: "04", title: "产品适配方案", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: company.productPlan, accent: "primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { no: "05", title: "授信准入关注点", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: company.creditFocus, accent: "primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { no: "06", title: "客户经理拜访清单", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: company.visitQuestions, accent: "gold" }) })
    ] })
  ] });
}
export {
  CompanyDetail as component
};
