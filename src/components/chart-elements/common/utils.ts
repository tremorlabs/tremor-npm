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

export function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null)
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// export function deepEqual(obj1: unknown, obj2: unknown): boolean {
//   if (obj1 === obj2) return true;

//   if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null)
//     return false;

//   if (Object.prototype.toString.call(obj1) !== Object.prototype.toString.call(obj2)) return false;

//   const keys1 = Object.keys(obj1);
//   const keys2 = new Set(Object.keys(obj2));

//   if (keys1.length !== keys2.size) return false;

//   for (const key of keys1) {
//     if (
//       !keys2.has(key) ||
//       !deepEqual((obj1 as Record<string, unknown>)[key], (obj2 as Record<string, unknown>)[key])
//     )
//       return false;
//   }

//   return true;
// }

export function hasOnlyOneValueForThisKey(array: any[], keyToCheck: string) {
  const val = [];

  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
      val.push(obj[keyToCheck]);
      if (val.length > 1) {
        return false;
      }
    }
  }

  return true;
}
