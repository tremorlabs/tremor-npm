import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
} from "lib";
import { Color } from "../../../lib";

export interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Title = React.forwardRef<HTMLParagraphElement, TitleProps>((props, ref) => {
  const { color = BaseColors.Gray, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={twMerge(
        getColorVariantsFromColorThemeValue(getColor(color).darkText).textColor,
        fontSize.lg,
        fontWeight.md,
        className,
      )}
      {...other}
    >
      {children}
    </p>
  );
});

export default Title;
