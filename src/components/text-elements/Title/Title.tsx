import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, fontSize, fontWeight, getColorClassNames } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";

export interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Title = React.forwardRef<HTMLParagraphElement, TitleProps>((props, ref) => {
  const { color = BaseColors.Gray, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={twMerge(
        getColorClassNames(color, colorPalette.darkText).textColor,
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

Title.displayName = "Title";

export default Title;
