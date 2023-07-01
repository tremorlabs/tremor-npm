import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

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
  TextInput,
  Title,
} from "components";
import { BaseColors } from "lib";
import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/TabGroup",
  component: TabGroup,
} as ComponentMeta<typeof TabGroup>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TabTest = (args: any) => (
  <div className="max-w-2xl p-8">
    <div className="flex flex-row gap-2">
      <TextInput value={"50kg"} />
      <TabGroup index={1}>
        <TabList variant="solid">
          <Tab>kg</Tab>
          <Tab>lbs</Tab>
        </TabList>
      </TabGroup>
      <div>
        <TextInput value={"50kg"} />
      </div>
      <div>
        <TabGroup index={1}>
          <TabList variant="solid">
            <Tab>kg</Tab>
            <Tab>lbs</Tab>
          </TabList>
        </TabGroup>
      </div>
    </div>
  </div>
);

const TabLine = (args: any) => (
  <TabGroup defaultIndex={0} {...args}>
    <TabList>
      <Tab icon={CalendarIcon}>This is a very Long Tab Value that is used as an edge case</Tab>
      <Tab icon={CalendarIcon}>Three</Tab>
      <Tab icon={CalendarIcon}>One</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>One</TabPanel>
      <TabPanel>Two</TabPanel>
      <TabPanel>Three</TabPanel>
    </TabPanels>
  </TabGroup>
);

const TabSolid = (args: any) => (
  <TabGroup defaultIndex={1} {...args}>
    <TabList variant="solid">
      <Tab icon={CalendarIcon}>This is a very Long Tab Value that is used as an edge case</Tab>
      <Tab icon={CalendarIcon}>Three</Tab>
      <Tab icon={CalendarIcon}>One</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>One</TabPanel>
      <TabPanel>Two</TabPanel>
      <TabPanel>Three</TabPanel>
    </TabPanels>
  </TabGroup>
);

const ResponsiveTemplate: ComponentStory<typeof TabGroup> = (args) => (
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

const FlexTemplate: ComponentStory<typeof TabGroup> = (args) => (
  <>
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
  </>
);

const ColorsTemplate: ComponentStory<typeof TabGroup> = (args) => (
  <>
    <Card>
      <div className="space-y-2">
        {Object.values(BaseColors).map((color) => (
          <Flex key={color} className="space-x-5">
            <TabLine {...args} color={color} />
            <TabSolid {...args} color={color} />
          </Flex>
        ))}
      </div>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof TabGroup> = () => {
  const [index, setIndex] = useState(0);
  return (
    <Card>
      <TabGroup index={index} onIndexChange={setIndex}>
        <TabList>
          <Tab>Five</Tab>
          <Tab>Three</Tab>
          <Tab>One</Tab>
        </TabList>
      </TabGroup>
      <Button onClick={() => setIndex(0)}>Reset</Button>
      <Button onClick={() => setIndex(2)}>One</Button>
    </Card>
  );
};

export const Test = TabTest.bind({});

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
  onIndexChange: (index) => console.log(index),
};

export const WithFlexParent = FlexTemplate.bind({});

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
  defaultIndex: 3,
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {
  defaultIndex: 3,
};

export const WithControlledState = WithControlledStateTemplate.bind({});
