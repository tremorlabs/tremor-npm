import { tremorTwMerge } from "lib";
import React from "react";

const ListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ children, className, ...other }, ref) => {
    return (
      <>
        <li
          ref={ref}
          className={tremorTwMerge(
            "text-tremor-default flex w-full items-center justify-between py-2",
            className,
          )}
          {...other}
        >
          {children}
        </li>
      </>
    );
  },
);

ListItem.displayName = "ListItem";

export { ListItem };
