import React from "react";
import { twMerge } from "tailwind-merge";

const Bold = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <b
      ref={ref}
      className={twMerge("text-inherit text-tremor-sm font-tremor-strong", className)}
      {...other}
    >
      {children}
    </b>
  );
});

export default Bold;
