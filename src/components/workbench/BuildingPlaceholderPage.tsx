import type { WorkbenchModule } from "@/config/workbenchModules";
import { BuildingStatusBanner } from "@/components/workbench/ModuleStatusBadge";
import { FutureStructureCards } from "@/components/workbench/FutureStructureCards";
import { ModulePageHeader } from "@/components/workbench/ModulePageHeader";
import { SegmentFilterPlaceholder } from "@/components/workbench/SegmentFilterPlaceholder";

export function BuildingPlaceholderPage({ module }: { module: WorkbenchModule }) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <ModulePageHeader
        eyebrow={module.eyebrow}
        title={module.title}
        subtitle={module.description}
      />

      <BuildingStatusBanner />

      {module.showSegmentFilter && <SegmentFilterPlaceholder />}

      <section className="space-y-4">
        <div className="border-b border-border pb-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            未来内容结构
          </h2>
        </div>
        <FutureStructureCards items={module.futureStructure} />
      </section>
    </div>
  );
}
