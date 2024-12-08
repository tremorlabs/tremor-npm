import { tremorTwMerge } from "lib";
import React from "react";

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...other }, ref) => {
    return (
      <div
        ref={ref}
        className={tremorTwMerge(
          "text-tremor-default text-tremor-content-default mx-auto my-6 flex w-full items-center justify-between gap-3",
          className,
        )}
        {...other}
      >
        {children ? (
          <>
            <div className="bg-tremor-border-default h-[1px] w-full" />
            <div className="whitespace-nowrap text-inherit">{children}</div>
            <div className="bg-tremor-border-default h-[1px] w-full" />
          </>
        ) : (
          <div className="bg-tremor-border-default h-[1px] w-full" />
        )}
      </div>
    );
  },
);

Divider.displayName = "Divider";

export { Divider };
