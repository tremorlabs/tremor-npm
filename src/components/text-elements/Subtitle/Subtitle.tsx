import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, colorClassNames, fontSize, fontWeight } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";

export interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Subtitle = React.forwardRef<HTMLParagraphElement, SubtitleProps>((props, ref) => {
  const { color = BaseColors.Gray, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={twMerge(
        colorClassNames[color][colorPalette.lightText].textColor,
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
