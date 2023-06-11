import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";
import { Divider, Title } from "components";

const meta: Meta<typeof Divider> = {
  title: "Tremor/LayoutElements/Divider",
  component: Divider,
  render: () => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64">
          <SimpleCard />
          <Divider />
          <SimpleCard />
        </div>
        <Title className="mt-5">Desktop</Title>
        <SimpleCard />
        <Divider />
        <SimpleCard />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const DefaultExample: Story = {};
