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

export const getYAxisWidth = (
  axisWidth: number | "auto",
  text?: string,
  maxWidth = 100,
): number => {
  if (axisWidth !== "auto") return axisWidth;
  if (!text) return 56;

  const width = getElementWidth(text, "0.75rem");
  const yAxisCalculatedWidth = width + 4.3;

  return yAxisCalculatedWidth < maxWidth ? yAxisCalculatedWidth : maxWidth;
};

export const getElementWidth = (text: string | undefined, fontSize = "1rem") => {
  if (!text) return 0;
  const span = document.createElement("span");
  span.style.font = `normal ${fontSize} ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;
  span.textContent = text;
  span.style.fontVariantNumeric = "tabular-nums";
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
};
