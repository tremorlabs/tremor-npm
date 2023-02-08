import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
} from "lib";
import { Color } from "../../../lib";

export interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Subtitle = React.forwardRef<HTMLParagraphElement, SubtitleProps>((props, ref) => {
  const { color = BaseColors.Gray, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={clsx(
        getColorVariantsFromColorThemeValue(getColor(color).lightText).textColor,
        fontSize.md,
        fontWeight.sm,
        className,
      )}
      {...other}
    >
      {children}
    </p>
  );
});

export default Subtitle;
