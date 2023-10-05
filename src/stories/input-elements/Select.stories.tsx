import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, DateRangePicker, Select, SelectItem, Flex, Text, Title } from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleSelect } from "./helpers/SimpleSelect";
import { SimpleSearchSelect } from "stories/input-elements/helpers/SimpleSearchSelect";

import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/Select",
  component: Select,
} as ComponentMeta<typeof Select>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof Select> = (args) => (
  <form>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <DateRangePicker />
        <SimpleSelect {...args} />
        <SimpleSearchSelect icon={CalendarIcon} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <SimpleSelect {...args} />
    </Card>
    <Title className="mt-5">With Black Background</Title>
    <Card>
      <div className="flex items-center bg-black h-24 px-4">
        <SimpleSelect {...args} />
      </div>
    </Card>
  </form>
);

const FlexTemplate: ComponentStory<typeof Select> = (args) => (
  <>
    <Card>
      <Text className="mt-2">Justify Start</Text>
      <Flex justifyContent="start" className="mt-2">
        <SimpleSelect {...args} />
      </Flex>
      <Text className="mt-2">Justify End</Text>
      <Flex justifyContent="end" className="mt-2">
        <SimpleSelect {...args} />
      </Flex>
      <Text className="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="end" className="mt-2">
        <div>
          <SimpleSelect {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="start" className="mt-2">
        <div>
          <SimpleSelect {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof Select> = () => {
  const [value, setValue] = useState<string>("5");
  return (
    <Card>
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
      >
        <SelectItem value={"5"}>Five</SelectItem>
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
        <SelectItem value={"6"}>Six</SelectItem>
        <SelectItem value={"7"}>Seven</SelectItem>
        <SelectItem value={"8"}>Eight</SelectItem>
        <SelectItem value={"9"}>Nine</SelectItem>
        <SelectItem value={"10"}>Ten</SelectItem>
        <SelectItem value={"11"}>Eleven</SelectItem>
      </Select>
      <Button onClick={() => setValue("")}>Reset</Button>
      <Button onClick={() => setValue("1")}>Set to One</Button>
      <Text>{value}</Text>
    </Card>
  );
};

const SelectWithFormTemplate: ComponentStory<typeof Select> = (args) => (
  <form
    className="flex flex-col gap-3 items-start"
    method="GET"
    action="http://localhost:6006/"
  >
    <label htmlFor="path" className="w-full">
        <Text>Redirect path</Text>
        <input 
            type="text" 
            name="path" 
            id="path" 
            defaultValue="/story/tremor-inputelements-select--select-with-form" 
            className="border border-gray-200 rounded-md w-1/2 p-2"
        />
    </label>
    <Select
      {...args}
      name="select"
      required
      className="w-1/2"
    >
      <SelectItem value={"5"}>Five</SelectItem>
      <SelectItem value={"3"}>Three</SelectItem>
      <SelectItem value={"1"}>One</SelectItem>
    </Select>
    <Button type="submit">
      Submit
    </Button>
    <Text>You'll find your selected value in the URL params after submiting the form</Text>
  </form>
);

export const DefaultResponsive = ResponsiveTemplate.bind({});
DefaultResponsive.args = {
  onValueChange: (v) => alert(v),
};

export const WithClearEnabled = ResponsiveTemplate.bind({});
WithClearEnabled.args = {
  onValueChange: (v) => alert(v),
  enableClear: true,
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
  icon: CalendarIcon,
  disabled: true,
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});

export const WithControlledState = WithControlledStateTemplate.bind({});

export const SelectWithForm = SelectWithFormTemplate.bind({});

SelectWithForm.args = {
    enableClear: true,
    icon: CalendarIcon,
  };