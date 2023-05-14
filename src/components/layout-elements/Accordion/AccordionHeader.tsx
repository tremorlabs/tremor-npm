"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { ArrowUpHeadIcon } from "assets";
import { getColorClassNames, makeClassName, sizing, spacing } from "lib";
import { DEFAULT_COLOR, colorPalette } from "lib/theme";
import { Disclosure } from "@headlessui/react";
import { OpenContext } from "components/layout-elements/Accordion/Accordion";

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
      className={twMerge(
        makeAccordionHeaderClassName("root"),
        "w-full flex items-center justify-between",
        spacing.threeXl.paddingX,
        spacing.lg.paddingY,
        className,
      )}
      {...other}
    >
      <div
        className={twMerge(
          makeAccordionHeaderClassName("children"),
          "flex flex-1",
          spacing.threeXl.marginRight,
        )}
      >
        {children}
      </div>
      <div>
        <ArrowUpHeadIcon
          className={twMerge(
            makeAccordionHeaderClassName("arrowIcon"),
            getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
            spacing.twoXs.negativeMarginRight,
            sizing.xl.height,
            sizing.xl.width,
            isOpen ? "transition-all" : "transition-all -rotate-180",
          )}
        />
      </div>
    </Disclosure.Button>
  );
});

export default AccordionHeader;
