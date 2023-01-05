import React from "react";

import { classNames, fontSize, parseSpaceX, spacing } from "lib";
import { SpaceX } from "../../../lib";

export interface ListItemProps {
  spaceX?: SpaceX | "";
  children: React.ReactNode;
}

const ListItem = ({ spaceX = "", children }: ListItemProps) => {
  return (
    <>
      <li
        className={classNames(
          "tr-w-full tr-flex tr-justify-between tr-items-center tr-truncate tr-tabular-nums",
          spaceX ? parseSpaceX(spaceX) : spaceX,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
          fontSize.sm
        )}
      >
        {children}
      </li>
    </>
  );
};

export default ListItem;
