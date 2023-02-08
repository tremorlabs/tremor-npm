import React from "react";
import clsx from "clsx";

import { fontSize } from "lib";

const Italic = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <i ref={ref} className={clsx("italic text-inherit", fontSize.sm, className)} {...other}>
      {children}
    </i>
  );
});

export default Italic;
