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
import { Badge } from "@/components/ui/badge";
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

function priorityVariant(p: string) {
  if (p === "高") return "default" as const;
  if (p === "中") return "secondary" as const;
  return "outline" as const;
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
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <header className="space-y-2 border-b pb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          目标客户
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          目标企业名单
        </h1>
        <p className="text-sm text-muted-foreground">
          基于行业研究形成的目标客户结构化清单，点击企业名称查看完整营销与信审建议。
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <FilterSelect
          label="城市"
          value={city}
          onChange={setCity}
          options={cities}
        />
        <FilterSelect
          label="细分赛道"
          value={segment}
          onChange={setSegment}
          options={segments}
        />
        <FilterSelect
          label="推荐优先级"
          value={priority}
          onChange={setPriority}
          options={priorities}
        />
        <div className="ml-auto self-end text-xs text-muted-foreground">
          共 {filtered.length} 家企业
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企业名称</TableHead>
              <TableHead>城市</TableHead>
              <TableHead>细分赛道</TableHead>
              <TableHead>主营产品</TableHead>
              <TableHead>优先级</TableHead>
              <TableHead>银行切入机会</TableHead>
              <TableHead>风险关注点</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <Link
                    to="/companies/$id"
                    params={{ id: c.id }}
                    className="font-medium text-primary hover:underline"
                  >
                    {c.name}
                  </Link>
                </TableCell>
                <TableCell>{c.city}</TableCell>
                <TableCell>{c.segment}</TableCell>
                <TableCell className="max-w-[220px] text-sm text-muted-foreground">
                  {c.products}
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant(c.priority)}>
                    {c.priority}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[220px] text-sm text-muted-foreground">
                  {c.opportunity}
                </TableCell>
                <TableCell className="max-w-[220px] text-sm text-muted-foreground">
                  {c.risk}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  没有符合条件的企业
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
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-44">
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
