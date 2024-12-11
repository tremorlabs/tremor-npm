"use client";
import { DisclosurePanel } from "@headlessui/react";
import { tremorTwMerge } from "lib";
import React from "react";

const AccordionBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, className, ...other } = props;
    return (
      <DisclosurePanel
        ref={ref}
        className={tremorTwMerge(
          "text-tremor-default text-tremor-content-default w-full px-4 pb-3",
          className,
        )}
        {...other}
      >
        {children}
      </DisclosurePanel>
    );
  },
);

AccordionBody.displayName = "AccordionBody";

export { AccordionBody };
