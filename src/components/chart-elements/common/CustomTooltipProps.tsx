import { NameType, Payload } from "recharts/types/component/DefaultTooltipContent";

export type CustomTooltipType = {
  payload: Payload<string | number | (string | number)[], string | number>[] | undefined;
  active: boolean | undefined;
  label: NameType | undefined;
};
