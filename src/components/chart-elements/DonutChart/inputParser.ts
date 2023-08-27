import { BaseColors, BaseShades, sumNumericArray, getColorClassNames, colorPalette } from "lib";
import { Color, Shade, ValueFormatter } from "../../../lib/inputTypes";

export const parseData = (data: any[], colors: Color[], shades: Shade[]) =>
  data.map((dataPoint: any, idx: number) => {
    const baseColor = idx < colors.length ? colors[idx] : BaseColors.Gray;
    const shade = idx < shades.length ? shades[idx] : BaseShades["500"];
    return {
      ...dataPoint,
      // explicitly adding color key if not present for tooltip coloring
      color: baseColor,
      shade: shade,
      className: getColorClassNames(baseColor ?? BaseColors.Gray, shade ?? colorPalette.background)
        .fillColor,
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
