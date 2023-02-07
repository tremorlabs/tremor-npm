import React from "react";
import clsx from "clsx";

import { spacing } from "lib";

export interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AccordionBody = React.forwardRef<HTMLDivElement, AccordionBodyProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <div
      ref={ref}
      className={clsx(
        "w-full",
        spacing.threeXl.paddingLeft,
        spacing.threeXl.paddingRight,
        spacing.lg.paddingBottom,
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
});

export default AccordionBody;
