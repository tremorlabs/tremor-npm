import React from "react";
import { twMerge } from "tailwind-merge";

import { getColorClassNames } from "lib";
import { Color } from "../../../lib";
import { colorPalette } from "lib/theme";

export interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Subtitle = React.forwardRef<HTMLParagraphElement, SubtitleProps>((props, ref) => {
  const { color, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={twMerge(
        "font-tremor-normal text-tremor-base text-tremor-content-subtle",
        color && getColorClassNames(color, colorPalette.lightText).textColor,
        className,
      )}
      {...other}
    >
      {children}
    </p>
  );
});

export default Subtitle;
