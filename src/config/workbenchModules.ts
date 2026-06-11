import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Layers,
  Building2,
  Megaphone,
  ShieldCheck,
  ClipboardList,
  FileSearch,
  GraduationCap,
  Briefcase,
  MapPin,
  Puzzle,
  Trophy,
  Sparkles,
} from "lucide-react";

export type ModuleGroupId = "cognition" | "customer" | "risk" | "empowerment";

export type ModuleStatus = "available" | "building";

export type WorkbenchModule = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
  groupId: ModuleGroupId;
  groupLabel: string;
  status: ModuleStatus;
  statusLabel: string;
  futureStructure: string[];
  showSegmentFilter: boolean;
  eyebrow?: string;
};

export const MODULE_GROUPS: Array<{ id: ModuleGroupId; label: string }> = [
  { id: "cognition", label: "产业认知层" },
  { id: "customer", label: "客群经营层" },
  { id: "risk", label: "信审风控层" },
  { id: "empowerment", label: "一线赋能层" },
];

export const WORKBENCH_MODULES: WorkbenchModule[] = [
  {
    id: "home",
    title: "首页",
    description: "产业金融知识资产门户，统一进入各模块与能力入口。",
    url: "/",
    icon: LayoutDashboard,
    groupId: "cognition",
    groupLabel: "门户",
    status: "available",
    statusLabel: "已上线",
    futureStructure: ["模块导航", "能力概览", "快速入口"],
    showSegmentFilter: false,
    eyebrow: "Workbench Portal",
  },
  {
    id: "industry-overview",
    title: "覆盖产业概览",
    description:
      "展示大汽车、大电子、大材料、大装备、大医疗、大能源六大产业及细分赛道。",
    url: "/industry-overview",
    icon: Layers,
    groupId: "cognition",
    groupLabel: "产业认知层",
    status: "available",
    statusLabel: "已上线",
    futureStructure: ["六大产业主题", "细分赛道图谱", "赛道联动入口"],
    showSegmentFilter: false,
    eyebrow: "产业认知 · 覆盖概览",
  },
  {
    id: "companies",
    title: "目标企业名单",
    description:
      "基于客群分类、企业资质、授信潜力与竞争力标签筛选目标企业。",
    url: "/companies",
    icon: Building2,
    groupId: "customer",
    groupLabel: "客群经营层",
    status: "available",
    statusLabel: "已上线",
    futureStructure: ["多维筛选", "企业列表", "营销作战指南"],
    showSegmentFilter: true,
    eyebrow: "客群经营 · 目标名单",
  },
  {
    id: "customer-marketing-guide",
    title: "客群营销指引",
    description:
      "按客群展示客户经理营销手册、客户痛点、融资需求和拜访问题。",
    url: "/marketing",
    icon: Megaphone,
    groupId: "customer",
    groupLabel: "客群经营层",
    status: "available",
    statusLabel: "已上线",
    futureStructure: ["客群画像", "融资需求", "营销话术", "拜访问题清单"],
    showSegmentFilter: true,
    eyebrow: "客群经营 · 营销指引",
  },
  {
    id: "credit-standards",
    title: "信审评估要点",
    description:
      "按客群展示信审评估框架、准入标准和关键风险识别点。",
    url: "/credit-standards",
    icon: ShieldCheck,
    groupId: "risk",
    groupLabel: "信审风控层",
    status: "available",
    statusLabel: "已上线",
    futureStructure: ["评估维度", "准入标准", "关键风险信号"],
    showSegmentFilter: true,
    eyebrow: "授信准入 · 评估要点",
  },
  {
    id: "due-diligence-templates",
    title: "客群尽调模板",
    description: "按客群展示核心尽调模板和关键尽调问题。",
    url: "/due-diligence-templates",
    icon: ClipboardList,
    groupId: "risk",
    groupLabel: "信审风控层",
    status: "building",
    statusLabel: "建设中",
    futureStructure: ["尽调清单", "关键问题库", "资料要求"],
    showSegmentFilter: true,
    eyebrow: "授信准入 · 尽调模板",
  },
  {
    id: "due-diligence-cases",
    title: "尽调实战案例",
    description: "按客群展示历史企业尽调报告案例。",
    url: "/due-diligence-cases",
    icon: FileSearch,
    groupId: "risk",
    groupLabel: "信审风控层",
    status: "available",
    statusLabel: "已上线",
    futureStructure: ["案例库", "尽调报告摘要", "风险识别要点"],
    showSegmentFilter: true,
    eyebrow: "授信准入 · 实战案例",
  },
  {
    id: "training",
    title: "产业经营培训营",
    description: "展示产业培训 PPT、视频课程和测试题库。",
    url: "/training",
    icon: GraduationCap,
    groupId: "empowerment",
    groupLabel: "一线赋能层",
    status: "building",
    statusLabel: "建设中",
    futureStructure: ["培训 PPT", "视频课程", "测试题库"],
    showSegmentFilter: false,
    eyebrow: "一线赋能 · 培训营",
  },
  {
    id: "key-account-templates",
    title: "大客户营销模板",
    description: "按客群展示重点客户拜访材料和综合金融方案模板。",
    url: "/key-account-templates",
    icon: Briefcase,
    groupId: "customer",
    groupLabel: "客群经营层",
    status: "building",
    statusLabel: "建设中",
    futureStructure: ["拜访材料", "方案模板", "综合金融服务组合"],
    showSegmentFilter: true,
    eyebrow: "客群经营 · 大客户模板",
  },
  {
    id: "regional-strategy",
    title: "区域深耕策略",
    description: "展示全国各区域产业特点与经营策略。",
    url: "/regional-strategy",
    icon: MapPin,
    groupId: "cognition",
    groupLabel: "产业认知层",
    status: "building",
    statusLabel: "建设中",
    futureStructure: ["区域产业画像", "集群地图", "经营策略建议"],
    showSegmentFilter: false,
    eyebrow: "产业认知 · 区域策略",
  },
  {
    id: "industry-solutions",
    title: "产业特色解决方案",
    description: "按客群展示特色产品方案和综合金融服务组合。",
    url: "/industry-solutions",
    icon: Puzzle,
    groupId: "customer",
    groupLabel: "客群经营层",
    status: "building",
    statusLabel: "建设中",
    futureStructure: ["产品方案", "服务组合", "场景化切入"],
    showSegmentFilter: true,
    eyebrow: "客群经营 · 产业方案",
  },
  {
    id: "peer-success-cases",
    title: "领先同业成功案例",
    description: "按客群展示领先银行成功营销落地案例。",
    url: "/peer-success-cases",
    icon: Trophy,
    groupId: "empowerment",
    groupLabel: "一线赋能层",
    status: "building",
    statusLabel: "建设中",
    futureStructure: ["同业案例", "落地路径", "可复制经验"],
    showSegmentFilter: true,
    eyebrow: "一线赋能 · 同业案例",
  },
  {
    id: "assistant",
    title: "产业金融AI助手",
    description:
      "基于知识资产生成客户画像、拜访提纲、授信关注点和综合金融方案。",
    url: "/assistant",
    icon: Sparkles,
    groupId: "empowerment",
    groupLabel: "一线赋能层",
    status: "building",
    statusLabel: "演示版",
    futureStructure: [
      "客户画像",
      "拜访提纲",
      "授信关注点",
      "综合金融方案",
    ],
    showSegmentFilter: false,
    eyebrow: "知识资产 · 智能问答",
  },
];

export function getModuleById(id: string): WorkbenchModule | undefined {
  return WORKBENCH_MODULES.find((module) => module.id === id);
}

export function getModulesByGroup(groupId: ModuleGroupId): WorkbenchModule[] {
  return WORKBENCH_MODULES.filter(
    (module) => module.groupId === groupId && module.id !== "home",
  );
}

export const HOME_MODULE_GROUPS = MODULE_GROUPS.map((group) => ({
  ...group,
  modules: WORKBENCH_MODULES.filter(
    (module) => module.groupId === group.id && module.id !== "home",
  ),
}));
