import React from "react";
import { twMerge } from "tailwind-merge";

import { GridClassesMapping, gridCols, gridColsLg, gridColsMd, gridColsSm } from "./styles";
import { makeClassName } from "lib";

const makeGridClassName = makeClassName("Grid");

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  numCols?: number;
  numColsSm?: number;
  numColsMd?: number;
  numColsLg?: number;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
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

    return twMerge(colsBase, colsSm, colsMd, colsLg);
  };

  return (
    <div
      ref={ref}
      className={twMerge(makeGridClassName("root"), "grid", getColClassNames(), className)}
      {...other}
    >
      {children}
    </div>
  );
});

Grid.displayName = "Grid";

export default Grid;
