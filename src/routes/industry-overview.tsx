import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuildingStatusBanner } from "@/components/workbench/ModuleStatusBadge";
import { ModulePageHeader } from "@/components/workbench/ModulePageHeader";
import { INDUSTRY_THEMES } from "@/config/industryThemes";
import { getModuleById } from "@/config/workbenchModules";

const moduleDef = getModuleById("industry-overview")!;

export const Route = createFileRoute("/industry-overview")({
  head: () => ({
    meta: [
      { title: "覆盖产业概览 · 产业金融知识资产工作台" },
      {
        name: "description",
        content: moduleDef.description,
      },
    ],
  }),
  component: IndustryOverviewPage,
});

function IndustryOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <ModulePageHeader
        eyebrow={moduleDef.eyebrow}
        title="覆盖产业概览"
        subtitle="覆盖六大重点产业及其下属细分赛道，未来可按赛道联动目标名单、营销指引、信审框架和解决方案。"
      />

      <BuildingStatusBanner />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {INDUSTRY_THEMES.map((theme, index) => (
          <Card key={theme.name} className="rounded-sm border-border shadow-none">
            <CardHeader className="border-b border-border bg-muted/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                  I-{String(index + 1).padStart(2, "0")}
                </span>
                <CardTitle className="text-base text-foreground">{theme.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                示例细分赛道
              </div>
              <div className="flex flex-wrap gap-1.5">
                {theme.segments.map((segment) => (
                  <Badge
                    key={segment}
                    variant="outline"
                    className="rounded-sm border-border bg-muted/20 px-2 py-0.5 text-[11px] font-normal text-muted-foreground"
                  >
                    {segment}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
