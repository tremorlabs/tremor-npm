import React from "react";

import { classNames, spacing } from "lib";

export interface AccordionBodyProps {
  children: React.ReactNode;
}

const AccordionBody = ({ children }: AccordionBodyProps) => {
  return (
    <div
      className={classNames(
        "tr-w-full",
        spacing.threeXl.paddingLeft,
        spacing.threeXl.paddingRight,
        spacing.lg.paddingBottom
      )}
    >
      {children}
    </div>
  );
};

export default AccordionBody;
