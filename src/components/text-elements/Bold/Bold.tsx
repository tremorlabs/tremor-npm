import { tremorTwMerge } from "lib";
import React from "react";

const Bold = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <b ref={ref} className={tremorTwMerge("text-inherit font-bold", className)} {...other}>
      {children}
    </b>
  );
});

Bold.displayName = "Bold";

export default Bold;
