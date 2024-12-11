"use client";
import { DisclosureButton } from "@headlessui/react";
import { ArrowUpHeadIcon } from "assets";
import { OpenContext } from "components/layout-elements/Accordion/Accordion";
import { tremorTwMerge } from "lib";
import React, { useContext } from "react";

const AccordionHeader = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...other }, ref) => {
  const { isOpen } = useContext(OpenContext);

  return (
    <DisclosureButton
      ref={ref}
      className={tremorTwMerge(
        "text-tremor-content-emphasis flex w-full items-center justify-between px-4 py-3",
        className,
      )}
      {...other}
    >
      <div className={tremorTwMerge("mr-4 flex flex-1 text-inherit")}>{children}</div>
      <div>
        <ArrowUpHeadIcon
          className={tremorTwMerge(
            "text-tremor-content-subtle -mr-1 h-5 w-5",
            isOpen ? "transition-all" : "-rotate-180 transition-all",
          )}
        />
      </div>
    </DisclosureButton>
  );
});

AccordionHeader.displayName = "AccordionHeader";

export { AccordionHeader };
