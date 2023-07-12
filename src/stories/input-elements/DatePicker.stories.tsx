import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, DatePicker, Text, Title } from "components";
import { fr } from "date-fns/locale";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const UncontrolledTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState<Date>();

  return (
    <div className="space-y-4">
      <Card>
        <DatePicker {...args} onValueChange={(value: Date | undefined) => setValue(value)} />
        <Title>Filtered Data</Title>
        <Text>Date: {String(value)} </Text>
      </Card>
    </div>
  );
};

const ControlledTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState<Date | undefined>(args.value!);

  return (
    <Card>
      <DatePicker {...args} value={value} onValueChange={(v: Date | undefined) => setValue(v)} />
      <Button
        onClick={() => {
          setValue(undefined);
        }}
      >
        Reset
      </Button>
      <Title>Filtered Data</Title>
    </Card>
  );
};

export const UncontrolledDefault = UncontrolledTemplate.bind({});

export const UncontrolledWithDefaultDate = UncontrolledTemplate.bind({});
UncontrolledWithDefaultDate.args = {
  defaultValue: new Date(2022, 10, 1),
};

export const UncontrolledWithDefaultFrLocale = UncontrolledTemplate.bind({});
UncontrolledWithDefaultFrLocale.args = {
  locale: fr,
  placeholder: "Sélectionnez...",
};

export const UncontrolledWithDefaultValue = UncontrolledTemplate.bind({});
UncontrolledWithDefaultValue.args = {
  defaultValue: new Date(2022, 10, 1),
};

export const UncontrolledWithMinMax = UncontrolledTemplate.bind({});
UncontrolledWithMinMax.args = {
  defaultValue: new Date(2022, 10, 1),
  minDate: new Date(2023, 4, 1),
  maxDate: new Date(2023, 4, 15),
};

export const UncontrolledWithDisabled = UncontrolledTemplate.bind({});
UncontrolledWithDisabled.args = {
  defaultValue: new Date(2022, 10, 1),
  disabled: true,
};

export const ControlledDefault = ControlledTemplate.bind({});

export const ControlledWithDefaultDate = ControlledTemplate.bind({});
ControlledWithDefaultDate.args = {
  value: new Date(2022, 10, 1),
};

export const UncontrolledWithoutAllowClear = UncontrolledTemplate.bind({});
UncontrolledWithoutAllowClear.args = {
  defaultValue: new Date(2022, 10, 1),
  enableClear: false,
};
