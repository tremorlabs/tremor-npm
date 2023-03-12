import { BaseColors, hexColors, sumNumericArray } from "lib";
import { Color, ValueFormatter } from "../../../lib/inputTypes";

export const parseData = (data: any[], colors: Color[]) =>
  data.map((dataPoint: any, idx: number) => {
    const baseColor = idx < colors.length ? colors[idx] : BaseColors.Gray;
    const hexCode = hexColors[baseColor ?? BaseColors.Gray];
    return {
      ...dataPoint,
      // explicitly adding color key if not present for tooltip coloring
      color: baseColor,
      fill: hexCode, // Hex Code
    };
  });

const calculateDefaultLabel = (data: any[], category: string) =>
  sumNumericArray(data.map((dataPoint) => dataPoint[category]));

export const parseLabelInput = (
  labelInput: string | undefined,
  valueFormatter: ValueFormatter,
  data: any[],
  category: string,
) => (labelInput ? labelInput : valueFormatter(calculateDefaultLabel(data, category)));
