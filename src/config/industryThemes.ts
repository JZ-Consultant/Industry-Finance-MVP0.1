export type IndustryTheme = {
  name: string;
  segments: string[];
};

export const INDUSTRY_THEMES: IndustryTheme[] = [
  {
    name: "大汽车",
    segments: [
      "整车",
      "动力电池",
      "电驱电控",
      "汽车电子",
      "智能座舱",
      "智能底盘",
      "热管理",
      "轻量化材料",
    ],
  },
  {
    name: "大电子",
    segments: [
      "半导体设计",
      "晶圆制造",
      "封测",
      "电子元器件",
      "消费电子",
      "服务器",
      "光模块",
      "PCB",
    ],
  },
  {
    name: "大材料",
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
    name: "大装备",
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
    name: "大医疗",
    segments: ["医疗器械", "医疗耗材", "IVD", "创新药", "CXO", "专科医疗服务"],
  },
  {
    name: "大能源",
    segments: ["光伏", "风电", "储能", "氢能", "电网设备", "充换电", "能源数字化"],
  },
];
