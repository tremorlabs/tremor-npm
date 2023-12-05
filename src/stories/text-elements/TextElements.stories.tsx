import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Bold, Italic, Text, Title } from "components";

const meta: Meta<typeof Title> = {
  title: "UI/Text/TextElements",
  component: Title,
  parameters: {
    sourceLink: "https://github.com/tremorlabs/tremor/tree/main/src/components/text-elements",
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  render: () => (
    <Text>
      Text with <Bold>bold text</Bold> and <Italic>Italics Text</Italic> and{" "}
      <Bold>
        <Italic>Bold italics text</Italic>
      </Bold>
    </Text>
  ),
};
