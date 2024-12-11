import { tremorTwMerge } from "lib";
import React from "react";

const List = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ children, className, ...other }, ref) => {
    return (
      <ul
        ref={ref}
        className={tremorTwMerge(
          "divide-tremor-border-default text-tremor-content-default w-full divide-y",
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

export { List };
