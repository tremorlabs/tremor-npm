import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  border,
  borderRadius,
  fontSize,
  fontWeight,
  getColorClassNames,
  sizing,
  spacing,
} from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ElementType;
  color?: Color;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, icon, color = BaseColors.Blue, className, children, ...other } = props;

  const Icon = icon;
  return (
    <div
      ref={ref}
      className={twMerge(
        "flex flex-col overflow-hidden",
        getColorClassNames(color, colorPalette.canvasBackground).bgColor,
        getColorClassNames(color, colorPalette.darkBorder).borderColor,
        spacing.lg.paddingY,
        spacing.lg.paddingRight,
        spacing.twoXl.paddingLeft,
        fontSize.sm,
        borderRadius.md.all,
        border.lg.left,
        className,
      )}
      {...other}
    >
      <div
        className={twMerge(
          "flex items-start",
          getColorClassNames(color, colorPalette.darkText).textColor,
        )}
      >
        {Icon ? (
          <Icon
            className={twMerge(
              "flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.xs.marginRight,
            )}
            aria-hidden="true"
          />
        ) : null}
        <h4 className={twMerge("text-elem", fontWeight.lg)}>{title}</h4>
      </div>
      <p
        className={twMerge(
          "overflow-y-auto",
          getColorClassNames(color, colorPalette.darkText).textColor,
          spacing.sm.marginTop,
        )}
      >
        {children}
      </p>
    </div>
  );
});

export default Callout;
