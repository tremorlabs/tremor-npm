import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Bold, Italic, Text, Title } from "components";

const meta: Meta<typeof Title> = {
  title: "Components/Text/TextElements",
  component: Title,
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
