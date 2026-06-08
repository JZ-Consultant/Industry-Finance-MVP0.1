import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL = "__all__";

export function SegmentFilterPlaceholder() {
  return (
    <div className="rounded-sm border border-dashed border-border bg-muted/20 p-4">
      <div className="mb-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        客群筛选器（占位）
      </div>
      <div className="flex flex-wrap gap-3">
        <FilterSelect label="一级客群分类" />
        <FilterSelect label="二级客群分类" />
        <FilterSelect label="三级客群分类" />
      </div>
    </div>
  );
}

function FilterSelect({ label }: { label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <Select defaultValue={ALL} disabled>
        <SelectTrigger className="h-8 w-[7.5rem] rounded-sm text-xs">
          <SelectValue placeholder="全部" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>全部</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
