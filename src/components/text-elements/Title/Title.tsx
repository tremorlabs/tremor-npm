import React from "react";
import clsx from "clsx";

import {
  BaseColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
} from "lib";
import { Color, MarginTop } from "../../../lib";

export interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
  truncate?: boolean;
  marginTop?: MarginTop;
}

const Title = React.forwardRef<HTMLParagraphElement, TitleProps>((props, ref) => {
  const { color = BaseColors.Gray, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={clsx(
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
