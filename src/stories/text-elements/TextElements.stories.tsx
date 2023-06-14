import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Bold, Italic, Text, Title, Card } from "components";

const meta: Meta<typeof Title> = {
  title: "Tremor/TextElements/TextElements",
  component: Title,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Title>;

const TextElementsResponsiveFlexTemplate: Story = {
  render: () => {
    return (
      <Card>
        <Text>
          Text with <Bold>bold text</Bold> and <Italic>Italics Text</Italic> and{" "}
          <Bold>
            <Italic>Bold italics text</Italic>
          </Bold>
        </Text>
      </Card>
    );
  },
};

export const DefaultExample: Story = {
  ...TextElementsResponsiveFlexTemplate,
};
