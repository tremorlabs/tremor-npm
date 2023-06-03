import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

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
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/DateRangePicker",
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const UncontrolledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
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
};

const UncontrolledWithChildrenTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
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
};

const ControlledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
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
};

export const UncontrolledDefault = UncontrolledTemplate.bind({});

export const UncontrolledWithDefaultDateRange = UncontrolledTemplate.bind({});
UncontrolledWithDefaultDateRange.args = {
  defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
};

export const UncontrolledWithDefaultFrLocale = UncontrolledTemplate.bind({});
UncontrolledWithDefaultFrLocale.args = {
  locale: fr,
  selectPlaceholder: "Sélectionnez",
  placeholder: "Sélectionnez...",
};

export const UncontrolledWithDefaultSelectOption = UncontrolledTemplate.bind({});
UncontrolledWithDefaultSelectOption.args = {
  defaultValue: { selectValue: "tdy" },
};

export const UncontrolledWithDefaultValue = UncontrolledTemplate.bind({});
UncontrolledWithDefaultValue.args = {
  defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
};

export const UncontrolledWithSelectDisabled = UncontrolledTemplate.bind({});
UncontrolledWithSelectDisabled.args = {
  defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
  enableSelect: false,
};

export const UncontrolledWithMinMax = UncontrolledTemplate.bind({});
UncontrolledWithMinMax.args = {
  defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
  minDate: new Date(2023, 4, 1),
  maxDate: new Date(2023, 4, 15),
};

export const UncontrolledWithDropdownOptions = UncontrolledWithChildrenTemplate.bind({});
UncontrolledWithDropdownOptions.args = {
  defaultValue: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "one" },
};

export const UncontrolledWithDisabled = UncontrolledTemplate.bind({});
UncontrolledWithDisabled.args = {
  defaultValue: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "tdy" },
  disabled: true,
};

export const ControlledDefault = ControlledTemplate.bind({});

export const ControlledWithDefaultDateRange = ControlledTemplate.bind({});
ControlledWithDefaultDateRange.args = {
  value: { from: new Date(2022, 10, 1), to: new Date() },
};

export const ControlledWithDefaultSelectOption = ControlledTemplate.bind({});
ControlledWithDefaultSelectOption.args = {
  value: { from: undefined, to: undefined, selectValue: "t" },
};

export const ControlledWithDefaultValue = ControlledTemplate.bind({});
ControlledWithDefaultValue.args = {
  value: { from: new Date(2022, 10, 1), to: new Date(), selectValue: "t" },
};

export const UncontrolledWithoutAllowClear = UncontrolledTemplate.bind({});
UncontrolledWithoutAllowClear.args = {
  defaultValue: { from: new Date(2022, 10, 1), to: new Date() },
  enableClear: false,
};
