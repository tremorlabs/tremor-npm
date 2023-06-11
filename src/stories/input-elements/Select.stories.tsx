import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Button, Card, DateRangePicker, Select, SelectItem, Flex, Text, Title } from "components";
import { SelectElementsFlexTemplate } from "./helpers/SelectElementsFlexTemplate";
import { SimpleSelect } from "./helpers/SimpleSelect";
import { SimpleSearchSelect } from "stories/input-elements/helpers/SimpleSearchSelect";

import { CalendarIcon } from "assets";

const meta: Meta<typeof Select> = {
  title: "Tremor/TextElements/Select",
  component: Select,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Select>;

const ResponsiveTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
  },
};

const FlexTemplate: Story = {
  render: ({ ...args }) => {
    return (
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
  },
};

function WithControlledState({ ...args }) {
  const [value, setValue] = useState<string>("5");
  return (
    <Card>
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
        {...args}
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
    icon: CalendarIcon,
    disabled: true,
  },
};

export const SelectElementsComparison: Story = {
  ...SelectElementsFlexTemplate,
};

export const WithControlledStateExample: Story = {
  ...WithControlledStateTemplate,
};
