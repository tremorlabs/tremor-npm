import { BaseColors, colorPalette, getColorClassNames, sumNumericArray } from "lib";
import { ValueFormatter } from "../../../lib/inputTypes";

export const parseData = (data: any[], colors: string[], customColors?: string[]) =>
  data.map((dataPoint: any, idx: number) => {
    const baseColor = idx < colors.length ? colors[idx] : BaseColors.Gray;
    const baseColorCustom =
      customColors && idx < customColors.length ? customColors[idx] : BaseColors.Gray;
    return {
      ...dataPoint,
      // explicitly adding color key if not present for tooltip coloring
      color: baseColor,
      customColor: baseColorCustom,
      className: getColorClassNames(
        baseColor ?? BaseColors.Gray,
        colorPalette.background,
        !customColors ? undefined : customColors[idx],
      ).fillColor,
      fill: "",
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
