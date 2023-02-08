import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowDownHeadIcon, ArrowUpHeadIcon } from "assets";
import { defaultColors, getColorVariantsFromColorThemeValue, sizing, spacing } from "lib";
import { ExpandedContext } from "components/layout-elements/Accordion/Accordion";

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
      <div className={twMerge("flex flex-1", spacing.threeXl.marginRight)}>{children}</div>
      <div>
        {isExpanded ? (
          <ArrowUpHeadIcon
            className={twMerge(
              getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
              spacing.twoXs.negativeMarginRight,
              sizing.xl.height,
              sizing.xl.width,
            )}
          />
        ) : (
          <ArrowDownHeadIcon
            className={twMerge(
              getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
              spacing.twoXs.negativeMarginRight,
              sizing.xl.height,
              sizing.xl.width,
            )}
          />
        )}
      </div>
    </button>
  );
});

export default AccordionHeader;
