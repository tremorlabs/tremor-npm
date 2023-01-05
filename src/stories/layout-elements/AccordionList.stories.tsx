import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AccordionList, Card, Flex, Text, Title } from "components";
import { SimpleAccordion } from "./helpers/SimpleAccordion";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/AccordionList",
  component: AccordionList,
} as ComponentMeta<typeof AccordionList>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SimpleAccordionList = ({ ...args }) => {
  return (
    <AccordionList {...args}>
      <SimpleAccordion />
      <SimpleAccordion />
      <SimpleAccordion />
    </AccordionList>
  );
};

const ResponsiveTemplate: ComponentStory<typeof AccordionList> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="tr-w-64">
      <Card>
        <SimpleAccordionList {...args} length={length} />
      </Card>
    </div>
    <Title marginTop="mt-5">Desktop</Title>
    <Card>
      <SimpleAccordionList {...args} length={length} />
    </Card>
  </>
);

const FlexTemplate: ComponentStory<typeof AccordionList> = (args) => (
  <Card>
    <Text marginTop="mt-2">Justify Start</Text>
    <Flex justifyContent="justify-start" marginTop="mt-2">
      <SimpleAccordionList {...args} />
    </Flex>
    <Text marginTop="mt-2">Justify End</Text>
    <Flex justifyContent="justify-end" marginTop="mt-2">
      <SimpleAccordionList {...args} />
    </Flex>
    <Text marginTop="mt-2">Justify End with inner div</Text>
    <Flex justifyContent="justify-end" marginTop="mt-2">
      <div>
        <SimpleAccordionList {...args} />
      </div>
    </Flex>
    <Text marginTop="mt-2">Justify Start with inner div</Text>
    <Flex justifyContent="justify-start" marginTop="mt-2">
      <div>
        <SimpleAccordionList {...args} />
      </div>
    </Flex>
  </Card>
);

const LessThanThreeChildrenTemplate: ComponentStory<typeof AccordionList> = (
  args
) => (
  <Card>
    <AccordionList {...args}>
      <SimpleAccordion />
    </AccordionList>
    <AccordionList marginTop="mt-5">
      <SimpleAccordion />
      <SimpleAccordion />
    </AccordionList>
  </Card>
);

export const DefaultResponsive = ResponsiveTemplate.bind({});

export const WithFlexParent = FlexTemplate.bind({});

export const WithNoShadow = ResponsiveTemplate.bind({});
WithNoShadow.args = {
  shadow: false,
};

export const WithLessThanThreeChildren = LessThanThreeChildrenTemplate.bind({});
