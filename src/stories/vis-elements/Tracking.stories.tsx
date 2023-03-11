import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card } from "components";

import Tracking from "components/vis-elements/Tracking/Tracking";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/Tracking",
  component: Tracking,
} as ComponentMeta<typeof Tracking>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Tracking> = () => (
  <Card>
    <Tracking
      data={[
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "yellow", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "red", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "yellow", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "red", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "yellow", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
        { color: "emerald", tooltip: "Tracking Info" },
      ]}
    />
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writingstories/args
Default.args = {};
