import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  Button,
  Card,
  DateRangePicker,
  Flex,
  SearchSelect,
  SearchSelectItem,
  Text,
  Title,
} from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleSelect } from "stories/input-elements/helpers/SimpleSelect";
import { SimpleSearchSelect } from "./helpers/SimpleSearchSelect";

import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/SearchSelect",
  component: SearchSelect,
} as ComponentMeta<typeof SearchSelect>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const ResponsiveTemplate: ComponentStory<typeof SearchSelect> = (args) => (
  <form>
    <Title>Mobile</Title>
    <div className="w-64">
      <Card>
        <DateRangePicker />
        <SimpleSearchSelect {...args} />
        <SimpleSelect />
      </Card>
    </div>
    <Title className="mt-5">Desktop</Title>
    <Card>
      <SimpleSearchSelect {...args} />
    </Card>
  </form>
);

const FlexTemplate: ComponentStory<typeof SearchSelect> = (args) => (
  <>
    <Card>
      <Text className="mt-2">Justify Start</Text>
      <Flex justifyContent="start" className="mt-2">
        <SimpleSearchSelect {...args} />
      </Flex>
      <Text className="mt-2">Justify End</Text>
      <Flex justifyContent="end" className="mt-2">
        <SimpleSearchSelect {...args} />
      </Flex>
      <Text className="mt-2">Justify End with inner div</Text>
      <Flex justifyContent="end" className="mt-2">
        <div>
          <SimpleSearchSelect {...args} />
        </div>
      </Flex>
      <Text className="mt-2">Justify Start with inner div</Text>
      <Flex justifyContent="start" className="mt-2">
        <div>
          <SimpleSearchSelect {...args} />
        </div>
      </Flex>
    </Card>
  </>
);

const WithControlledStateTemplate: ComponentStory<typeof SearchSelect> = () => {
  const [value, setValue] = useState<string>("5");
  return (
    <Card>
      <SearchSelect
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
      >
        <SearchSelectItem value={"5"}>Five</SearchSelectItem>
        <SearchSelectItem value={"3"}>Three</SearchSelectItem>
        <SearchSelectItem value={"1"}>One</SearchSelectItem>
        <SearchSelectItem value={"30"}>Thirty</SearchSelectItem>
        <SearchSelectItem value={"33"}>Thirtythree</SearchSelectItem>
      </SearchSelect>
      <Button onClick={() => setValue("")}>Reset</Button>
      <Button onClick={() => setValue("1")}>One</Button>
      <Text>{value}</Text>
    </Card>
  );
};

const SearchSelectWithFormTemplate: ComponentStory<typeof SearchSelect> = (args) => (
  <form className="flex flex-col gap-3 items-start" method="GET" action="http://localhost:6006/">
    <label htmlFor="path" className="w-full">
      <Text>Redirect path</Text>
      <input
        type="text"
        name="path"
        id="path"
        defaultValue="/story/tremor-inputelements-searchselect--search-select-with-form"
        className="border border-gray-200 rounded-md w-1/2 p-2"
      />
    </label>
    <SearchSelect {...args} name="Searchselect" required className="w-1/2">
      <SearchSelectItem value={"5"}>Five</SearchSelectItem>
      <SearchSelectItem value={"3"}>Three</SearchSelectItem>
      <SearchSelectItem value={"1"}>One</SearchSelectItem>
    </SearchSelect>
    <Button type="submit">Submit</Button>
    <Text>{"You'll find your selected value in the URL params after submiting the form"}</Text>
  </form>
);

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

export const SearchSelectWithForm = SearchSelectWithFormTemplate.bind({});
