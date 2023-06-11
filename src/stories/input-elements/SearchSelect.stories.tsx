import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

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

const meta: Meta<typeof SearchSelect> = {
  title: "Tremor/InputElements/SearchSelect",
  component: SearchSelect,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof SearchSelect>;

const ResponsiveTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
  },
};

const FlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
    );
  },
};

function WithControlledState({ ...args }) {
  const [value, setValue] = useState<string>("5");
  return (
    <Card>
      <SearchSelect
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
        {...args}
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
}

const WithControlledStateTemplate: Story = {
  render: ({ ...args }) => <WithControlledState {...args} />,
};

export const DefaultResponsive: Story = {
  ...ResponsiveTemplate,
  args: {
    onValueChange: (v) => alert(v),
  },
};

export const WithFlexParent: Story = {
  ...FlexTemplate,
  args: {
    className: "max-w-xs",
  },
};

export const WithDefaultValue: Story = {
  ...ResponsiveTemplate,
  args: {
    defaultValue: "5",
  },
};

export const WithIcon: Story = {
  ...ResponsiveTemplate,
  args: {
    icon: CalendarIcon,
  },
};

export const WithDisabled: Story = {
  ...ResponsiveTemplate,
  args: {
    onValueChange: (v) => alert(v),
    disabled: true,
  },
};

export const SelectElementsComparison: Story = {
  ...SelectElementsFlexTemplate,
};

export const WithControlledStateExample: Story = {
  ...WithControlledStateTemplate,
};
