import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Subtitle, Card } from "components";

const meta: Meta<typeof Subtitle> = {
  title: "Tremor/TextElements/Subtitle",
  component: Subtitle,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Subtitle>;

const SubtitleResponsiveFlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Subtitle {...args} className="truncate">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type andSubtitleambled it to make a type specimen book.
        </Subtitle>
      </Card>
    );
  },
};

export const DefaultExample: Story = {
  ...SubtitleResponsiveFlexTemplate,
};

export const ExampleColor: Story = {
  ...SubtitleResponsiveFlexTemplate,
  args: {
    color: "green",
    className: "text-left",
    children: null,
  },
};
