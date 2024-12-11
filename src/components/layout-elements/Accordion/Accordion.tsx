"use client";
import { Disclosure } from "@headlessui/react";
import { RootStylesContext } from "contexts";
import { tremorTwMerge } from "lib";
import React, { createContext, useContext } from "react";

interface OpenContextValue {
  isOpen: boolean;
}
export const OpenContext = createContext<OpenContextValue>({
  isOpen: false,
});

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ defaultOpen = false, children, className, ...other }, ref) => {
    const rootStyles =
      useContext(RootStylesContext) ?? tremorTwMerge("rounded-tremor-default border");
    return (
      <Disclosure
        as="div"
        ref={ref}
        className={tremorTwMerge(
          "bg-tremor-background-default border-tremor-border-default overflow-hidden",
          rootStyles,
          className,
        )}
        defaultOpen={defaultOpen}
        {...other}
      >
        {({ open }) => (
          <OpenContext.Provider value={{ isOpen: open }}>{children}</OpenContext.Provider>
        )}
      </Disclosure>
    );
  },
);

Accordion.displayName = "Accordion";

export { Accordion, type AccordionProps };
