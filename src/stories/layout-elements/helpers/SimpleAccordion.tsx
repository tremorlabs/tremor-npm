import React from "react";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Block,
  Callout,
  Flex,
  ProgressBar,
  Text,
} from "components";
import { ArrowRightIcon } from "assets";

export const SimpleAccordion = (args: any) => (
  <Accordion {...args}>
    <AccordionHeader>
      <Block className="space-y-2 truncate">
        <Flex className="truncate">
          <Text className="truncate">Product A</Text>
          <Text className="truncate">$ 23,300 (80%)</Text>
        </Flex>
        <ProgressBar percentageValue={80} />
      </Block>
    </AccordionHeader>
    <AccordionBody>
      <Callout
        title={"Performing as Average"}
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod. Sit amet,
                    consetetur sadipscing elitr. Per aspera ad astra."
        icon={ArrowRightIcon}
        color="gray"
        className="mt-2"
      />
    </AccordionBody>
  </Accordion>
);
