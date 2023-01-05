import React from "react";

import {
  border,
  borderRadius,
  boxShadow,
  classNames,
  parseMarginTop,
} from "lib";
import { MarginTop } from "../../../lib";
import { RootStylesContext } from "contexts";

export interface AccordionListProps {
  shadow?: boolean;
  marginTop?: MarginTop;
  children: React.ReactElement[] | React.ReactElement;
}

const AccordionList = ({
  shadow = true,
  marginTop = "mt-0",
  children,
}: AccordionListProps) => {
  const numChildren = React.Children.count(children);

  return (
    <div
      className={classNames(
        "tremor-base",
        parseMarginTop(marginTop),
        borderRadius.lg.all,
        shadow ? boxShadow.md : ""
      )}
    >
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) {
          return (
            <RootStylesContext.Provider
              value={classNames(
                borderRadius.lg.top,
                border.sm.left,
                border.sm.top,
                border.sm.right,
                border.sm.bottom,
                boxShadow.none
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        if (idx === numChildren - 1) {
          return (
            <RootStylesContext.Provider
              value={classNames(
                borderRadius.lg.bottom,
                border.sm.left,
                border.sm.right,
                border.sm.bottom,
                boxShadow.none
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        return (
          <RootStylesContext.Provider
            value={classNames(
              border.sm.left,
              border.sm.right,
              border.sm.bottom,
              boxShadow.none
            )}
          >
            {React.cloneElement(child)}
          </RootStylesContext.Provider>
        );
      })}
    </div>
  );
};

export default AccordionList;
