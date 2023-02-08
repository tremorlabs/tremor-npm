import React from "react";
import { twMerge } from "tailwind-merge";

import { defaultColors, getColorVariantsFromColorThemeValue } from "lib";

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <ul
        ref={ref}
        className={twMerge(
          "w-full overflow-hidden divide-y",
          getColorVariantsFromColorThemeValue(defaultColors.text).textColor,
          getColorVariantsFromColorThemeValue(defaultColors.lightBorder).divideColor,
          className,
        )}
        {...other}
      >
        {children}
      </ul>
    );
  },
);

export default List;
