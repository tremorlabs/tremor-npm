import React from "react";
import { twMerge } from "tailwind-merge";

import { GridClassesMapping, colSpan, colSpanLg, colSpanMd, colSpanSm } from "./styles";
import { makeClassName } from "lib";

const makeColClassName = makeClassName("Col");

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  numColSpan?: number;
  numColSpanSm?: number;
  numColSpanMd?: number;
  numColSpanLg?: number;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const {
    numColSpan = 1,
    numColSpanSm,
    numColSpanMd,
    numColSpanLg,
    children,
    className,
    ...other
  } = props;
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

    return twMerge(spanBase, spanSm, spanMd, spanLg);
  };

  return (
    <div
      ref={ref}
      className={twMerge(makeColClassName("root"), getColSpanClassNames(), className)}
      {...other}
    >
      {children}
    </div>
  );
});

Col.displayName = "Col";

export default Col;
