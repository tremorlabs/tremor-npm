import { tremorTwMerge } from "lib";
import React from "react";

import { makeClassName } from "lib";
import { GridClassesMapping, gridCols, gridColsLg, gridColsMd, gridColsSm } from "./styles";

const makeGridClassName = makeClassName("Grid");

const getGridCols = (numCols: number | undefined, gridColsMapping: GridClassesMapping): string => {
  if (!numCols) return "";
  if (!Object.keys(gridColsMapping).includes(String(numCols))) return "";
  return gridColsMapping[numCols];
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  numItems?: number;
  numItemsSm?: number;
  numItemsMd?: number;
  numItemsLg?: number;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { numItems = 1, numItemsSm, numItemsMd, numItemsLg, children, className, ...other } = props;

  const colsBase = getGridCols(numItems, gridCols);
  const colsSm = getGridCols(numItemsSm, gridColsSm);
  const colsMd = getGridCols(numItemsMd, gridColsMd);
  const colsLg = getGridCols(numItemsLg, gridColsLg);

  const colClassNames = tremorTwMerge(colsBase, colsSm, colsMd, colsLg);

  return (
    <div
      ref={ref}
      className={tremorTwMerge(makeGridClassName("root"), "grid", colClassNames, className)}
      {...other}
    >
      {children}
    </div>
  );
});

Grid.displayName = "Grid";

export default Grid;
