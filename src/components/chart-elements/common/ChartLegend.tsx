import React, { useRef } from "react";

import { useOnWindowResize } from "hooks";

import { Color } from "../../../lib";
import { Legend } from "components/text-elements/Legend";

const ChartLegend = (
  { payload }: any,
  categoryColors: Map<string, Color>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
  activeLegend: string | undefined,
  onClick: (category: string, color: Color) => void,
  hasOnValueChange = false,
) => {
  const legendRef = useRef<HTMLDivElement>(null);

  useOnWindowResize(() => {
    const calculateHeight = (height: number | undefined) =>
      height
        ? Number(height) + 20 // 20px extra padding
        : 60; // default height
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  const filteredPayload = payload.filter((item: any) => item.type !== "none");

  return (
    <div ref={legendRef} className="flex items-center justify-end">
      <Legend
        categories={filteredPayload.map((entry: any) => entry.value)}
        colors={filteredPayload.map((entry: any) => categoryColors.get(entry.value))}
        onClickLegendItem={onClick}
        activeLegend={activeLegend}
        hasOnValueChange={hasOnValueChange}
      />
    </div>
  );
};

export default ChartLegend;
