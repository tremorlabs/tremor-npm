import React, { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Card,
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
  Text,
  Title,
} from "components";
import { dateRangePickerData } from "stories/input-elements/helpers/testData";
import { fr } from "date-fns/locale";

const meta: Meta<typeof DateRangePicker> = {
  title: "Tremor/InputElements/DateRangePicker",
  component: DateRangePicker,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

function Uncontrolled({ ...args }) {
  const [value, setValue] = useState<DateRangePickerValue>({});
  const startDate = value.from;
  const endDate = value.to;

  return (
    <div className="space-y-4">
      <Card>
        <DateRangePicker {...args} onValueChange={(value) => setValue(value)} />
        <Title>Filtered Data</Title>
        <Text>StartDate: {String(startDate)} </Text>
        <Text>EndDate: {String(endDate)} </Text>
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
      </Card>
    </div>
  );
}

const UncontrolledTemplate: Story = {
  render: ({ ...args }) => <Uncontrolled {...args} />,
};

function UncontrolledWithChildren({ ...args }) {
  const [value, setValue] = useState<DateRangePickerValue>({});
  const startDate = value.from;
  const endDate = value.to;

  return (
    <Card>
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
      <Title>Filtered Data</Title>
      <Text>StartDate: {String(startDate)} </Text>
      <Text>EndDate: {String(endDate)} </Text>
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
    </Card>
  );
}

const UncontrolledWithChildrenTemplate: Story = {
  render: ({ ...args }) => <UncontrolledWithChildren {...args} />,
};

function Controlled({ ...args }) {
  const [value, setValue] = useState<DateRangePickerValue>(args.value!);

  const startDate = value?.from;
  const endDate = value?.to;

  return (
    <Card>
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
      <Title>Filtered Data</Title>
      <Text>StartDate: {String(startDate)} </Text>
      <Text>EndDate: {String(endDate)} </Text>
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
    </Card>
  );
}

const ControlledTemplate: Story = {
  render: ({ ...args }) => <Controlled {...args} />,
};

export const UncontrolledDefaultExample: Story = {
  ...UncontrolledTemplate,
};

export const UncontrolledWithDefaultDateRangeExample: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
  },
};

export const UncontrolledWithDefaultFrLocaleExample: Story = {
  ...UncontrolledTemplate,
  args: {
    locale: fr,
    selectPlaceholder: "Sélectionnez",
    placeholder: "Sélectionnez...",
  },
};

export const UncontrolledWithDefaultSelectOptionExample: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { selectValue: "tdy" },
  },
};

export const UncontrolledWithDefaultValueExample: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
  },
};

export const UncontrolledWithSelectDisabledExample: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
    enableSelect: false,
  },
};

export const UncontrolledWithMinMaxExample: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
    minDate: new Date(2023, 4, 1),
    maxDate: new Date(2023, 4, 15),
  },
};

export const UncontrolledWithDropdownOptionsExample: Story = {
  ...UncontrolledWithChildrenTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "one" },
  },
};

export const UncontrolledWithDisabledExample: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "tdy" },
    disabled: true,
  },
};

export const UncontrolledWithoutAllowClearExample: Story = {
  ...UncontrolledTemplate,
  args: {
    defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
    enableClear: false,
  },
};

export const ControlledDefaultExample: Story = {
  ...ControlledTemplate,
};

export const ControlledWithDefaultDateRangeExample: Story = {
  ...ControlledTemplate,
  args: {
    value: { from: new Date(2022, 10, 1), to: new Date() },
  },
};

export const ControlledWithDefaultSelectOptionExample: Story = {
  ...ControlledTemplate,
  args: {
    value: { from: undefined, to: undefined, selectValue: "t" },
  },
};

export const ControlledWithDefaultValueExample: Story = {
  ...ControlledTemplate,
  args: {
    value: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "t" },
  },
};
