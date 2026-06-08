import { createFileRoute } from "@tanstack/react-router";

import { BuildingPlaceholderPage } from "@/components/workbench/BuildingPlaceholderPage";
import { getModuleById } from "@/config/workbenchModules";

const moduleDef = getModuleById("customer-marketing-guide")!;

export const Route = createFileRoute("/customer-marketing-guide")({
  head: () => ({
    meta: [{ title: `${moduleDef.title} · 产业金融知识资产工作台` }],
  }),
  component: () => <BuildingPlaceholderPage module={moduleDef} />,
});
