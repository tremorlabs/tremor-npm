import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Card,
  DateRangePicker,
  Flex,
  MultiSelect,
  MultiSelectItem,
  Text,
  Title,
} from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleMultiSelect } from "./helpers/SimpleMultiSelect";

import { CalendarIcon } from "assets";
import { SimpleSearchSelect } from "stories/input-elements/helpers/SimpleSearchSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "Tremor/InputElements/MultiSelect",
  component: MultiSelect,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const ResponsiveTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <form>
        <Title>Mobile</Title>
        <div className="w-64">
          <Card>
            <DateRangePicker />
            <SimpleMultiSelect {...args} />
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
  },
};

const FlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
      </Card>
    );
  },
};

function WithControlledState({ ...args }) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Card>
      <MultiSelect
        value={value}
        onValueChange={(values) => {
          setValue(values);
          alert(values);
        }}
        {...args}
      >
        <MultiSelectItem value={"5"}>Five</MultiSelectItem>
        <MultiSelectItem value={"3"}>Three</MultiSelectItem>
        <MultiSelectItem value={"1"}>One</MultiSelectItem>
      </MultiSelect>
      <Button onClick={() => setValue([])}>Reset</Button>
      <Button onClick={() => setValue(["1"])}>Set to One</Button>
    </Card>
  );
}

const WithControlledStateTemplate: Story = {
  render: ({ ...args }) => <WithControlledState {...args} />,
};

export const DefaultResponsive: Story = {
  ...ResponsiveTemplate,
};

export const WithFlexParent: Story = {
  ...FlexTemplate,
  args: {
    className: "max-w-xs",
    onValueChange: (values) => console.log(values),
  },
};

export const WithDefaultValue: Story = {
  ...ResponsiveTemplate,
  args: {
    defaultValue: ["5", "1"],
  },
};

export const WithIcon: Story = {
  ...ResponsiveTemplate,
  args: {
    icon: CalendarIcon,
    defaultValue: ["5", "1"],
  },
};

export const WithDisabled: Story = {
  ...ResponsiveTemplate,
  args: {
    icon: CalendarIcon,
    defaultValue: ["5", "1"],
    disabled: true,
  },
};

export const SelectElementsComparison: Story = {
  ...SelectElementsFlexTemplate,
};

export const WithControlledStateExample: Story = {
  ...WithControlledStateTemplate,
};
