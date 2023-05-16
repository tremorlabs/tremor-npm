import React from "react";
import { twMerge } from "tailwind-merge";

const Italic = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <i ref={ref} className={twMerge("italic text-inherit text-tremor-sm", className)} {...other}>
      {children}
    </i>
  );
});

export default Italic;
