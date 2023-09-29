import { tremorTwMerge } from "lib";
import React from "react";

interface DeltaCalculationReferenceShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: boolean;
}

const DeltaCalculationReferenceShape = (props: DeltaCalculationReferenceShapeProps) => {
  const { x, y, width, height, fill = true } = props;

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill=""
        stroke=""
        strokeWidth={0}
        strokeOpacity={0}
        className={tremorTwMerge(
          // common
          "text-tremor-label",
          // light
          fill
            ? "fill-tremor-content-subtle dark:fill-dark-tremor-content-subtle"
            : "fill-transparent",
        )}
        fillOpacity={0.2}
      />
      <line
        x1={x}
        x2={x}
        y1={y}
        y2={y + height}
        strokeDasharray={"2 2"}
        className={tremorTwMerge(
          // common
          "stroke-1",
          // light
          "stroke-tremor-content-subtle",
          // dark
          "dark:stroke-dark-tremor-content-subtle",
        )}
      />
      <line
        x1={x + width}
        x2={x + width}
        y1={y}
        y2={y + height}
        strokeDasharray={"3 3"}
        className={tremorTwMerge(
          // common
          "stroke-1",
          // light
          "stroke-tremor-content-subtle",
          // dark
          "dark:stroke-dark-tremor-content-subtle",
        )}
      />
    </>
  );
};

export default DeltaCalculationReferenceShape;
