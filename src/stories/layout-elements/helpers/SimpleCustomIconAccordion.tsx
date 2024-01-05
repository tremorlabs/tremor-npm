import React from "react";

import { ArrowRightIcon, ArrowUpHeadIcon, ChevronRightFill } from "assets";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Callout,
  Text,
} from "components";

export const CustomIconAccordion = (args: any) => (
  <Accordion {...args}>
    <div className="flex flex-row items-center gap-4">
      <AccordionHeader
        className="w-12"
        options={{
          openIcon: ArrowUpHeadIcon,
          closedIcon: ChevronRightFill,
          colors: "blue",
        }}
      />
      <Text>Product A</Text>
    </div>
    <AccordionBody>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod. Sit amet,
      consetetur sadipscing elitr. Per aspera ad astra.
      <Callout
        title={"Performing as Average"}
        icon={ArrowRightIcon}
        color="gray"
        className="mt-2"
      ></Callout>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue
      blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.
    </AccordionBody>
  </Accordion>
);

export const SimpleCustomIconAccordionList = (args: any) => {
  return (
    <AccordionList {...args}>
      <CustomIconAccordion />
      <CustomIconAccordion />
      <CustomIconAccordion />
    </AccordionList>
  );
};
