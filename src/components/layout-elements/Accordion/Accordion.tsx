import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import clsx from "clsx";

import { border, borderRadius, defaultColors, getColorVariantsFromColorThemeValue } from "lib";
import { MarginTop } from "../../../lib";
import { RootStylesContext } from "contexts";

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
  marginTop?: MarginTop;
  children: React.ReactElement[] | React.ReactElement;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { expanded = false, children, className, ...other } = props;
  const [isExpanded, setIsExpanded] = useState(expanded);

  const rootStyles = useContext(RootStylesContext) ?? clsx(border.sm.all, borderRadius.lg.all);

  return (
    <div
      ref={ref}
      className={clsx(
        "overflow-hidden",
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder).borderColor,
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
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
