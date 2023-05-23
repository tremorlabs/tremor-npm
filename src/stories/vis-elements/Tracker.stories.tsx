import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card, Tracker } from "components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/Tracker",
  component: Tracker,
} as ComponentMeta<typeof Tracker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

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
