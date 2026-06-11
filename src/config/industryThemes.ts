export type IndustryTheme = {
  id: string;
  name: string;
  description: string;
  segments: string[];
};

export const INDUSTRY_THEMES: IndustryTheme[] = [
  {
    id: "auto",
    name: "大汽车",
    description:
      "覆盖整车、三电系统、电子电气、智能座舱、智能驾驶、热管理、轻量化等赛道。",
    segments: [
      "整车",
      "三电系统",
      "电子电气",
      "智能座舱",
      "智能驾驶",
      "热管理",
      "轻量化",
    ],
  },
  {
    id: "electronics",
    name: "大电子",
    description:
      "覆盖半导体、电子元器件、消费电子、服务器、光模块、PCB 等赛道。",
    segments: [
      "半导体",
      "电子元器件",
      "消费电子",
      "服务器",
      "光模块",
      "PCB",
    ],
  },
  {
    id: "materials",
    name: "大材料",
    description:
      "覆盖化工新材料、锂电材料、半导体材料、金属材料、高分子材料、碳纤维等赛道。",
    segments: [
      "化工新材料",
      "锂电材料",
      "半导体材料",
      "金属材料",
      "高分子材料",
      "碳纤维",
    ],
  },
  {
    id: "equipment",
    name: "大装备",
    description:
      "覆盖工程机械、工业机器人、数控机床、船舶海工、轨交装备、航空装备等赛道。",
    segments: [
      "工程机械",
      "工业机器人",
      "数控机床",
      "船舶海工",
      "轨交装备",
      "航空装备",
    ],
  },
  {
    id: "healthcare",
    name: "大医疗",
    description:
      "覆盖医疗器械、医疗耗材、IVD、创新药、CXO、专科医疗服务等赛道。",
    segments: ["医疗器械", "医疗耗材", "IVD", "创新药", "CXO", "专科医疗服务"],
  },
  {
    id: "energy",
    name: "大能源",
    description:
      "覆盖光伏、风电、储能、氢能、电网设备、充换电、能源数字化等赛道。",
    segments: ["光伏", "风电", "储能", "氢能", "电网设备", "充换电", "能源数字化"],
  },
];
