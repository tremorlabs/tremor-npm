import React from "react";
import clsx from "clsx";

import { border, borderRadius, boxShadow } from "lib";
import { MarginTop } from "../../../lib";
import { RootStylesContext } from "contexts";

export interface AccordionListProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
  marginTop?: MarginTop;
  children: React.ReactElement[] | React.ReactElement;
}

const AccordionList = React.forwardRef<HTMLDivElement, AccordionListProps>((props, ref) => {
  const { children, className, ...other } = props;
  const numChildren = React.Children.count(children);

  return (
    <div ref={ref} className={clsx(borderRadius.lg.all, boxShadow.md, className)} {...other}>
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) {
          return (
            <RootStylesContext.Provider
              value={clsx(
                borderRadius.lg.top,
                border.sm.left,
                border.sm.top,
                border.sm.right,
                border.sm.bottom,
                boxShadow.none,
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        if (idx === numChildren - 1) {
          return (
            <RootStylesContext.Provider
              value={clsx(
                borderRadius.lg.bottom,
                border.sm.left,
                border.sm.right,
                border.sm.bottom,
                boxShadow.none,
              )}
            >
              {React.cloneElement(child)}
            </RootStylesContext.Provider>
          );
        }
        return (
          <RootStylesContext.Provider
            value={clsx(border.sm.left, border.sm.right, border.sm.bottom, boxShadow.none)}
          >
            {React.cloneElement(child)}
          </RootStylesContext.Provider>
        );
      })}
    </div>
  );
});

export default AccordionList;
