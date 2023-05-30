import React from "react";
import { tremorTwMerge } from "lib";

import { getColorClassNames } from "lib";
import { Color } from "../../../lib/inputTypes";
import { colorPalette } from "lib/theme";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
  const { color, className, children } = props;
  return (
    <p
      ref={ref}
      className={tremorTwMerge(
        // common
        "text-tremor-default",
        // light
        "text-tremor-content",
        // dark
        "dark:text-dark-tremor-content",
        color && getColorClassNames(color, colorPalette.text).textColor,
        className,
      )}
    >
      {children}
    </p>
  );
});

Text.displayName = "Text";

export default Text;
