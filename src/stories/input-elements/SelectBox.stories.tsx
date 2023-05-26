import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  Button,
  Card,
  DateRangePicker,
  Flex,
  SelectBox,
  SelectBoxItem,
  Text,
  Title,
} from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleSelect } from "stories/input-elements/helpers/SimpleSelect";
import { SimpleSelectBox } from "./helpers/SimpleSelectBox";

import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/SelectBox",
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof SelectBox> = (args) => (
  <form>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <DateRangePicker />
        <SimpleSelectBox {...args} />
        <SimpleSelect />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <SimpleSelectBox {...args} />
    </Card>
    <Title className="mt-5">With Black Background</Title>
    <Card>
      <div className="flex items-center bg-black h-24">
        <SimpleSelectBox {...args} />
      </div>
    </Card>
  </form>
);

const FlexTemplate: ComponentStory<typeof SelectBox> = (args) => (
  <>
    <Card>
      <Text className="mt-2">Justify Start</Text>
      <Flex justifyContent="start" className="mt-2">
        <SimpleSelectBox {...args} />
      </Flex>
      <Text className="mt-2">Justify End</Text>
      <Flex justifyContent="end" className="mt-2">
        <SimpleSelectBox {...args} />
      </Flex>
      <Text className="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="end" className="mt-2">
        <div>
          <SimpleSelectBox {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="start" className="mt-2">
        <div>
          <SimpleSelectBox {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof SelectBox> = () => {
  const [value, setValue] = useState<string>("5");
  return (
    <Card>
      <SelectBox
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
      >
        <SelectBoxItem value={"5"}>Five</SelectBoxItem>
        <SelectBoxItem value={"3"}>Three</SelectBoxItem>
        <SelectBoxItem value={"1"}>One</SelectBoxItem>
        <SelectBoxItem value={"30"}>Thirty</SelectBoxItem>
        <SelectBoxItem value={"33"}>Thirtythree</SelectBoxItem>
      </SelectBox>
      <Button onClick={() => setValue("")}>Reset</Button>
      <Button onClick={() => setValue("1")}>One</Button>
      <Text>{value}</Text>
    </Card>
  );
};

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
  onValueChange: (v) => alert(v),
};

export const WithFlexParent = FlexTemplate.bind({});
WithFlexParent.args = {
  className: "max-w-xs",
};

export const WithDefaultValue = ResponsiveTemplate.bind({});
WithDefaultValue.args = {
  defaultValue: "5",
};

export const WithIcon = ResponsiveTemplate.bind({});
WithIcon.args = {
  defaultValue: "5",
  icon: CalendarIcon,
};

export const WithDisabled = ResponsiveTemplate.bind({});
WithDisabled.args = {
  onValueChange: (v) => alert(v),
  disabled: true,
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});

export const WithControlledState = WithControlledStateTemplate.bind({});
