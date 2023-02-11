import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

import { border, borderRadius, colorClassNames } from "lib";
import { RootStylesContext } from "contexts";
import { DEFAULT_COLOR, WHITE, colorPalette } from "lib/theme";

interface ExpandedContextValue {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>> | undefined;
}
export const ExpandedContext = createContext<ExpandedContextValue>({
  isExpanded: false,
  setIsExpanded: undefined,
});

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
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
        "overflow-hidden",
        colorClassNames[DEFAULT_COLOR][colorPalette.lightBorder].borderColor,
        colorClassNames[WHITE]["none"].bgColor,
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
