import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import {
  border,
  borderRadius,
  boxShadow,
  classNames,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  parseMarginTop,
} from "lib";
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

export interface AccordionProps {
  shadow?: boolean;
  expanded?: boolean;
  marginTop?: MarginTop;
  children: React.ReactElement[] | React.ReactElement;
}

const Accordion = ({
  shadow,
  expanded = false,
  marginTop = "mt-0",
  children,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const rootStyles =
    useContext(RootStylesContext) ??
    classNames(border.sm.all, borderRadius.lg.all);

  return (
    <div
      className={classNames(
        "tremor-base tr-overflow-hidden",
        parseMarginTop(marginTop),
        getColorVariantsFromColorThemeValue(defaultColors.lightBorder)
          .borderColor,
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        rootStyles,
        shadow ? boxShadow.md : ""
      )}
    >
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) {
          return (
            <ExpandedContext.Provider value={{ isExpanded, setIsExpanded }}>
              {React.cloneElement(child)}
            </ExpandedContext.Provider>
          );
        }

        return <div className={isExpanded ? "" : "tr-hidden"}>{child}</div>;
      })}
    </div>
  );
};

export default Accordion;
