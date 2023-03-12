import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, fontSize, fontWeight, getColorClassNames } from "lib";
import { Color } from "../../../lib/inputTypes";
import { colorPalette } from "lib/theme";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  const { color = BaseColors.Gray, children } = props;
  return (
    <p
      ref={ref}
      className={twMerge(
        getColorClassNames(color, colorPalette.text).textColor,
        fontSize.sm,
        fontWeight.sm,
      )}
    >
      {children}
    </p>
  );
});

export default Text;
