import React from "react";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Callout,
  Flex,
  ProgressBar,
  Text,
} from "components";
import { ArrowRightIcon } from "assets";

export const SimpleAccordion = (args: any) => (
  <Accordion {...args}>
    <AccordionHeader>
      <div className="space-y-2 truncate w-full">
        <Flex className="truncate">
          <Text className="truncate">Product A</Text>
          <Text className="truncate">$ 23,300 (80%)</Text>
        </Flex>
        <ProgressBar percentageValue={80} />
      </div>
    </AccordionHeader>
    <AccordionBody>
      <Callout title={"Performing as Average"} icon={ArrowRightIcon} color="gray" className="mt-2">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod. Sit amet,
        consetetur sadipscing elitr. Per aspera ad astra.
      </Callout>
    </AccordionBody>
  </Accordion>
);
