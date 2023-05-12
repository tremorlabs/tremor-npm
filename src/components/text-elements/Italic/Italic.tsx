import React from "react";
import { twMerge } from "tailwind-merge";

import { fontSize } from "lib";

const Italic = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <i ref={ref} className={twMerge("italic text-inherit", fontSize.sm, className)} {...other}>
      {children}
    </i>
  );
});

Italic.displayName = "Italic";

export default Italic;
