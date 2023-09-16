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

export const getLongestValue = (data: any[], categories: string[]) => {
    let longestValue = undefined;

    for (const item of data) {
        for (const category of categories) {

            if (!longestValue || item[category] > longestValue) {
                longestValue = item[category];
            }
        }
    }
    return longestValue
}

export const getYAxisWidth = (axisWidth: number | "auto", text?: string, maxWidth: number = 100): number => {
    if (axisWidth !== "auto") return axisWidth
    if (!text) return 56

    const span = document.createElement("span");
    span.style.font = 'normal 0.75rem ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
    span.textContent = text;
    span.style.fontVariantNumeric = 'tabular-nums';
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    
    const yAxisCalculatedWidth = width + 4.3;

    return yAxisCalculatedWidth < maxWidth ? yAxisCalculatedWidth : maxWidth
}
