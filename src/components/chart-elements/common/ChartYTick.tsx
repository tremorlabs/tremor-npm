import React, { useEffect } from "react";
import { tremorTwMerge } from "lib";
import { getElementWidth } from "../common/utils";

const fontSize = "0.75rem";

const ChartYTick = (props: any) => {
  const { payload, y, width, height, className, tickFormatter, setWidestTick } = props;
  const value = tickFormatter?.(payload.value) ?? payload.value;

  useEffect(() => {
    setWidestTick((prev: number | undefined) => {
      const prevElementWidth = getElementWidth(
        prev && tickFormatter ? tickFormatter(prev) : prev,
        fontSize,
      );
      const elementWidth = getElementWidth(
        tickFormatter?.(payload.value) ?? payload.value,
        fontSize,
      );

      if (!prev || prevElementWidth < elementWidth) return payload.value;

      return prev;
    });
  });

  return (
    <foreignObject
      x={0}
      y={y - 9} //align vertically
      width={width}
      height={height}
    >
      <div
        className={tremorTwMerge(
          className,
          //common
          "overflow-hidden text-ellipsis text-right mr-1 tabular-nums",
          // light
          "text-tremor-content",
          // dark
          "dark:text-dark-tremor-content",
        )}
        title={value}
      >
        {value}
      </div>
    </foreignObject>
  );
};

export default ChartYTick;
