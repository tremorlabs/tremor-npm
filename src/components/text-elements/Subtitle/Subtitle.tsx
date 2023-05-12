import React from "react";
import { twMerge } from "tailwind-merge";

import { BaseColors, fontSize, fontWeight, getColorClassNames } from "lib";
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
        getColorClassNames(color, colorPalette.lightText).textColor,
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

Subtitle.displayName = "Subtitle";

export default Subtitle;
