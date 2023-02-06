import React from "react";
import clsx from "clsx";

import { GridClassesMapping, colSpan, colSpanLg, colSpanMd, colSpanSm } from "./styles";

export interface ColProps {
  numColSpan?: number;
  numColSpanSm?: number;
  numColSpanMd?: number;
  numColSpanLg?: number;
  children: React.ReactNode;
}

const Col = ({ numColSpan = 1, numColSpanSm, numColSpanMd, numColSpanLg, children }: ColProps) => {
  const getColSpan = (
    numColSpan: number | undefined,
    colSpanMapping: GridClassesMapping,
  ): string => {
    if (!numColSpan) return "";
    if (!Object.keys(colSpanMapping).includes(String(numColSpan))) return "";
    return colSpanMapping[numColSpan];
  };

  const getColSpanClassNames = () => {
    const spanBase = getColSpan(numColSpan, colSpan);
    const spanSm = getColSpan(numColSpanSm, colSpanSm);
    const spanMd = getColSpan(numColSpanMd, colSpanMd);
    const spanLg = getColSpan(numColSpanLg, colSpanLg);

    return clsx(spanBase, spanSm, spanMd, spanLg);
  };

  return <div className={clsx(getColSpanClassNames())}>{children}</div>;
};

export default Col;
