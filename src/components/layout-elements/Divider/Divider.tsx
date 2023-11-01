import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeDividerClassName = makeClassName("Divider");

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, children, ...other } = props;
    return (
      <div
        ref={ref}
        className={tremorTwMerge(
          makeDividerClassName("root"),
          // common
          "w-full mx-auto my-6 flex justify-between gap-3 items-center text-tremor-default",
          // light
          "text-tremor-content",
          // dark
          "dark:text-dark-tremor-content",
          className,
        )}
        {...other}
      >
        {children ? (
          <>
            <div
              className={tremorTwMerge(
                "w-full h-[1px] bg-tremor-border dark:bg-dark-tremor-border",
              )}
            />
            <div className={tremorTwMerge("text-inherit whitespace-nowrap")}>{children}</div>
            <div
              className={tremorTwMerge(
                "w-full h-[1px] bg-tremor-border dark:bg-dark-tremor-border",
              )}
            />
          </>
        ) : (
          <div
            className={tremorTwMerge("w-full h-[1px] bg-tremor-border dark:bg-dark-tremor-border")}
          />
        )}
      </div>
    );
  },
);

Divider.displayName = "Divider";

export default Divider;
