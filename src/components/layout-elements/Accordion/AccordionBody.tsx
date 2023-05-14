import React from "react";
import { twMerge } from "tailwind-merge";

import { makeClassName, spacing } from "lib";
import { Disclosure } from "@headlessui/react";

const makeAccordionBodyClassName = makeClassName("AccordionBody");

const AccordionBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <Disclosure.Panel
        ref={ref}
        className={twMerge(
          makeAccordionBodyClassName("root"),
          "w-full",
          spacing.threeXl.paddingX,
          spacing.lg.paddingBottom,
          className,
        )}
        {...other}
      >
        {children}
      </Disclosure.Panel>
    );
  },
);

export default AccordionBody;
