import React from "react";
import { twMerge } from "tailwind-merge";

import { spacing } from "lib";

export interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AccordionBody = React.forwardRef<HTMLDivElement, AccordionBodyProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={twMerge("w-full", spacing.threeXl.paddingX, spacing.lg.paddingBottom, className)}
      {...other}
    >
      {children}
    </div>
  );
});

export default AccordionBody;
