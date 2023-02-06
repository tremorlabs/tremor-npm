import React from "react";
import clsx from "clsx";

import { spacing } from "lib";

export interface AccordionBodyProps {
  children: React.ReactNode;
}

const AccordionBody = ({ children }: AccordionBodyProps) => {
  return (
    <div
      className={clsx(
        "w-full",
        spacing.threeXl.paddingLeft,
        spacing.threeXl.paddingRight,
        spacing.lg.paddingBottom,
      )}
    >
      {children}
    </div>
  );
};

export default AccordionBody;
