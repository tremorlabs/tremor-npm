import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  border,
  borderRadius,
  colorClassNames,
  fontSize,
  fontWeight,
  sizing,
  spacing,
} from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  text?: string; // Deprecated
  icon?: React.ElementType;
  color?: Color;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, text, icon, color = BaseColors.Blue, className, children, ...other } = props;

  if (text)
    console.log(
      "DeprecationWarning: The `text` property is deprecated and will be removed in the next major release. Please use children instead",
    );

  const Icon = icon;
  return (
    <div
      ref={ref}
      className={twMerge(
        "flex flex-col overflow-hidden",
        colorClassNames[color][colorPalette.canvasBackground].bgColor,
        colorClassNames[color][colorPalette.darkBorder].borderColor,
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
          colorClassNames[color][colorPalette.darkText].textColor,
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
      <div
        className={twMerge(
          "overflow-y-scroll",
          colorClassNames[color][colorPalette.darkText].textColor,
          spacing.sm.marginTop,
        )}
      >
        {children ?? text}
      </div>
    </div>
  );
});

export default Callout;
