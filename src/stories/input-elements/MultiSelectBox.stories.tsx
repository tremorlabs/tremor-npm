import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  Button,
  Card,
  DateRangePicker,
  Flex,
  MultiSelectBox,
  MultiSelectBoxItem,
  Text,
  Title,
} from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleMultiSelectBox } from "./helpers/SimpleMultiSelectBox";

import { CalendarIcon } from "assets";
import { SimpleSelectBox } from "stories/input-elements/helpers/SimpleSelectBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/MultiSelectBox",
  component: MultiSelectBox,
} as ComponentMeta<typeof MultiSelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof MultiSelectBox> = (args) => (
  <form>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <DateRangePicker />
        <SimpleMultiSelectBox {...args} />
        <SimpleSelectBox icon={CalendarIcon} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <SimpleMultiSelectBox {...args} />
    </Card>
    <Title className="mt-5">With Black Background</Title>
    <Card>
      <div className="flex items-center bg-black h-24">
        <SimpleMultiSelectBox {...args} />
      </div>
    </Card>
  </form>
);

const FlexTemplate: ComponentStory<typeof MultiSelectBox> = (args) => (
  <>
    <Card>
      <Text className="mt-5">Justify Start</Text>
      <Flex justifyContent="start" className="mt-2">
        <SimpleMultiSelectBox {...args} />
      </Flex>
      <Text className="mt-5">Justify End</Text>
      <Flex justifyContent="end" className="mt-2">
        <SimpleMultiSelectBox {...args} />
      </Flex>
      <Text className="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="end" className="mt-2">
        <div>
          <SimpleMultiSelectBox {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="start" className="mt-2">
        <div>
          <SimpleMultiSelectBox {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof MultiSelectBox> = () => {
  const [value, setValue] = useState<string[]>([]);
  console.log("OUTER", value);
  return (
    <Card>
      <MultiSelectBox
        value={value}
        onValueChange={(values) => {
          setValue(values);
          alert(values);
        }}
      >
        <MultiSelectBoxItem value={"5"} text={"Five"} />
        <MultiSelectBoxItem value={"3"} text={"Three"} />
        <MultiSelectBoxItem value={"1"} text={"One"} />
      </MultiSelectBox>
      <Button onClick={() => setValue([])}>Reset</Button>
      <Button onClick={() => setValue(["1"])}>Set to One</Button>
    </Card>
  );
};

export const DefaultResponsive = ResponsiveTemplate.bind({});

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
  className: "max-w-xs",
  onValueChange: (values) => console.log(values),
};

export const WithDefaultValues = ResponsiveTemplate.bind({});
WithDefaultValues.args = {
  defaultValue: ["5", "1"],
};

export const WithIcon = ResponsiveTemplate.bind({});
WithIcon.args = {
  icon: CalendarIcon,
  defaultValue: ["5", "1"],
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});

export const WithControlledState = WithControlledStateTemplate.bind({});
