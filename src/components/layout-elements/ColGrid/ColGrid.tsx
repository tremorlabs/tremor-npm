import React from "react";
import clsx from "clsx";

import { GapX, GapY, MarginTop } from "../../../lib/inputTypes";
import { GridClassesMapping, gridCols, gridColsLg, gridColsMd, gridColsSm } from "./styles";

export interface ColGridProps extends React.HTMLAttributes<HTMLDivElement> {
  numCols?: number;
  numColsSm?: number;
  numColsMd?: number;
  numColsLg?: number;
  gapX?: GapX;
  gapY?: GapY;
  marginTop?: MarginTop;
  children: React.ReactNode;
}

const ColGrid = React.forwardRef<HTMLDivElement, ColGridProps>((props, ref) => {
  const { numCols = 1, numColsSm, numColsMd, numColsLg, children, className, ...other } = props;

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
    <div ref={ref} className={clsx("grid", getColClassNames(), className)} {...other}>
      {children}
    </div>
  );
});

export default ColGrid;
