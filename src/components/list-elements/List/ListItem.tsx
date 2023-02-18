import React from "react";
import { twMerge } from "tailwind-merge";

import { fontSize, spacing } from "lib";

const ListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <>
        <li
          ref={ref}
          className={twMerge(
            "w-full flex justify-between items-center truncate tabular-nums",
            spacing.sm.paddingY,
            fontSize.sm,
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