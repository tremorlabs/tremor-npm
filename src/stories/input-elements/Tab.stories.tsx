import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, Flex, Tab, TabList, Text, Title } from "components";
import { BaseColors } from "lib";
import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/TabList",
  component: TabList,
} as ComponentMeta<typeof TabList>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SimpleTabList = (args: any) => (
  <TabList {...args}>
    <Tab
      value={"5"}
      text={"This is a very Long Tab Value that is used as an edge case"}
      icon={CalendarIcon}
    />
    <Tab value={"3"} text={"Three"} icon={CalendarIcon} />
    <Tab value={"1"} text={"One"} />
  </TabList>
);

const ResponsiveTemplate: ComponentStory<typeof TabList> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <SimpleTabList {...args} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <SimpleTabList {...args} />
    </Card>
  </>
);

const FlexTemplate: ComponentStory<typeof TabList> = (args) => (
  <>
    <Card>
      <Text className="mt-2">Justify Start</Text>
      <Flex justifyContent="start" className="mt-2">
        <SimpleTabList {...args} />
      </Flex>
      <Text className="mt-2">Justify End</Text>
      <Flex justifyContent="end" className="mt-2">
        <SimpleTabList {...args} />
      </Flex>
      <Text className="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="end" className="mt-2">
        <div>
          <SimpleTabList {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="start" className="mt-2">
        <div>
          <SimpleTabList {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const ColorsTemplate: ComponentStory<typeof TabList> = (args) => (
  <>
    <Card>
      <div className="space-y-2">
        {Object.values(BaseColors).map((color) => (
          <SimpleTabList key={color} {...args} color={color} />
        ))}
      </div>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof TabList> = () => {
  const [value, setValue] = useState<string>("5");
  return (
    <Card>
      <TabList
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
      >
        <Tab value={"5"} text={"Five"} />
        <Tab value={"3"} text={"Three"} />
        <Tab value={"1"} text={"One"} />
      </TabList>
      <Button onClick={() => setValue("")}>Reset</Button>
      <Button onClick={() => setValue("1")}>One</Button>
    </Card>
  );
};

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
  onValueChange: (value) => console.log(value),
};

export const WithFlexParent = FlexTemplate.bind({});

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
  defaultValue: "5",
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {
  defaultValue: "5",
};

export const WithControlledState = WithControlledStateTemplate.bind({});
