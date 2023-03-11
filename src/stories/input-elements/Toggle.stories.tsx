import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, Flex, Text, Title, Toggle, ToggleItem } from "components";
import { BaseColors } from "lib";
import { CalendarIcon } from "assets";

const Icon = CalendarIcon;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const SimpleToggle = (args: any) => (
  <form>
    <Toggle {...args}>
      <ToggleItem
        value={"5"}
        text={"This is a very Long Toggle Value that is used as an edge case"}
        icon={Icon}
      />
      <ToggleItem value={"3"} text={"Three"} icon={Icon} />
      <ToggleItem value={"1"} text={"One"} icon={Icon} />
    </Toggle>
  </form>
);

const SimpleToggleIconOnly = (args: any) => (
  <form>
    <Toggle {...args}>
      <ToggleItem value={"5"} icon={Icon} />
      <ToggleItem value={"3"} icon={Icon} />
      <ToggleItem value={"1"} icon={Icon} />
    </Toggle>
  </form>
);

const ResponsiveTemplate: ComponentStory<typeof Toggle> = (args) => (
  <>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <div className="space-y-2">
          <SimpleToggle {...args} />
          <SimpleToggleIconOnly {...args} />
        </div>
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <div className="space-y-2">
        <SimpleToggle {...args} />
        <SimpleToggleIconOnly {...args} />
      </div>
    </Card>
  </>
);

const FlexTemplate: ComponentStory<typeof Toggle> = (args) => (
  <>
    <Card>
      <Text className="mt-2">Justify Start</Text>
      <Flex justifyContent="start" className="mt-2">
        <SimpleToggle {...args} />
      </Flex>
      <Text className="mt-2">Justify End</Text>
      <Flex justifyContent="end" className="mt-2">
        <SimpleToggle {...args} />
      </Flex>
      <Text className="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="end" className="mt-2">
        <div>
          <SimpleToggle {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="start" className="mt-2">
        <div>
          <SimpleToggle {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const ColorsTemplate: ComponentStory<typeof Toggle> = (args) => (
  <>
    <Card>
      <div className="space-y-2">
        {Object.values(BaseColors).map((color) => (
          <div key={color}>
            <SimpleToggle {...args} color={color} />
          </div>
        ))}
      </div>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof Toggle> = () => {
  const [value, setValue] = useState<string>("5");
  return (
    <Card>
      <Toggle
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
      >
        <ToggleItem value={"5"} text={"Five"} />
        <ToggleItem value={"3"} text={"Three"} />
        <ToggleItem value={"1"} text={"One"} />
      </Toggle>
      <Button onClick={() => setValue("")}>Text</Button>
      <Button onClick={() => setValue("1")}>Set to one</Button>
    </Card>
  );
};

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
  defaultValue: "5",
  onValueChange: (value) => console.log(value),
};

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
  defaultValue: "5",
};

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
  defaultValue: "5",
};

export const Colors = ColorsTemplate.bind({});
Colors.args = {
  defaultValue: "5",
};

export const WithControlledState = WithControlledStateTemplate.bind({});
