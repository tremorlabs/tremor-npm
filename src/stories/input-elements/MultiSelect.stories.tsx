import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  Button,
  Card,
  DateRangePicker,
  Flex,
  MultiSelect,
  MultiSelectItem,
  Text,
  TextInput,
  Title,
  DatePicker,
  NumberInput,
} from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleMultiSelect } from "./helpers/SimpleMultiSelect";

import { CalendarIcon } from "assets";
import { SimpleSearchSelect } from "stories/input-elements/helpers/SimpleSearchSelect";
import { SimpleSelect } from "stories/input-elements/helpers/SimpleSelect";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/MultiSelect",
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof MultiSelect> = (args) => (
  <form>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <p>TextInput</p>
        <TextInput />
        <p>NumberInput</p>
        <NumberInput />
        <p>SimpleSelect</p>
        <SimpleSelect />
        <p>SimpleMultiSelect</p>
        <SimpleMultiSelect {...args} />
        <p>SimpleSearchSelect</p>
        <SimpleSearchSelect />
        {/* icons */}
        <p>DatePicker</p>
        <DatePicker />
        <p>DateRangePicker</p>
        <DateRangePicker />
        <p>TextInput</p>
        <TextInput icon={CalendarIcon} />
        <p>NumberInput</p>
        <NumberInput icon={CalendarIcon} />
        <p>SimpleSelect</p>
        <SimpleSelect {...args} icon={CalendarIcon} />
        <p>SimpleMultiSelect</p>
        {/* <SimpleMultiSelect {...args} icon={CalendarIcon} /> */}
        <SimpleMultiSelect {...args} />
        <p>SimpleSearchSelect</p>
        <SimpleSearchSelect icon={CalendarIcon} />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <SimpleMultiSelect {...args} />
    </Card>
    <Title className="mt-5">With Black Background</Title>
    <Card>
      <div className="flex items-center bg-black h-24">
        <SimpleMultiSelect {...args} />
      </div>
    </Card>
  </form>
);

const FlexTemplate: ComponentStory<typeof MultiSelect> = (args) => (
  <>
    <Card>
      <Text className="mt-5">Justify Start</Text>
      <Flex justifyContent="start" className="mt-2">
        <SimpleMultiSelect {...args} />
      </Flex>
      <Text className="mt-5">Justify End</Text>
      <Flex justifyContent="end" className="mt-2">
        <SimpleMultiSelect {...args} />
      </Flex>
      <Text className="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="end" className="mt-2">
        <div>
          <SimpleMultiSelect {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="start" className="mt-2">
        <div>
          <SimpleMultiSelect {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Check height of select inputs</Text>
      <Flex justifyContent="start" className="mt-2">
        <TextInput />
        <SimpleSelect />
        <SimpleMultiSelect {...args} />
        <SimpleMultiSelect {...args} icon={CalendarIcon} />
      </Flex>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof MultiSelect> = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Card>
      <MultiSelect
        value={value}
        onValueChange={(values) => {
          setValue(values);
          alert(values);
        }}
      >
        <MultiSelectItem value={"5"}>Five</MultiSelectItem>
        <MultiSelectItem value={"3"}>Three</MultiSelectItem>
        <MultiSelectItem value={"1"}>One</MultiSelectItem>
      </MultiSelect>
      <Button onClick={() => setValue([])}>Reset</Button>
      <Button onClick={() => setValue(["1"])}>Set to One</Button>
    </Card>
  );
};

const MultiSelectWithFormTemplate: ComponentStory<typeof MultiSelect> = (args) => (
  <form className="flex flex-col gap-3 items-start" method="GET" action="http://localhost:6006/">
    <label htmlFor="path" className="w-full">
      <Text>Redirect path</Text>
      <input
        type="text"
        name="path"
        id="path"
        defaultValue="/story/tremor-inputelements-multiselect--multi-select-with-form"
        className="border border-gray-200 rounded-md w-1/2 p-2"
      />
    </label>
    <MultiSelect {...args} name="MultiSelect" required className="w-1/2">
      <MultiSelectItem value={"5"}>Five</MultiSelectItem>
      <MultiSelectItem value={"3"}>Three</MultiSelectItem>
      <MultiSelectItem value={"1"}>One</MultiSelectItem>
    </MultiSelect>
    <Button type="submit">Submit</Button>
    <Text>{"You'll find your selected value in the URL params after submiting the form"}</Text>
  </form>
);

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

export const WithDisabled = ResponsiveTemplate.bind({});
WithDisabled.args = {
  icon: CalendarIcon,
  defaultValue: ["5", "1"],
  disabled: true,
};

export const SelectElementsComparison = SelectElementsFlexTemplate.bind({});

export const WithControlledState = WithControlledStateTemplate.bind({});

export const WithError = ResponsiveTemplate.bind({});
WithError.args = {
  error: true,
  errorMessage: "Error message",
};

export const WithForm = MultiSelectWithFormTemplate.bind({});
