import React from "react";
import { twMerge } from "tailwind-merge";

import {
  BaseColors,
  fontSize,
  fontWeight,
  getColor,
  getColorVariantsFromColorThemeValue,
} from "lib";
import { Color } from "../../../lib/inputTypes";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  const { color = BaseColors.Gray, children } = props;
  return (
    <p
      ref={ref}
      className={twMerge(
        "overflow-y-auto",
        getColorVariantsFromColorThemeValue(getColor(color).text).textColor,
        fontSize.sm,
        fontWeight.sm,
      )}
    >
      {children}
    </p>
  );
});

export default Text;
