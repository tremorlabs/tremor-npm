import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Button, Card, Text, TextInput } from "components";
import { CalendarIcon } from "assets";

const meta: Meta<typeof TextInput> = {
  title: "Tremor/InputElements/TextInput",
  component: TextInput,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export function TextInputTemplate({ ...args }) {
  const [value, setValue] = useState("");
  return (
    <Card>
      <form
        onSubmit={(e) => {
          alert(value);
          e.preventDefault();
        }}
        onReset={() => setValue("")}
      >
        <Text>Uncontrolled</Text>
        <TextInput {...args} />
        <Text>Uncontrolled with defaultValue</Text>
        <TextInput {...args} defaultValue="hello" />
        <Text>Conrolled without onChange</Text>
        <TextInput {...args} value={value} />
        <label htmlFor="a">
          <Text>Controlled</Text>
        </label>
        <TextInput {...args} id={"a"} value={value} onChange={(e) => setValue(e.target.value)} />
        <Button type="submit" className="mt-2">
          Submit
        </Button>
        <Button type="reset" className="mt-2">
          Reset Input
        </Button>
      </form>
      <Text>{value}</Text>
    </Card>
  );
}

const DefaultTemplate: Story = {
  render: ({ ...args }) => <TextInputTemplate {...args} />,
};

export const DefaultExample: Story = {
  ...DefaultTemplate,
};

export const WithIcon: Story = {
  ...DefaultTemplate,
  args: {
    icon: CalendarIcon,
  },
};

export const WithNoPlaceholder: Story = {
  ...DefaultTemplate,
  args: {
    placeholder: "",
  },
};

export const WithDefaultValue: Story = {
  ...DefaultTemplate,
  args: {
    value: "Hello",
  },
};

export const WithError: Story = {
  ...DefaultTemplate,
  args: {
    value: "Hello",
    error: true,
  },
};

export const WithErrorMessage: Story = {
  ...DefaultTemplate,
  args: {
    value: "Hello",
    error: true,
    errorMessage: "Something is wrong",
  },
};

export const WithDisabled: Story = {
  ...DefaultTemplate,
  args: {
    value: "Hello",
    disabled: true,
  },
};

export const WithDisabledAndError: Story = {
  ...DefaultTemplate,
  args: {
    value: "Hello",
    error: true,
    disabled: true,
  },
};

export const WithTypePassword: Story = {
  ...DefaultTemplate,
  args: {
    type: "password",
  },
};
