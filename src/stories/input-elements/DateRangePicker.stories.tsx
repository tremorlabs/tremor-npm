import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, DateRangePicker, DateRangePickerValue, Text, Title } from "components";
import { dateRangePickerData } from "stories/input-elements/helpers/testData";
import { fr } from "date-fns/locale";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/DateRangePicker",
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const UncontrolledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>([null, null]);
  const startDate = value?.[0];
  const endDate = value?.[1];

  return (
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
  );
};

const ControlledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>(args.value!);

  const startDate = value[0];
  const endDate = value[1];

  return (
    <Card>
      <DateRangePicker {...args} value={value} onValueChange={(v) => setValue(v)} />
      <Button
        onClick={() => {
          setValue([null, null]);
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          setValue([null, null, "tdy"]);
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
};

export const UncontrolledDefault = UncontrolledTemplate.bind({});

export const UncontrolledWithDefaultDateRange = UncontrolledTemplate.bind({});
UncontrolledWithDefaultDateRange.args = {
  defaultValue: [new Date(2022, 10, 1), new Date()],
};

export const UncontrolledWithDefaultFrLocale = UncontrolledTemplate.bind({});
UncontrolledWithDefaultFrLocale.args = {
  locale: fr,
  dropdownPlaceholder: "Sélectionnez",
  placeholder: "Sélectionnez...",
};

export const UncontrolledWithDefaultSelectOption = UncontrolledTemplate.bind({});
UncontrolledWithDefaultSelectOption.args = {
  defaultValue: [undefined, undefined, "tdy"],
};

export const UncontrolledWithDefaultValue = UncontrolledTemplate.bind({});
UncontrolledWithDefaultValue.args = {
  defaultValue: [new Date(2022, 10, 1), new Date()],
};

export const UncontrolledWithDropdownOptions = UncontrolledTemplate.bind({});
UncontrolledWithDropdownOptions.args = {
  defaultValue: [new Date(2022, 10, 1), new Date(), "tdy"],
  options: [
    {
      value: "tdy",
      text: "tdy",
      startDate: new Date(2022, 11, 1),
    },
    {
      value: "a",
      text: "a",
      startDate: new Date(2023, 0, 1),
    },
  ],
};

export const UncontrolledWithDropdownOptionsWithEndDate = UncontrolledTemplate.bind({});
UncontrolledWithDropdownOptionsWithEndDate.args = {
  defaultValue: [new Date(2022, 10, 1), new Date(), "tdy"],
  options: [
    {
      value: "tdy",
      text: "tdy",
      startDate: new Date(2022, 11, 1),
      endDate: new Date(2022, 11, 30),
    },
    {
      value: "a",
      text: "a",
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 0, 30),
    },
  ],
};

export const UncontrolledWithYearPaginationEnabled = UncontrolledTemplate.bind({});
UncontrolledWithYearPaginationEnabled.args = {
  defaultValue: [new Date(2022, 10, 1), new Date(), "tdy"],
  enableYearPagination: true,
};

export const UncontrolledWithDisabled = UncontrolledTemplate.bind({});
UncontrolledWithDisabled.args = {
  defaultValue: [new Date(2022, 10, 1), new Date(), "tdy"],
  disabled: true,
};

export const ControlledDefault = ControlledTemplate.bind({});

export const ControlledWithDefaultDateRange = ControlledTemplate.bind({});
ControlledWithDefaultDateRange.args = {
  value: [new Date(2022, 10, 1), new Date()],
};

export const ControlledWithDefaultSelectOption = ControlledTemplate.bind({});
ControlledWithDefaultSelectOption.args = {
  value: [undefined, undefined, "t"],
};

export const ControlledWithDefaultValue = ControlledTemplate.bind({});
ControlledWithDefaultValue.args = {
  value: [new Date(2022, 10, 1), new Date(), "t"],
};

export const ControlledWithDropdownOptions = ControlledTemplate.bind({});
ControlledWithDropdownOptions.args = {
  value: [new Date(2022, 10, 1), new Date(), "tdy"],
  options: [
    {
      value: "tdy",
      text: "tdy",
      startDate: new Date(2022, 11, 1),
    },
    {
      value: "a",
      text: "a",
      startDate: new Date(2023, 0, 1),
    },
  ],
};

export const ControlledWithDropdownOptionsWithEndDate = ControlledTemplate.bind({});
ControlledWithDropdownOptionsWithEndDate.args = {
  value: [new Date(2022, 5, 1), new Date(), "tdy"],
  options: [
    {
      value: "tdy",
      text: "tdy",
      startDate: new Date(2022, 11, 1),
      endDate: new Date(2022, 11, 30),
    },
    {
      value: "a",
      text: "a",
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 0, 30),
    },
  ],
};

export const UncontrolledWithoutAllowClear = UncontrolledTemplate.bind({});
UncontrolledWithoutAllowClear.args = {
  defaultValue: [new Date(2022, 10, 1), new Date()],
  enableClear: false,
};
