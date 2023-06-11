import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Card,
  Flex,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
} from "components";
import { BaseColors } from "lib";
import { CalendarIcon } from "assets";

const meta: Meta<typeof TabGroup> = {
  title: "Tremor/InputElements/TabGroup",
  component: TabGroup,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

const TabLine = (args: any) => (
  <TabGroup {...args}>
    <TabList {...args}>
      <Tab icon={CalendarIcon}>One</Tab>
      <Tab icon={CalendarIcon}>This is a very Long Tab Value that is used as an edge case</Tab>
      <Tab icon={CalendarIcon}>Three</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>One</TabPanel>
      <TabPanel>Long Text</TabPanel>
      <TabPanel>Three</TabPanel>
    </TabPanels>
  </TabGroup>
);

const TabSolid = (args: any) => (
  <TabGroup {...args}>
    <TabList variant="solid" {...args}>
      <Tab icon={CalendarIcon}>One</Tab>
      <Tab icon={CalendarIcon}>This is a very Long Tab Value that is used as an edge case</Tab>
      <Tab icon={CalendarIcon}>Three</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>One</TabPanel>
      <TabPanel>LongText</TabPanel>
      <TabPanel>Three</TabPanel>
    </TabPanels>
  </TabGroup>
);

const ResponsiveTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Title>Mobile</Title>
        <div className="w-64 space-y-5">
          <Card>
            <TabLine {...args} />
          </Card>
          <Card>
            <TabSolid {...args} />
          </Card>
        </div>
        <Title className="mt-5 space-y-5">Desktop</Title>
        <Card>
          <TabLine {...args} />
        </Card>
        <Card>
          <TabSolid {...args} />
        </Card>
      </>
    );
  },
};

const FlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <Card>
        <Text className="mt-2">Justify Start</Text>
        <Flex justifyContent="start" className="mt-2">
          <TabLine {...args} />
        </Flex>
        <Text className="mt-2">Justify End</Text>
        <Flex justifyContent="end" className="mt-2">
          <TabLine {...args} />
        </Flex>
        <Text className="mt-2">Justify End with inner div</Text>
        <Flex justifyContent="end" className="mt-2">
          <div>
            <TabLine {...args} />
          </div>
        </Flex>
        <Text className="mt-2">Justify Start with inner div</Text>
        <Flex justifyContent="start" className="mt-2">
          <div>
            <TabLine {...args} />
          </div>
        </Flex>
      </Card>
    );
  },
};

const ColorsTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Card>
          <div className="space-y-2">
            {Object.values(BaseColors).map((color) => (
              <div key={color} className="space-y-8">
                <TabLine {...args} color={color} />
                <TabSolid {...args} color={color} />
              </div>
            ))}
          </div>
        </Card>
      </>
    );
  },
};

function WithControlledState({ ...args }) {
  const [index, setIndex] = useState(0);
  return (
    <Card>
      <TabGroup index={index} onIndexChange={setIndex} {...args}>
        <TabList {...args}>
          <Tab>Five</Tab>
          <Tab>Three</Tab>
          <Tab>One</Tab>
        </TabList>
      </TabGroup>
      <Button onClick={() => setIndex(0)}>Reset</Button>
      <Button onClick={() => setIndex(2)}>One</Button>
    </Card>
  );
}

const WithControlledStateTemplate: Story = {
  render: ({ ...args }) => <WithControlledState {...args} />,
};

export const DefaultExample: Story = {
  ...ResponsiveTemplate,
  args: {
    onIndexChange: (index) => console.log(index),
  },
};

export const WithFlexParent: Story = {
  ...FlexTemplate,
  args: {
    onIndexChange: (index) => console.log(index),
  },
};

export const WithDefaultValue: Story = {
  ...ResponsiveTemplate,
  args: {
    defaultIndex: 2,
  },
};

export const ColorsExample: Story = {
  ...ColorsTemplate,
};

export const WithControlledStateExample: Story = {
  ...WithControlledStateTemplate,
};
