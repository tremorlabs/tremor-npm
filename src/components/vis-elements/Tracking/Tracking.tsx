import React from "react";
import { twMerge } from "tailwind-merge";

import { spacing } from "lib";

const Tracking = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <div
        ref={ref}
        className={twMerge("w-full flex items-center h-10", spacing.threeXs.spaceX, className)}
        {...other}
      >
        {children}
      </div>
    );
  },
);

export default Tracking;
