import { Color, LineStyle } from "../../../lib/inputTypes";

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

export const getPercentageWithCategories = (data: any[], categories?: string[] | string [][]): number => {
    if(!categories)
        return 0;

    const totalObjects = data.length + 1;
    let objectsWithCategories = 0;
  
    for (const obj of data) {
      let hasCategoryValue = false;
        for (const category of categories.flat()) {
            if (obj.hasOwnProperty(category) && obj[category] !== null && obj[category] !== undefined) {
                hasCategoryValue = true;
                break;
            }
        }

        if (hasCategoryValue) {
            objectsWithCategories++;
        }
    }
  
    const percentageWithCategories = (objectsWithCategories / totalObjects);
    return percentageWithCategories;
};

export const getForecastStrokeDasharray = (forecastLineStyle: LineStyle): string => {
    switch (forecastLineStyle) {
        case "solid":
            return "1";
        case "dashed":
            return "5 5";
        case "dotted":
            return "0.5 5";
        default:
            return "1";
    }
}
