"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

import { border, borderRadius, boxShadow, makeClassName } from "lib";
import { RootStylesContext } from "contexts";

const makeAccordionListClassName = makeClassName("AccordionList");

export interface AccordionListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement[] | React.ReactElement;
}

const AccordionList = React.forwardRef<HTMLDivElement, AccordionListProps>((props, ref) => {
  const { children, className, ...other } = props;
  const numChildren = React.Children.count(children);

  return (
    <div
      ref={ref}
      className={twMerge(
        makeAccordionListClassName("root"),
        borderRadius.lg.all,
        boxShadow.md,
        className,
      )}
      {...other}
    >
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) {
          return (
            <RootStylesContext.Provider
              value={twMerge(
                borderRadius.lg.top,
                border.sm.left,
                border.sm.top,
                border.sm.right,
                border.sm.bottom,
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        if (idx === numChildren - 1) {
          return (
            <RootStylesContext.Provider
              value={twMerge(
                borderRadius.lg.bottom,
                border.sm.left,
                border.sm.right,
                border.sm.bottom,
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        return (
          <RootStylesContext.Provider
            value={twMerge(border.sm.left, border.sm.right, border.sm.bottom)}
          >
            {React.cloneElement(child)}
          </RootStylesContext.Provider>
        );
      })}
    </div>
  );
});

export default AccordionList;
