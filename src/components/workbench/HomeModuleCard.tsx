import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleStatusBadge } from "@/components/workbench/ModuleStatusBadge";
import type { WorkbenchModule } from "@/config/workbenchModules";

export function HomeModuleCard({ module }: { module: WorkbenchModule }) {
  const isHome = module.url === "/";

  return (
    <Card className="rounded-sm border-border shadow-none transition-colors hover:bg-muted/20">
      <CardContent className="flex h-full flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <module.icon className="h-4 w-4 shrink-0 text-[var(--primary)]" />
            <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
              {module.title}
            </h3>
          </div>
          <ModuleStatusBadge status={module.status} label={module.statusLabel} />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {module.description}
        </p>
        {isHome ? (
          <div className="text-xs text-muted-foreground">当前所在模块</div>
        ) : (
          <Button asChild variant="outline" size="sm" className="w-fit rounded-sm">
            <Link to={module.url}>
              进入模块
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
