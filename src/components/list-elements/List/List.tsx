import React from "react";
import { twMerge } from "tailwind-merge";

import { getColorClassNames, makeClassName } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";

const makeListClassName = makeClassName("List");

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <ul
        ref={ref}
        className={twMerge(
          makeListClassName("root"),
          "w-full overflow-hidden divide-y",
          getColorClassNames(DEFAULT_COLOR, colorPalette.text).textColor,
          getColorClassNames(DEFAULT_COLOR, colorPalette.lightBorder).divideColor,
          className,
        )}
        {...other}
      >
        {children}
      </ul>
    );
  },
);

List.displayName = "List";

export default List;
