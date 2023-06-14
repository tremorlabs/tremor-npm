import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Accordion, Card, Flex, Text, Title } from "components";
import { SimpleAccordion } from "./helpers/SimpleAccordion";

const meta: Meta<typeof Accordion> = {
  title: "Tremor/LayoutElements/Accordion",
  component: Accordion,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const ResponsiveTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64">
          <Card>
            <SimpleAccordion {...args} />
          </Card>
        </div>
        <Title className="mt-5">Desktop</Title>
        <Card>
          <SimpleAccordion {...args} />
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
          <SimpleAccordion {...args} />
        </Flex>
        <Text className="mt-2">Justify End</Text>
        <Flex justifyContent="end" className="mt-2">
          <SimpleAccordion {...args} />
        </Flex>
        <Text className="mt-2">Justify End with inner div</Text>
        <Flex justifyContent="end" className="mt-2">
          <div>
            <SimpleAccordion {...args} />
          </div>
        </Flex>
        <Text className="mt-2">Justify Start with inner div</Text>
        <Flex justifyContent="start" className="mt-2">
          <div>
            <SimpleAccordion {...args} />
          </div>
        </Flex>
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

export const WithExpanded: Story = {
  ...FlexTemplate,
  args: {
    defaultOpen: true,
  },
};
