import React, { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Button, DatePicker } from "components";
import { fr } from "date-fns/locale";

const meta: Meta<typeof DatePicker> = {
  title: "Components/Input/DatePicker",
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Components
function Uncontrolled({ ...args }) {
  const [value, setValue] = useState<Date>();

  return (
    <div className="space-y-4">
      <DatePicker {...args} onValueChange={(value: Date | undefined) => setValue(value)} />
      <div className="text-slate-500">
        <p>Filtered Data</p>
        <p>Date: {String(value)} </p>
      </div>
    </div>
  );
}

function Controlled({ ...args }) {
  const [value, setValue] = useState<Date | undefined>(args.value!);
  return (
    <div className="space-y-4">
      <DatePicker {...args} value={value} onValueChange={(v: Date | undefined) => setValue(v)} />
      <Button
        onClick={() => {
          setValue(undefined);
        }}
      >
        Reset
      </Button>
      <div className="text-slate-500">
        <p>Filtered Data</p>
        <p>Date: {String(value)} </p>
      </div>
    </div>
  );
}

// Templates

const UncontrolledTemplate: Story = {
  render: ({ ...args }) => <Uncontrolled {...args} />,
};

const ControlledTemplate: Story = {
  render: ({ ...args }) => <Controlled {...args} />,
};

// Stories
export const UncontrolledDefault: Story = {
  ...UncontrolledTemplate,
};

export const UncontrolledWithDefaultValue: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: new Date(2022, 10, 1),
  },
};

export const UncontrolledWithDisplayFormat: Story = {
  ...UncontrolledTemplate,
  args: {
    displayFormat: "dd/MM/yyyy",
  },
};

export const UncontrolledWithFrLocale: Story = {
  ...UncontrolledTemplate,
  args: {
    locale: fr,
    placeholder: "Sélectionnez...",
  },
};

export const UncontrolledWithMinMax: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: new Date(2022, 10, 1),
    minDate: new Date(2023, 4, 1),
    maxDate: new Date(2023, 4, 15),
  },
};

export const UncontrolledWithDisabled: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: new Date(2022, 10, 1),
    disabled: true,
  },
};

export const UncontrolledWithYearNavigation: Story = {
  ...UncontrolledTemplate,
  args: {
    enableYearNavigation: true,
  },
};

export const UncontrolledWithoutEnableClear: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: new Date(2022, 10, 1),
    enableClear: false,
  },
};

export const UncontrolledWithWeekStartsOnWednesday: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: new Date(2022, 10, 1),
    weekStartsOn: 3,
  },
};

export const ControlledDefault: Story = {
  ...ControlledTemplate,
};

export const ControlledWithDefaultValue: Story = {
  ...ControlledTemplate,
  args: {
    defaultValue: new Date(2022, 10, 1),
  },
};
