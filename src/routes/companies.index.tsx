import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companies } from "@/data/industryData";

export const Route = createFileRoute("/companies/")({
  head: () => ({
    meta: [
      { title: "目标企业名单 · 汽车零部件" },
      {
        name: "description",
        content: "汽车零部件行业目标企业名单，支持城市、赛道与优先级筛选。",
      },
    ],
  }),
  component: CompaniesPage,
});

const ALL = "__all__";

function PriorityTag({ p }: { p: string }) {
  const map: Record<string, { dot: string; text: string; label: string }> = {
    高: { dot: "bg-[var(--gold)]", text: "text-foreground", label: "高" },
    中: { dot: "bg-[var(--teal)]", text: "text-foreground", label: "中" },
    低: { dot: "bg-muted-foreground/50", text: "text-muted-foreground", label: "低" },
  };
  const v = map[p] ?? map["低"];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${v.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${v.dot}`} />
      {v.label}
    </span>
  );
}

function CompaniesPage() {
  const [city, setCity] = useState<string>(ALL);
  const [segment, setSegment] = useState<string>(ALL);
  const [priority, setPriority] = useState<string>(ALL);

  const cities = Array.from(new Set(companies.map((c) => c.city)));
  const segments = Array.from(new Set(companies.map((c) => c.segment)));
  const priorities = ["高", "中", "低"];

  const filtered = useMemo(
    () =>
      companies.filter(
        (c) =>
          (city === ALL || c.city === city) &&
          (segment === ALL || c.segment === segment) &&
          (priority === ALL || c.priority === priority),
      ),
    [city, segment, priority],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          客群经营 · 目标名单
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          目标企业名单
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          基于产业研究形成的结构化目标客群清单，支持按区域、赛道与营销优先级筛选，定位授信准入与营销切入路径。
        </p>
      </header>

      <div className="flex flex-wrap items-end gap-3">
        <FilterSelect label="城市" value={city} onChange={setCity} options={cities} />
        <FilterSelect label="细分赛道" value={segment} onChange={setSegment} options={segments} />
        <FilterSelect label="营销优先级" value={priority} onChange={setPriority} options={priorities} />
        <div className="ml-auto self-end text-xs text-muted-foreground">
          已筛选 <span className="font-semibold text-foreground">{filtered.length}</span> / {companies.length} 家
        </div>
      </div>

      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/40">
              <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">企业名称</TableHead>
              <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">城市</TableHead>
              <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">细分赛道</TableHead>
              <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">主营产品</TableHead>
              <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">优先级</TableHead>
              <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">营销切入</TableHead>
              <TableHead className="px-4 py-3 text-[11px] uppercase tracking-wider text-muted-foreground">风险识别</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id} className="border-b border-border/70 hover:bg-muted/30">
                <TableCell className="px-4 py-4 align-top">
                  <Link
                    to="/companies/$id"
                    params={{ id: c.id }}
                    className="font-medium text-foreground hover:text-[var(--primary)] hover:underline"
                  >
                    {c.name}
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-4 align-top text-sm text-foreground">{c.city}</TableCell>
                <TableCell className="px-4 py-4 align-top text-sm text-foreground">{c.segment}</TableCell>
                <TableCell className="max-w-[220px] px-4 py-4 align-top text-sm text-muted-foreground">
                  {c.products}
                </TableCell>
                <TableCell className="px-4 py-4 align-top">
                  <PriorityTag p={c.priority} />
                </TableCell>
                <TableCell className="max-w-[240px] px-4 py-4 align-top text-sm text-foreground/90">
                  {c.opportunity}
                </TableCell>
                <TableCell className="max-w-[240px] px-4 py-4 align-top text-sm text-muted-foreground">
                  {c.risk}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                  当前筛选条件下暂无目标企业
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-44 rounded-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>全部</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
