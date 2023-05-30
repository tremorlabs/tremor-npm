import React from "react";
import { tremorTwMerge } from "lib";

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
      className={tremorTwMerge(
        // light
        "text-tremor-content-subtle",
        // dark
        "dark:text-dark-tremor-content-subtle",
        color && getColorClassNames(color, colorPalette.lightText).textColor,
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
