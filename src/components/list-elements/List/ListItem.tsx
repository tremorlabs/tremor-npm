import React from "react";
import clsx from "clsx";

import { fontSize, parseSpaceX, spacing } from "lib";
import { SpaceX } from "../../../lib";

export interface ListItemProps {
  spaceX?: SpaceX | "";
  children: React.ReactNode;
}

const ListItem = ({ spaceX = "", children }: ListItemProps) => {
  return (
    <>
      <li
        className={clsx(
          "tr-w-full tr-flex tr-justify-between tr-items-center tr-truncate tr-tabular-nums",
          spaceX ? parseSpaceX(spaceX) : spaceX,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
          fontSize.sm,
        )}
      >
        {children}
      </li>
    </>
  );
};

export default ListItem;
