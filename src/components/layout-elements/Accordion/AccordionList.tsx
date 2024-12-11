"use client";

import React from "react";

import { RootStylesContext } from "contexts";
import { tremorTwMerge } from "lib";

export interface AccordionListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement[] | React.ReactElement;
}

const AccordionList = React.forwardRef<HTMLDivElement, AccordionListProps>(
  ({ children, className, ...other }, ref) => {
    const numChildren = React.Children.count(children);

    return (
      <div
        ref={ref}
        className={tremorTwMerge("rounded-tremor-default shadow-tremor-card", className)}
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
                value={tremorTwMerge("rounded-b-tremor-default border-r border-b border-l")}
              >
                {React.cloneElement(child)}
              </RootStylesContext.Provider>
            );
          }
          return (
            <RootStylesContext.Provider value={tremorTwMerge("border-r border-b border-l")}>
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        })}
      </div>
    );
  },
);

AccordionList.displayName = "AccordionList";

export { AccordionList };
