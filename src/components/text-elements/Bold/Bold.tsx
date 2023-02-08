import React from "react";
import clsx from "clsx";

import { fontSize, fontWeight } from "lib";

const Bold = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <b ref={ref} className={clsx("text-inherit", fontSize.sm, fontWeight.lg, className)} {...other}>
      {children}
    </b>
  );
});

export default Bold;
