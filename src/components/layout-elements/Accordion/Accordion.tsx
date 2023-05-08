"use client";
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

import { border, borderRadius, getColorClassNames, makeClassName } from "lib";
import { RootStylesContext } from "contexts";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeAccordionClassName = makeClassName("Accordion");

interface ExpandedContextValue {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>> | undefined;
}
export const ExpandedContext = createContext<ExpandedContextValue>({
  isExpanded: false,
  setIsExpanded: undefined,
});

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { expanded = false, children, className, ...other } = props;
  const [isExpanded, setIsExpanded] = useState(expanded);

  const rootStyles = useContext(RootStylesContext) ?? twMerge(border.sm.all, borderRadius.lg.all);

  return (
    <div
      ref={ref}
      className={twMerge(
        makeAccordionClassName("root"),
        "overflow-hidden",
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightRing).borderColor,
        getColorClassNames("white").bgColor,
        rootStyles,
        className,
      )}
      {...other}
    >
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) {
          return (
            <ExpandedContext.Provider value={{ isExpanded, setIsExpanded }}>
              {React.cloneElement(child)}
            </ExpandedContext.Provider>
          );
        }

        return <div className={isExpanded ? "" : "hidden"}>{child}</div>;
      })}
    </div>
  );
});

export default Accordion;
