import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName, sizing, spacing } from "lib";

const makeDividerClassName = makeClassName("Divider");

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <div
        ref={ref}
        className={twMerge(
          makeDividerClassName("root"),
          "w-full mx-auto bg-tremor-background-subtle",
          sizing.threeXs.height,
          spacing.threeXl.marginTop,
          spacing.threeXl.marginBottom,
          className,
        )}
        {...other}
      />
    );
  },
);

export default Divider;
