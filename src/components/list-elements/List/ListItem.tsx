import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName, spacing } from "lib";

const makeListItemClassName = makeClassName("ListItem");

const ListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <li
          ref={ref}
          className={twMerge(
            makeListItemClassName("root"),
            "w-full flex justify-between items-center truncate tabular-nums text-tremor-sm",
            spacing.sm.paddingY,
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

export default ListItem;
