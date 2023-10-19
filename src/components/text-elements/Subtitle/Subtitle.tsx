import { tremorTwMerge } from "lib";
import React from "react";

import { getColorClassNames } from "lib";
import { colorPalette } from "lib/theme";
import { Color } from "../../../lib";

export interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Subtitle = React.forwardRef<HTMLParagraphElement, SubtitleProps>((props, ref) => {
  const { color, children, className, ...other } = props;
  return (
    <p
      ref={ref}
      className={tremorTwMerge(
        color
          ? getColorClassNames(color, colorPalette.lightText).textColor
          : "text-tremor-content-subtle dark:text-dark-tremor-content-subtle",
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
