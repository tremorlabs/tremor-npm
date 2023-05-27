import React from "react";
import { twMerge } from "tailwind-merge";

import { fontSize, fontWeight } from "lib";

const Bold = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <b
      ref={ref}
      className={twMerge("text-inherit", fontSize.sm, fontWeight.lg, className)}
      {...other}
    >
      {children}
    </b>
  );
});

Bold.displayName = "Bold";

export default Bold;
