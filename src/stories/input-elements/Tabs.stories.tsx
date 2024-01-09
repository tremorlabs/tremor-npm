import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { CalendarIcon } from "assets";
import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "components";
import { BaseColors, Color } from "lib";

const meta: Meta<typeof TabGroup> = {
  title: "UI/Input/Tabs",
  component: TabGroup,
  parameters: {
    sourceLink: "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/Tabs",
  },
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

interface MyTabProps {
  variant?: "line" | "solid";
  defaultIndex?: number;
  showText?: boolean;
  color: Color;
  args?: any;
}

//Components
function MyTab(props: MyTabProps) {
  const { variant = "line", defaultIndex = 0, showText = true, color = "blue", args } = props;

  const tabLabels = ["This is a very Long Tab Value that is used as an edge case", "Three", "One"];

  return (
    <TabGroup defaultIndex={defaultIndex} {...args}>
      <TabList variant={variant} color={color}>
        {tabLabels.map((label, index) => (
          <Tab icon={CalendarIcon} key={index}>
            {showText ? label : null}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>One</TabPanel>
        <TabPanel>Two</TabPanel>
        <TabPanel>Three</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

function WithControlledStateTemplate({ ...args }) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <TabGroup index={index} onIndexChange={setIndex} {...args}>
        <TabList>
          <Tab>One</Tab>
          <Tab>Five</Tab>
          <Tab>Three</Tab>
        </TabList>
      </TabGroup>
      <div className="mt-4 space-x-2">
        <Button onClick={() => setIndex(0)}>Reset</Button>
        <Button onClick={() => setIndex(2)}>Three</Button>
        <p>index: {index}</p>
      </div>
    </>
  );
}

function TabSet({ showText = true, ...args }) {
  return (
    <>
      <div className="space-y-4">
        <MyTab variant="line" showText={showText} {...args} color={args.color} />
        <MyTab variant="solid" showText={showText} {...args} color={args.color} />
      </div>
    </>
  );
}

// Templates
const TabSetTemplate: Story = {
  render: ({ ...args }) => <TabSet {...args} />,
};

const TabSetNoTextTemplate: Story = {
  render: ({ ...args }) => <TabSet {...args} />,
};

const TabSetColorsTemplate: Story = {
  render: ({ ...args }) => (
    <div className="space-y-4">
      {Object.values(BaseColors).map((color) => (
        <div key={color} className="space-x-5">
          <TabSet {...args} color={color} />
        </div>
      ))}
    </div>
  ),
};

const ControlledTabSetTemplate: Story = {
  render: WithControlledStateTemplate,
};

// Stories

export const Default: Story = {
  ...TabSetTemplate,
};

export const DefaultNoText: Story = {
  ...TabSetNoTextTemplate,
};

export const OnIndexChange: Story = {
  ...TabSetTemplate,
  args: { onIndexChange: (index) => console.log(index) },
};

export const OnIndexChangeNoText: Story = {
  ...TabSetNoTextTemplate,
  args: { onIndexChange: (index) => console.log(index) },
};

export const DefaultIndex: Story = {
  ...TabSetTemplate,
  args: { defaultIndex: 3 },
};

export const Colors: Story = {
  ...TabSetColorsTemplate,
};

export const Controlled: Story = {
  ...ControlledTabSetTemplate,
};
