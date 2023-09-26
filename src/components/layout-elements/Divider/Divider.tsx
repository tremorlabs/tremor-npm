import React from "react";
import { tremorTwMerge } from "lib";

import { makeClassName } from "lib";

const makeDividerClassName = makeClassName("Divider");

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <div
        ref={ref}
        className={tremorTwMerge(
          makeDividerClassName("root"),
          // common
          "w-full mx-auto h-[1px] my-6",
          // light
          "bg-tremor-background-subtle",
          // dark
          "dark:bg-dark-tremor-background-subtle",
          className,
        )}
        {...other}
      />
    );
  },
);

Divider.displayName = "Divider";

export default Divider;
