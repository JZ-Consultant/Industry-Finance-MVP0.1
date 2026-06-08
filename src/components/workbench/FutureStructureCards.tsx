import { Card, CardContent } from "@/components/ui/card";

export function FutureStructureCards({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={item} className="rounded-sm border-border shadow-none">
          <CardContent className="p-4">
            <div className="mb-2 font-mono text-[11px] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="text-sm font-medium text-foreground">{item}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
