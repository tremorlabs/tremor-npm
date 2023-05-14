"use client";
import React, { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

import { border, borderRadius, getColorClassNames, makeClassName } from "lib";
import { RootStylesContext } from "contexts";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Disclosure } from "@headlessui/react";

const makeAccordionClassName = makeClassName("Accordion");

interface OpenContextValue {
  isOpen: boolean;
}
export const OpenContext = createContext<OpenContextValue>({
  isOpen: false,
});

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { defaultOpen = false, children, className, ...other } = props;

  const rootStyles = useContext(RootStylesContext) ?? twMerge(border.sm.all, borderRadius.lg.all);

  return (
    <Disclosure
      as="div"
      ref={ref}
      className={twMerge(
        makeAccordionClassName("root"),
        "overflow-hidden",
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightRing).borderColor,
        getColorClassNames("white").bgColor,
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
});

export default Accordion;
