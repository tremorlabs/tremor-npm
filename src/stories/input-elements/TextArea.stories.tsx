import type { Meta, StoryObj } from "@storybook/react";
import { Button, Textarea } from "components";
import React from "react";

const meta: Meta<typeof Textarea> = {
  title: "UI/Input/Textarea",
  component: Textarea,
  parameters: {
    sourceLink:
      "https://github.com/tremorlabs/tremor/tree/main/src/components/input-elements/Textarea",
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

function Controlled({ ...args }) {
  const [value, setValue] = React.useState<string>("Default Value");
  return (
    <div className="space-y-4">
      <Textarea {...args} value={value} onValueChange={(v: string) => setValue(v)} />
      <Button
        onClick={() => {
          setValue("");
        }}
      >
        Reset
      </Button>
      <div className="text-slate-500">
        <p>Filtered Data</p>
        <p>Data: {String(value)} </p>
      </div>
    </div>
  );
}

const ControlledTemplate: Story = {
  render: ({ ...args }) => <Controlled {...args} />,
};

export const Default: Story = {};

export const MaxLength5Cols10: Story = {
  args: {
    maxLength: 5,
  },
};

export const Rows5: Story = {
  args: {
    rows: 5,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "This is some placeholder text",
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const ErrorMessage: Story = {
  args: {
    error: true,
    errorMessage: "An unkown error occured.",
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.",
  },
};

export const ControlledDefault: Story = {
  ...ControlledTemplate,
};

export const AutoHeight: Story = {
  args: {
    autoHeight: true,
  },
};
