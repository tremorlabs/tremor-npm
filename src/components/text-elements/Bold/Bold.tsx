import React from "react";
import { tremorTwMerge } from "lib";

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
