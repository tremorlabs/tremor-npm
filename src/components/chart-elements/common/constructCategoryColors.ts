import { Color } from '../../../lib/inputTypes';

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
