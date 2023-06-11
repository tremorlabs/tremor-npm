import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { AccordionList, Card, Flex, Text, Title } from "components";
import { SimpleAccordion } from "./helpers/SimpleAccordion";

const meta: Meta<typeof AccordionList> = {
  title: "Tremor/LayoutElements/AccordionList",
  component: AccordionList,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof AccordionList>;

const SimpleAccordionList = ({ ...args }) => {
  return (
    <AccordionList {...args}>
      <SimpleAccordion />
      <SimpleAccordion />
      <SimpleAccordion />
    </AccordionList>
  );
};

const ResponsiveTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64">
          <Card>
            <SimpleAccordionList {...args} length={length} />
          </Card>
        </div>
        <Title className="mt-5">Desktop</Title>
        <Card>
          <SimpleAccordionList {...args} length={length} />
        </Card>
      </>
    );
  },
};

const FlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Text className="mt-2">Justify Start</Text>
        <Flex justifyContent="start" className="mt-2">
          <SimpleAccordionList {...args} />
        </Flex>
        <Text className="mt-2">Justify End</Text>
        <Flex justifyContent="end" className="mt-2">
          <SimpleAccordionList {...args} />
        </Flex>
        <Text className="mt-2">Justify End with inner div</Text>
        <Flex justifyContent="end" className="mt-2">
          <div>
            <SimpleAccordionList {...args} />
          </div>
        </Flex>
        <Text className="mt-2">Justify Start with inner div</Text>
        <Flex justifyContent="start" className="mt-2">
          <div>
            <SimpleAccordionList {...args} />
          </div>
        </Flex>
      </Card>
    );
  },
};

const LessThanThreeChildrenTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <AccordionList {...args}>
          <SimpleAccordion />
        </AccordionList>
        <AccordionList className="mt-5">
          <SimpleAccordion />
          <SimpleAccordion />
        </AccordionList>
      </Card>
    );
  },
};

export const DefaultExample: Story = {
  ...ResponsiveTemplate,
};

export const WithFlexParent: Story = {
  ...FlexTemplate,
};

export const WithLessThanThreeChildren: Story = {
  ...LessThanThreeChildrenTemplate,
};
