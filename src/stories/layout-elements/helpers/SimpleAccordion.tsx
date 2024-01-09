import React from "react";

import { ArrowRightIcon } from "assets";
import { Accordion, AccordionBody, AccordionHeader, AccordionList, Callout } from "components";

export const SimpleAccordion = (args: any) => (
  <Accordion {...args}>
    <AccordionHeader>Product A</AccordionHeader>
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

export const SimpleAccordionList = (args: any) => {
  return (
    <AccordionList {...args}>
      <SimpleAccordion />
      <SimpleAccordion />
      <SimpleAccordion />
    </AccordionList>
  );
};
