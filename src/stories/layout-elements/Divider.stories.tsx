import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { CalendarIcon } from "assets";
import { Divider } from "components";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";

const meta: Meta<typeof Divider> = {
  title: "UI/Layout/Divider",
  component: Divider,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/layout-elements/Divider",
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

const DividerTemplate: Story = {
  render: () => (
    <>
      <div>
        <SimpleCard />
        <Divider />
        <Divider>
          <CalendarIcon className="h-5 w-5" />
        </Divider>
        <Divider>Divider</Divider>
        <SimpleCard />
      </div>
    </>
  ),
};

export const Default: Story = {
  ...DividerTemplate,
};
