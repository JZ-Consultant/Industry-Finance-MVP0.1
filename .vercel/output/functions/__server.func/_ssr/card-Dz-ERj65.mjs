import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-BZEHP-A3.mjs";
const industryOverview = {
  name: "汽车零部件行业",
  sentiment: "景气度：稳中向上（新能源与智能化驱动）",
  region: "重点区域：长三角、珠三角",
  bankOpportunity: "银行机会：设备更新贷 / 供应链金融 / 出海金融",
  trends: [
    {
      title: "新能源化",
      desc: "三电系统、热管理、高压连接器需求高速放量，传统燃油零部件加速转型。"
    },
    {
      title: "智能化",
      desc: "智能驾驶、智能座舱、域控制器催生新增量赛道，软硬件融合趋势明显。"
    },
    {
      title: "国产替代",
      desc: "芯片、传感器、轻量化材料持续突破，自主品牌份额加速提升。"
    },
    {
      title: "出海扩张",
      desc: "整车出口拉动零部件配套出海，墨西哥、东南亚、欧洲建厂加速。"
    }
  ],
  chain: [
    { stage: "原材料", items: ["特钢", "铝合金", "工程塑料", "稀土永磁"] },
    { stage: "核心零部件", items: ["电池", "电机", "电控", "传感器", "连接器"] },
    { stage: "系统集成", items: ["热管理系统", "智能座舱", "底盘域控", "ADAS"] },
    { stage: "整车配套", items: ["新势力", "自主品牌", "合资品牌"] },
    { stage: "后市场", items: ["维修保养", "改装升级", "回收再制造"] }
  ],
  regions: [
    { name: "江苏", desc: "苏州、无锡、常州——核心零部件与电控集群" },
    { name: "浙江", desc: "宁波、杭州——轻量化材料与底盘系统" },
    { name: "上海", desc: "智能驾驶、智能座舱、外资总部聚集" },
    { name: "广东", desc: "深圳、广州——电子电控与新势力供应链" },
    { name: "安徽", desc: "合肥——新能源整车与连接器配套" }
  ],
  bankOpportunities: [
    { title: "设备更新贷", desc: "支持产线智能化改造与新能源产能扩张。" },
    { title: "供应链金融", desc: "围绕核心车企应收账款做反向保理与订单融资。" },
    { title: "订单融资", desc: "基于定点函与长期协议提前释放流动性。" },
    { title: "并购贷款", desc: "支持横向整合与海外标的收购。" },
    { title: "外汇避险服务", desc: "服务出海企业的汇率与跨境结算需求。" }
  ]
};
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-sm border border-border bg-card text-card-foreground", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
export {
  Card as C,
  CardHeader as a,
  CardTitle as b,
  CardContent as c,
  industryOverview as i
};
