import React, { useContext } from "react";
import clsx from "clsx";

import { ArrowDownHeadIcon, ArrowUpHeadIcon } from "assets";
import { defaultColors, getColorVariantsFromColorThemeValue, sizing, spacing } from "lib";
import { ExpandedContext } from "components/layout-elements/Accordion/Accordion";

export interface AccordionHeaderProps {
  children: React.ReactNode;
}

const AccordionHeader = ({ children }: AccordionHeaderProps) => {
  const { isExpanded, setIsExpanded } = useContext(ExpandedContext);
  return (
    <button
      type="button"
      className={clsx(
        "input-elem w-full flex items-center justify-between",
        spacing.threeXl.paddingLeft,
        spacing.threeXl.paddingRight,
        spacing.lg.paddingTop,
        spacing.lg.paddingBottom,
      )}
      onClick={() => setIsExpanded?.(!isExpanded)}
    >
      <div className={clsx("flex flex-1", spacing.threeXl.marginRight)}>{children}</div>
      <div>
        {isExpanded ? (
          <ArrowUpHeadIcon
            className={clsx(
              getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor,
              spacing.twoXs.negativeMarginRight,
              sizing.xl.height,
              sizing.xl.width,
            )}
          />
        ) : (
          <ArrowDownHeadIcon
            className={clsx(
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
};

export default AccordionHeader;
