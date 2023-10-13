import { tremorTwMerge } from "lib";
import React from "react";

const Italic = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  //Italic is deprecated and will be removed in the next major release
  const { children, className, ...other } = props;
  return (
    <i ref={ref} className={tremorTwMerge("italic text-inherit", className)} {...other}>
      {children}
    </i>
  );
});

Italic.displayName = "Italic";

export default Italic;
