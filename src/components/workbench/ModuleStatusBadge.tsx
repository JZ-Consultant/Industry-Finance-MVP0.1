import { Badge } from "@/components/ui/badge";
import type { ModuleStatus } from "@/config/workbenchModules";

export function ModuleStatusBadge({
  status,
  label,
}: {
  status: ModuleStatus;
  label: string;
}) {
  const variantClass =
    status === "available"
      ? "border-[var(--gold)]/40 bg-[var(--gold)]/10 text-foreground"
      : "border-border bg-muted/40 text-muted-foreground";

  return (
    <Badge variant="outline" className={`rounded-sm text-[11px] font-normal ${variantClass}`}>
      {label}
    </Badge>
  );
}

export function BuildingStatusBanner() {
  return (
    <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
      本模块正在建设中，后续将接入结构化知识资产内容与客群联动能力。
    </div>
  );
}
