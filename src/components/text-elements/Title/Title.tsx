import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, colorClassNames, fontSize, fontWeight } from "lib";
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
        colorClassNames[color][colorPalette.darkText].textColor,
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
