import React from "react";
import clsx from "clsx";

import { spacing } from "lib";
import { MarginTop } from "../../../lib";

export interface TrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  marginTop?: MarginTop;
}

const Tracking = React.forwardRef<HTMLDivElement, TrackingProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={clsx("w-full flex items-center", spacing.threeXs.spaceX, className)}
      {...other}
    >
      {children}
    </div>
  );
});

export default Tracking;
