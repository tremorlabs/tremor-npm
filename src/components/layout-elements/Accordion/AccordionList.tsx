"use client";

import React from "react";

import { RootStylesContext } from "contexts";
import { makeClassName, tremorTwMerge } from "lib";

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
      className={tremorTwMerge(
        makeAccordionListClassName("root"),
        // common
        "rounded-tremor-default",
        // light
        "shadow-tremor-card",
        // dark
        "dark:shadow-dark-tremor-card",
        className,
      )}
      {...other}
    >
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) {
          return (
            <RootStylesContext.Provider value={tremorTwMerge("rounded-t-tremor-default border")}>
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        if (idx === numChildren - 1) {
          return (
            <RootStylesContext.Provider
              value={tremorTwMerge("rounded-b-tremor-default border-l border-r border-b")}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        return (
          <RootStylesContext.Provider value={tremorTwMerge("border-l border-r border-b")}>
            {React.cloneElement(child)}
          </RootStylesContext.Provider>
        );
      })}
    </div>
  );
});

AccordionList.displayName = "AccordionList";

export default AccordionList;
