import React from "react";
import { tremorTwMerge } from "lib";

import { makeClassName, spacing } from "lib";
import { Disclosure } from "@headlessui/react";

const makeAccordionBodyClassName = makeClassName("AccordionBody");

const AccordionBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <Disclosure.Panel
        ref={ref}
        className={tremorTwMerge(
          makeAccordionBodyClassName("root"),
          "w-full text-tremor-default text-tremor-content",
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

AccordionBody.displayName = "AccordionBody";

export default AccordionBody;
