import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, SingleDatePicker, Text, Title } from "components";
import { fr } from "date-fns/locale";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/SingleDatePicker",
  component: SingleDatePicker,
} as ComponentMeta<typeof SingleDatePicker>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const UncontrolledTemplate: ComponentStory<typeof SingleDatePicker> = (args) => {
  const [value, setValue] = useState<Date>();

  return (
    <div className="space-y-4">
      <Card>
        <SingleDatePicker {...args} onValueChange={setValue} />
        <Title>Date:</Title>
        <Text>{value?.toDateString()}</Text>
      </Card>
    </div>
  );
};

const ControlledTemplate: ComponentStory<typeof SingleDatePicker> = (args) => {
  const [value, setValue] = useState<Date | undefined>(args.value);

  return (
    <Card>
      <SingleDatePicker {...args} value={value} onValueChange={setValue} />
      <Button
        onClick={() => {
          setValue(undefined);
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          setValue(new Date());
        }}
      >
        Today
      </Button>
      <Title>Filtered Data</Title>
    </Card>
  );
};

const defaultValue = new Date(2022, 10, 1);
export const UncontrolledDefault = UncontrolledTemplate.bind({});

export const UncontrolledWithDefaultFrLocale = UncontrolledTemplate.bind({});
UncontrolledWithDefaultFrLocale.args = {
  locale: fr,
  placeholder: "Sélectionnez...",
};

export const UncontrolledWithDefaultValue = UncontrolledTemplate.bind({});
UncontrolledWithDefaultValue.args = {
  defaultValue,
};

export const UncontrolledWithMinMax = UncontrolledTemplate.bind({});
UncontrolledWithMinMax.args = {
  defaultValue: new Date(2023, 10, 1),
  minDate: new Date(2023, 4, 1),
  maxDate: new Date(2023, 4, 15),
};

export const UncontrolledWithDisabled = UncontrolledTemplate.bind({});
UncontrolledWithDisabled.args = {
  defaultValue,
  disabled: true,
};

export const ControlledDefault = ControlledTemplate.bind({});

export const ControlledWithDefaultValue = ControlledTemplate.bind({});
ControlledWithDefaultValue.args = {
  value: defaultValue,
};
