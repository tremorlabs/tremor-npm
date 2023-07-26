import { Color } from "../../../lib/inputTypes";

export const constructCategoryColors = (
  categories: string[],
  colors: Color[],
): Map<string, Color> => {
  const categoryColors = new Map<string, Color>();
  categories.forEach((category, idx) => {
    categoryColors.set(category, colors[idx]);
  });
  return categoryColors;
};

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "auto" : minValue ?? 0;
  const maxDomain = maxValue ?? "auto";
  return [minDomain, maxDomain];
};

export const constructCategories = (data: any[], color?: string): string[] => {
  if (!color) {
    return [];
  }

  const categories = new Set<string>();
  data.forEach((datum) => {
    categories.add(datum[color]);
  });
  return Array.from(categories);
};
