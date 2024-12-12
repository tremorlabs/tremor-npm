import { fillColors } from "components/spark-elements/common/style";
import { sumNumericArray } from "lib";
import { Color, ValueFormatter } from "../../../lib/inputTypes";

export const parseData = (data: any[], colors: (Color | string)[]) =>
  data.map((dataPoint: any, idx: number) => {
    const baseColor = idx < colors.length ? colors[idx] : "gray";
    return {
      ...dataPoint,
      color: baseColor,
      className: fillColors[baseColor as Color] ?? ("gray" as Color),
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
