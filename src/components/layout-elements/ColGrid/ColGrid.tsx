import React from "react";
import clsx from "clsx";

import { GapX, GapY, MarginTop } from "../../../lib/inputTypes";
import { GridClassesMapping, gridCols, gridColsLg, gridColsMd, gridColsSm } from "./styles";
import { parseGapX, parseGapY, parseMarginTop } from "lib";

export interface ColGridProps {
  numCols?: number;
  numColsSm?: number;
  numColsMd?: number;
  numColsLg?: number;
  gapX?: GapX;
  gapY?: GapY;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const ColGrid = ({
  numCols = 1,
  numColsSm,
  numColsMd,
  numColsLg,
  gapX = "gap-x-0",
  gapY = "gap-y-0",
  marginTop = "mt-0",
  children,
}: ColGridProps) => {
  const getGridCols = (
    numCols: number | undefined,
    gridColsMapping: GridClassesMapping,
  ): string => {
    if (!numCols) return "";
    if (!Object.keys(gridColsMapping).includes(String(numCols))) return "";
    return gridColsMapping[numCols];
  };

  const getColClassNames = () => {
    const colsBase = getGridCols(numCols, gridCols);
    const colsSm = getGridCols(numColsSm, gridColsSm);
    const colsMd = getGridCols(numColsMd, gridColsMd);
    const colsLg = getGridCols(numColsLg, gridColsLg);

    return clsx(colsBase, colsSm, colsMd, colsLg);
  };

  return (
    <div
      className={clsx(
        "tr-grid",
        getColClassNames(),
        parseGapX(gapX),
        parseGapY(gapY),
        parseMarginTop(marginTop),
      )}
    >
      {children}
    </div>
  );
};

export default ColGrid;
