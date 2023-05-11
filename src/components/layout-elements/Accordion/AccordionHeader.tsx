"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowUpHeadIcon } from "assets";
import { getColorClassNames, makeClassName, sizing, spacing } from "lib";
import { ExpandedContext } from "components/layout-elements/Accordion/Accordion";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeAccordionHeaderClassName = makeClassName("AccordionHeader");

export interface AccordionHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AccordionHeader = React.forwardRef<HTMLButtonElement, AccordionHeaderProps>((props, ref) => {
  const { children, className, onClick, ...other } = props;
  const { isExpanded, setIsExpanded } = useContext(ExpandedContext);
  return (
    <button
      ref={ref}
      className={twMerge(
        makeAccordionHeaderClassName("root"),
        "w-full flex items-center justify-between",
        spacing.threeXl.paddingX,
        spacing.lg.paddingY,
        className,
      )}
      onClick={(e) => {
        setIsExpanded?.(!isExpanded);
        onClick?.(e);
      }}
      type="button"
      {...other}
    >
      <div
        className={twMerge(
          makeAccordionHeaderClassName("children"),
          "flex flex-1",
          spacing.threeXl.marginRight,
        )}
      >
        {children}
      </div>
      <div>
        <ArrowUpHeadIcon
          className={twMerge(
            makeAccordionHeaderClassName("arrowIcon"),
            isExpanded ? "transition-all" : "transition-all -rotate-180",
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
            spacing.twoXs.negativeMarginRight,
            sizing.xl.height,
            sizing.xl.width,
          )}
        />
      </div>
    </button>
  );
});

export default AccordionHeader;
