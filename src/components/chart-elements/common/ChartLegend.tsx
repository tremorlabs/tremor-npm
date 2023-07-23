import React, { useRef } from "react";

import { useOnWindowResize } from "hooks";

import { Color } from "../../../lib";
import { Legend } from "components/text-elements/Legend";

const ChartLegend = (
  { payload }: any,
  categoryColors: Map<string, Color>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
  forecastCategories?: string[] | string[][]
  ) => {
  const legendRef = useRef<HTMLDivElement>(null);

  useOnWindowResize(() => {
    const calculateHeight = (height: number | undefined) =>
      height
        ? Number(height) + 20 // 20px extra padding
        : 60; // default height
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  return (
    <div ref={legendRef} className="flex items-center justify-end">
      <Legend
        categories={payload.filter((e: any) => !forecastCategories?.flat()?.includes(e.value)).map((entry: any) => entry.value)}
        colors={payload.filter((e: any) => !forecastCategories?.flat()?.includes(e.value)).map((entry: any) => categoryColors.get(entry.value))}
      />
    </div>
  );
};

export default ChartLegend;
