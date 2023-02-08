import React from "react";
import clsx from "clsx";

import { fontSize, spacing } from "lib";
import { SpaceX } from "../../../lib";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  spaceX?: SpaceX | "";
  children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <>
      <li
        ref={ref}
        className={clsx(
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
});

export default ListItem;
