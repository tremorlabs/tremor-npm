import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";
import { Divider } from "components";
import { CalendarIcon } from "assets";

const meta: Meta<typeof Divider> = {
  title: "Tremor/LayoutElements/Divider",
  component: Divider,
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
