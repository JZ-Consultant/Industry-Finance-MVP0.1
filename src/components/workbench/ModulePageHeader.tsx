export function ModulePageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="space-y-2 border-b border-border pb-6">
      {eyebrow && (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          {eyebrow}
        </div>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    </header>
  );
}
