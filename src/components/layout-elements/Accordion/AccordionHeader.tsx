"use client";
import React, { useContext } from "react";

import { Disclosure } from "@headlessui/react";
import { ArrowUpHeadIcon } from "assets";
import { OpenContext } from "components/layout-elements/Accordion/Accordion";
import { makeClassName, tremorTwMerge } from "lib";

const makeAccordionHeaderClassName = makeClassName("AccordionHeader");

const AccordionHeader = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { children, className, ...other } = props;

  const { isOpen } = useContext(OpenContext);

  return (
    <Disclosure.Button
      ref={ref}
      className={tremorTwMerge(
        makeAccordionHeaderClassName("root"),
        // common
        "flex w-full items-center justify-between px-4 py-3",
        // light
        "text-tremor-content-emphasis",
        // dark
        "dark:text-dark-tremor-content-emphasis",
        className,
      )}
      {...other}
    >
      <div
        className={tremorTwMerge(
          makeAccordionHeaderClassName("children"),
          "mr-4 flex flex-1 text-inherit",
        )}
      >
        {children}
      </div>
      <div>
        <ArrowUpHeadIcon
          className={tremorTwMerge(
            makeAccordionHeaderClassName("arrowIcon"),
            //common
            "-mr-1 h-5 w-5",
            // light
            "text-tremor-content-subtle",
            // dark
            "dark:text-dark-tremor-content-subtle",
            isOpen ? "transition-all" : "-rotate-180 transition-all",
          )}
        />
      </div>
    </Disclosure.Button>
  );
});

AccordionHeader.displayName = "AccordionHeader";

export default AccordionHeader;
