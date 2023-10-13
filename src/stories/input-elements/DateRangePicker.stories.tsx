import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Button, DateRangePicker, DateRangePickerItem, DateRangePickerValue } from "components";

import { fr } from "date-fns/locale";
import { dateRangePickerData } from "stories/input-elements/helpers/testData";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/Input/DateRangePicker",
  component: DateRangePicker,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Components
function Uncontrolled({ ...args }) {
  const [value, setValue] = useState<DateRangePickerValue>({});
  const startDate = value.from;
  const endDate = value.to;

  return (
    <div className="space-y-4">
      <DateRangePicker {...args} onValueChange={(value) => setValue(value)} />
      <div className="text-slate-500">
        <p>Filtered Data</p>
        <p>StartDate: {String(startDate)} </p>
        <p>EndDate: {String(endDate)} </p>
      </div>
      <div>
        {dateRangePickerData
          .filter(
            (datapoint) =>
              startDate && endDate && datapoint.date >= startDate && datapoint.date <= endDate,
          )
          .map((datapoint) => (
            <p key={String(datapoint.date)}>{String(datapoint.date)}</p>
          ))}
      </div>
    </div>
  );
}

function UncontrolledWithChildren({ ...args }) {
  const [value, setValue] = useState<DateRangePickerValue>({});
  const startDate = value.from;
  const endDate = value.to;

  return (
    <div className="space-y-4">
      <DateRangePicker {...args} onValueChange={(value) => setValue(value)}>
        <DateRangePickerItem key="one" value="one" from={new Date(2023, 0, 1)}>
          2023/1/1 - Today
        </DateRangePickerItem>
        <DateRangePickerItem
          key="two"
          value="two"
          from={new Date(2023, 0, 1)}
          to={new Date(2023, 4, 1)}
        >
          2023/1/1 - 2023/5/1
        </DateRangePickerItem>
      </DateRangePicker>
      <div className="text-slate-500">
        <p>Filtered Data</p>
        <p>StartDate: {String(startDate)} </p>
        <p>EndDate: {String(endDate)} </p>
      </div>
      <div>
        {dateRangePickerData
          .filter(
            (datapoint) =>
              startDate && endDate && datapoint.date >= startDate && datapoint.date <= endDate,
          )
          .map((datapoint) => (
            <p key={String(datapoint.date)}>{String(datapoint.date)}</p>
          ))}
      </div>
    </div>
  );
}

function Controlled({ ...args }) {
  const [value, setValue] = useState<DateRangePickerValue>(args.value!);

  const startDate = value?.from;
  const endDate = value?.to;

  return (
    <div className="space-y-4">
      <DateRangePicker {...args} value={value} onValueChange={(v) => setValue(v)} />
      <Button
        onClick={() => {
          setValue({});
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          setValue({ selectValue: "tdy" });
        }}
      >
        Today
      </Button>
      <div className="text-slate-500">
        <p>Filtered Data</p>
        <p>StartDate: {String(startDate)} </p>
        <p>EndDate: {String(endDate)} </p>
      </div>
      <div>
        {dateRangePickerData
          .filter(
            (datapoint) =>
              startDate && endDate && datapoint.date >= startDate && datapoint.date <= endDate,
          )
          .map((datapoint) => (
            <p key={String(datapoint.date)}>{String(datapoint.date)}</p>
          ))}
      </div>
    </div>
  );
}

// Templates
const UncontrolledTemplate: Story = {
  render: ({ ...args }) => <Uncontrolled {...args} />,
};

const UncontrolledWithChildrenTemplate: Story = {
  render: ({ ...args }) => <UncontrolledWithChildren {...args} />,
};

const ControlledTemplate: Story = {
  render: ({ ...args }) => <Controlled {...args} />,
};

// Stories
export const UncontrolledDefault: Story = {
  ...UncontrolledTemplate,
};

export const UncontrolledWithDefaultDateRange: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
  },
};

export const UncontrolledWithDefaultDisplayFormat: Story = {
  ...UncontrolledTemplate,
  args: {
    displayFormat: "dd/MM/yyyy",
  },
};

export const UncontrolledWithDefaultFrLocale: Story = {
  ...UncontrolledTemplate,
  args: {
    locale: fr,
    selectPlaceholder: "Sélectionnez",
    placeholder: "Sélectionnez...",
  },
};

export const UncontrolledWithDefaultSelectOption: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { selectValue: "tdy" },
  },
};

export const UncontrolledWithDefaultValue: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
  },
};

export const UncontrolledWithSelectDisabled: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
    enableSelect: false,
  },
};

export const UncontrolledWithMinMax: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
    minDate: new Date(2023, 4, 1),
    maxDate: new Date(2023, 4, 15),
  },
};

export const UncontrolledWithDropdownOptions: Story = {
  ...UncontrolledWithChildrenTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "one" },
  },
};

export const UncontrolledWithDisabled: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "tdy" },
    disabled: true,
  },
};

export const UncontrolledDefaultWithYearNavigation: Story = {
  ...UncontrolledTemplate,
  args: {
    enableYearNavigation: true,
  },
};

export const ControlledDefault: Story = {
  ...ControlledTemplate,
  args: {},
};

export const ControlledWithDefaultDateRange: Story = {
  ...ControlledTemplate,
  args: {
    value: { from: new Date(2022, 10, 1), to: new Date() },
  },
};

export const ControlledWithDefaultSelectOption: Story = {
  ...ControlledTemplate,
  args: {
    value: { from: undefined, to: undefined, selectValue: "t" },
  },
};

export const ControlledWithDefaultValue: Story = {
  ...ControlledTemplate,
  args: {
    value: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "t" },
  },
};

export const UncontrolledWithoutEnableClear: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
    enableClear: false,
  },
};

export const UncontrolledWithWeekStartsOnTuesday: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
    weekStartsOn: 2,
  },
};
