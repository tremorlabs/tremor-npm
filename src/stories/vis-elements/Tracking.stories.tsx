import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card } from "components";

import Tracking from "components/vis-elements/Tracking/Tracking";
import TrackingBlock from "components/vis-elements/Tracking/TrackingBlock";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/VisElements/Tracking",
  component: Tracking,
} as ComponentMeta<typeof Tracking>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Tracking> = () => (
  <Card>
    <Tracking>
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="yellow" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="red" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="yellow" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="red" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="yellow" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="red" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="yellow" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="red" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="yellow" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="red" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="yellow" tooltip="Tracking Info" />
      <TrackingBlock color="emerald" tooltip="Tracking Info" />
      <TrackingBlock color="red" tooltip="Tracking Info" />
    </Tracking>
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writingstories/args
Default.args = {};
