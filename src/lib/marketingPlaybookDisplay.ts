import { displayValue } from "@/lib/companyDisplay";

export function formatSectorPath(
  sectorCatI: string | null,
  sectorCatII: string | null,
  sectorCatIII: string | null,
): string {
  const parts = [sectorCatI, sectorCatII, sectorCatIII]
    .map((value) => value?.trim())
    .filter(Boolean) as string[];

  if (parts.length === 0) return "待补充";
  return parts.join(" / ");
}

export function formatPlaybookSource(
  sourceDoc: string | null,
  sourcePages: string | null,
): string {
  const doc = sourceDoc?.trim();
  const pages = sourcePages?.trim();

  if (doc && pages) return `${doc} · 第 ${pages} 页`;
  if (doc) return doc;
  if (pages) return `第 ${pages} 页`;
  return "待补充";
}

export function summarizeText(value: string | null | undefined): string {
  return displayValue(value);
}
