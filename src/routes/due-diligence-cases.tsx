import { createFileRoute } from "@tanstack/react-router";

import { BuildingPlaceholderPage } from "@/components/workbench/BuildingPlaceholderPage";
import { getModuleById } from "@/config/workbenchModules";

const moduleDef = getModuleById("due-diligence-cases")!;

export const Route = createFileRoute("/due-diligence-cases")({
  head: () => ({
    meta: [{ title: `${moduleDef.title} · 产业金融知识资产工作台` }],
  }),
  component: () => <BuildingPlaceholderPage module={moduleDef} />,
});
