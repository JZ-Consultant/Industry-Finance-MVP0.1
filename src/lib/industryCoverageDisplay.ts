import {
  INDUSTRY_COVERAGE,
  type IndustryCoverage,
  type IndustryField,
} from "@/data/industryCoverage";

export type CoverageStats = {
  industryCount: number;
  fieldCount: number;
  segmentCount: number;
};

export type IndustryCoverageStats = {
  fieldCount: number;
  segmentCount: number;
  representativeFields: string[];
};

export type CoverageSearchGroup = {
  industryId: string;
  industryName: string;
  fields: Array<{
    fieldName: string;
    segments: string[];
  }>;
};

function countSegments(fields: IndustryField[]): number {
  return fields.reduce((total, field) => total + field.segments.length, 0);
}

export function getCoverageStats(): CoverageStats {
  const fieldCount = INDUSTRY_COVERAGE.reduce(
    (total, industry) => total + industry.fields.length,
    0,
  );
  const segmentCount = INDUSTRY_COVERAGE.reduce(
    (total, industry) => total + countSegments(industry.fields),
    0,
  );

  return {
    industryCount: INDUSTRY_COVERAGE.length,
    fieldCount,
    segmentCount,
  };
}

export function getIndustryCoverageById(industryId: string): IndustryCoverage | undefined {
  return INDUSTRY_COVERAGE.find((industry) => industry.id === industryId);
}

export function getIndustryCoverageStats(industry: IndustryCoverage): IndustryCoverageStats {
  return {
    fieldCount: industry.fields.length,
    segmentCount: countSegments(industry.fields),
    representativeFields: industry.fields.slice(0, 4).map((field) => field.fieldName),
  };
}

function matchesKeyword(value: string, keyword: string): boolean {
  return value.toLowerCase().includes(keyword);
}

export function searchIndustryCoverage(keyword: string): CoverageSearchGroup[] {
  const query = keyword.trim().toLowerCase();
  if (!query) return [];

  const groups: CoverageSearchGroup[] = [];

  for (const industry of INDUSTRY_COVERAGE) {
    const industryMatches = matchesKeyword(industry.industryName, query);
    const matchedFields: CoverageSearchGroup["fields"] = [];

    for (const field of industry.fields) {
      const fieldMatches = matchesKeyword(field.fieldName, query);
      const matchedSegments = field.segments.filter((segment) =>
        matchesKeyword(segment, query),
      );

      if (industryMatches || fieldMatches) {
        matchedFields.push({
          fieldName: field.fieldName,
          segments: field.segments,
        });
      } else if (matchedSegments.length > 0) {
        matchedFields.push({
          fieldName: field.fieldName,
          segments: matchedSegments,
        });
      }
    }

    if (matchedFields.length > 0) {
      groups.push({
        industryId: industry.id,
        industryName: industry.industryName,
        fields: matchedFields,
      });
    }
  }

  return groups;
}

export function countSearchResults(groups: CoverageSearchGroup[]): number {
  return groups.reduce(
    (total, group) =>
      total + group.fields.reduce((fieldTotal, field) => fieldTotal + field.segments.length, 0),
    0,
  );
}
