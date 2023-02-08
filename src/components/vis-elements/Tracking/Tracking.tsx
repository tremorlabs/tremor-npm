import React from "react";
import clsx from "clsx";

import { spacing } from "lib";

const Tracking = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
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
  },
);

export default Tracking;
