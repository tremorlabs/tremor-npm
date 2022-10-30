import {
    BaseColors,
    getColorTheme,
    getHexFromColorThemeValue,
    sumNumericArray,
    themeColorRange
} from 'lib';
import { Color, ValueFormatter } from '../../../lib/inputTypes';

import { DonutChartDataPoint } from './DonutChart';

const getBaseColor = (inputColor: Color | undefined, dataPointIdx: number): Color => {
    const baseColor = inputColor
        ? inputColor
        : dataPointIdx < themeColorRange.length
            ? themeColorRange[dataPointIdx]
            : BaseColors.Gray;
    return baseColor;
};

const parseInputColor = (inputColor: Color | undefined, dataPointIdx: number) => {
    // colorThemeValue: e.g. bg-blue-500
    const colorThemeValue = getColorTheme(getBaseColor(inputColor, dataPointIdx)).background;
    return getHexFromColorThemeValue(colorThemeValue);
};

export const formatData = (data: DonutChartDataPoint[]) => data.map((
    dataPoint: DonutChartDataPoint,
    idx: number,
) => {
    return {
        ...dataPoint,
        // explicitly adding color key if not present in input data for tooltip formatting
        color: getBaseColor(dataPoint.color, idx) as Color,
        fill: parseInputColor(dataPoint.color, idx), // Hex Code
    };
});

const calculatDefaultLabel = (
    data: DonutChartDataPoint[]
) => sumNumericArray(data.map((dataPoint) => dataPoint.value));

export const parseLabelInput = (
    labelInput: string | undefined,
    valueFormatter: ValueFormatter,
    data: DonutChartDataPoint[],
) => (
    labelInput ? labelInput : valueFormatter(calculatDefaultLabel(data))
);
