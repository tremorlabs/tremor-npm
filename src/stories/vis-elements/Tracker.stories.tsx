import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card, Tracker } from "components";

export default {
  title: "Tremor/VisElements/Tracker",
  component: Tracker,
} as ComponentMeta<typeof Tracker>;


const Template: ComponentStory<typeof Tracker> = () => (
  <Card>
    <Tracker
      data={[
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "yellow", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "red", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "yellow", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "red", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "yellow", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
        { color: "emerald", tooltip: "Tracker Info" },
      ]}
    />
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writingstories/args
Default.args = {};
