import React, { useContext } from "react";

import { ArrowDownHeadIcon, ArrowUpHeadIcon } from "assets";
import {
  classNames,
  defaultColors,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";
import { ExpandedContext } from "components/layout-elements/Accordion/Accordion";

export interface AccordionHeaderProps {
  children: React.ReactNode;
}

const AccordionHeader = ({ children }: AccordionHeaderProps) => {
  const { isExpanded, setIsExpanded } = useContext(ExpandedContext);
  return (
    <button
      type="button"
      className={classNames(
        "input-elem tr-w-full tr-flex tr-items-center tr-justify-between",
        spacing.threeXl.paddingLeft,
        spacing.threeXl.paddingRight,
        spacing.lg.paddingTop,
        spacing.lg.paddingBottom
      )}
      onClick={() => setIsExpanded?.(!isExpanded)}
    >
      <div
        className={classNames("tr-flex tr-flex-1", spacing.threeXl.marginRight)}
      >
        {children}
      </div>
      <div>
        {isExpanded ? (
          <ArrowUpHeadIcon
            className={classNames(
              getColorVariantsFromColorThemeValue(defaultColors.lightText)
                .textColor,
              spacing.twoXs.negativeMarginRight,
              sizing.xl.height,
              sizing.xl.width
            )}
          />
        ) : (
          <ArrowDownHeadIcon
            className={classNames(
              getColorVariantsFromColorThemeValue(defaultColors.lightText)
                .textColor,
              spacing.twoXs.negativeMarginRight,
              sizing.xl.height,
              sizing.xl.width
            )}
          />
        )}
      </div>
    </button>
  );
};

export default AccordionHeader;
