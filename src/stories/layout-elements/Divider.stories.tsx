import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SimpleCard } from "stories/layout-elements/helpers/SimpleCard";
import { Divider, Title } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/LayoutElements/Divider",
  component: Divider,
} as ComponentMeta<typeof Divider>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Divider> = () => (
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

export const Default = Template.bind({});
