import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { i as industryOverview, C as Card, c as CardContent } from "./card-Dz-ERj65.mjs";
import { a as companies } from "./router-BZEHP-A3.mjs";
import { p as playbookSegments } from "./playbook-D-huzS1X.mjs";
import { c as creditFramework } from "./creditFramework-Du3uuqFO.mjs";
import { B as BookOpen, a as Building2, M as Megaphone, S as ShieldCheck, A as ArrowUpRight } from "../_libs/lucide-react.mjs";
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
const modules = [{
  no: "01",
  title: "行业知识库",
  desc: "行业趋势、产业链结构、区域产业集群与银行经营机会全景。",
  meta: "4 项行业趋势 · 5 段产业链 · 5 个重点区域",
  url: "/industry",
  icon: BookOpen
}, {
  no: "02",
  title: "目标企业名单",
  desc: "结构化的目标客群清单，支持按城市、赛道、优先级筛选，定位营销切入点。",
  meta: "8 家重点企业 · 多维筛选",
  url: "/companies",
  icon: Building2
}, {
  no: "03",
  title: "客户经理营销手册",
  desc: "按细分客群组织客群特征、典型需求、营销话术与产品适配方案。",
  meta: "4 类客群 · 营销话术 + 产品组合",
  url: "/playbook",
  icon: Megaphone
}, {
  no: "04",
  title: "信审评估框架",
  desc: "覆盖授信准入到风险识别的 8 个行业化维度，统一前中后台评估口径。",
  meta: "8 个维度 · 关键信号清单",
  url: "/credit",
  icon: ShieldCheck
}];
function Dashboard() {
  const highPriority = companies.filter((c) => c.priority === "高").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-[var(--primary)] text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-8 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-primary-foreground/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-[var(--gold)]" }),
        "产业金融经营驾驶舱"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl font-semibold tracking-tight md:text-[34px]", children: "产业金融知识资产工作台" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-3xl text-sm leading-relaxed text-primary-foreground/75 md:text-[15px]", children: "沉淀产业研究、目标客群、营销策略与信审框架，赋能商业银行产业金融经营。 将咨询项目积累的行业洞察与方法论，转化为客户经理、产品经理与风险审批可直接调用的数字化资产。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-px overflow-hidden rounded-sm bg-primary-foreground/15 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStat, { label: "已沉淀行业知识资产", value: industryOverview.name, detail: `${industryOverview.trends.length} 项趋势 · ${industryOverview.chain.length} 段产业链 · ${creditFramework.length} 维信审框架` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStat, { label: "重点目标客群", value: `${companies.length} 家重点企业`, detail: `高优先级 ${highPriority} 家 · 覆盖 ${new Set(companies.map((c) => c.segment)).size} 个细分赛道` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStat, { label: "银行经营机会", value: `${industryOverview.bankOpportunities.length} 类产品切入`, detail: "设备更新 · 供应链金融 · 跨境与并购" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-end justify-between border-b border-border pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Section 01" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-base font-semibold tracking-tight text-foreground", children: "知识资产模块" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "点击任一模块进入详情" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px overflow-hidden bg-border md:grid-cols-2", children: modules.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: m.url, className: "group bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col gap-3 p-6 transition-colors hover:bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: m.no }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: "h-4 w-4 text-[var(--primary)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[15px] font-semibold tracking-tight text-foreground", children: m.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground transition-colors group-hover:text-[var(--primary)]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: m.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-3 text-[11px] uppercase tracking-wider text-muted-foreground/80", children: m.meta })
      ] }) }, m.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-8 pb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-end justify-between border-b border-border pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Section 02" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-1 text-base font-semibold tracking-tight text-foreground", children: [
            "当前示例行业 · ",
            industryOverview.name
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/industry", className: "text-xs text-[var(--primary)] hover:underline", children: "查看完整行业概览 →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SnapshotCard, { label: "景气度判断", value: industryOverview.sentiment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SnapshotCard, { label: "区域产业集群", value: industryOverview.region }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SnapshotCard, { label: "银行经营切入", value: industryOverview.bankOpportunity })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "客群经营覆盖" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: playbookSegments.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1 w-1 shrink-0 bg-[var(--gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: s.segment })
          ] }, s.segment)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: "授信准入 · 关键维度" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-foreground", children: creditFramework.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.dim })
          ] }, c.dim)) })
        ] }) })
      ] })
    ] })
  ] });
}
function HeroStat({
  label,
  value,
  detail
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[var(--primary)] p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xl font-semibold tracking-tight text-primary-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-primary-foreground/65", children: detail })
  ] });
}
function SnapshotCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-relaxed text-foreground", children: value })
  ] }) });
}
export {
  Dashboard as component
};
