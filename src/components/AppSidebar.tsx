import { Link, useRouterState } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { WORKBENCH_MODULES } from "@/config/workbenchModules";

export function AppSidebar() {
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="h-6 w-1 bg-[var(--gold)]" />
          <div>
            <div className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              产业金融
            </div>
            <div className="text-[11px] text-sidebar-foreground/60">
              4C 知识资产工作台
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.14em] text-sidebar-foreground/50">
            模块导航
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {WORKBENCH_MODULES.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link
                        to={item.url}
                        className="relative flex items-center gap-2 rounded-none"
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-[var(--gold)]" />
                        )}
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
