import React from "react";
import { twMerge } from "tailwind-merge";

import { colorClassNames } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <ul
        ref={ref}
        className={twMerge(
          "w-full overflow-hidden divide-y",
          colorClassNames[DEFAULT_COLOR][colorPalette.text].textColor,
          colorClassNames[DEFAULT_COLOR][colorPalette.lightBorder].divideColor,
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