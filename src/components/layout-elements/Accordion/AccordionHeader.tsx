"use client";
import { tremorTwMerge } from "lib";
import React, { useContext } from "react";

import { Disclosure } from "@headlessui/react";
import { ArrowUpHeadIcon } from "assets";
import { OpenContext } from "components/layout-elements/Accordion/Accordion";
import { makeClassName, sizing, spacing } from "lib";

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
        "w-full flex items-center justify-between",
        // light
        "text-tremor-content-emphasis",
        // dark
        "dark:text-dark-tremor-content-emphasis",
        spacing.twoXl.paddingX,
        spacing.lg.paddingY,
        className,
      )}
      {...other}
    >
      <div
        className={tremorTwMerge(
          makeAccordionHeaderClassName("children"),
          "flex flex-1 text-inherit",
          spacing.twoXl.marginRight,
        )}
      >
        {children}
      </div>
      <div>
        <ArrowUpHeadIcon
          className={tremorTwMerge(
            makeAccordionHeaderClassName("arrowIcon"),
            // light
            "text-tremor-content-subtle",
            // dark
            "dark:text-dark-tremor-content-subtle",
            spacing.twoXs.negativeMarginRight,
            sizing.md.height,
            sizing.md.width,
            isOpen ? "transition-all" : "transition-all -rotate-180",
          )}
        />
      </div>
    </Disclosure.Button>
  );
});

AccordionHeader.displayName = "AccordionHeader";

export default AccordionHeader;
