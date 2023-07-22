import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, Text, NumberInput } from "components";
import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/NumberInput",
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof NumberInput> = (args) => {
  const [value, setValue] = useState(0);
  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onReset={() => setValue(0)}
      >
        <Text>Uncontrolled</Text>
        <NumberInput {...args} onSubmit={(value: number) => alert(value)} />
        <Text>Uncontrolled with defaultValue</Text>
        <NumberInput {...args} defaultValue={123} onSubmit={(value: number) => alert(value)} />
        <Text>Conrolled without onChange</Text>
        <NumberInput {...args} value={value} onSubmit={(value: number) => alert(value)} />
        <label htmlFor="a">
          <Text>Controlled</Text>
        </label>
        <NumberInput
          {...args}
          id={"a"}
          value={value}
          onValueChange={(e) => setValue(e)}
          onSubmit={(value: number) => alert(value)}
        />
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
};

export const Default = Template.bind({});
Default.args = {};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: CalendarIcon,
};

export const WithNoPlaceholder = Template.bind({});
WithNoPlaceholder.args = {
  placeholder: "",
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  value: 123,
};

export const WithStepAttribute = Template.bind({});
WithStepAttribute.args = {
  step: ".1",
};

export const WithMinMaxAttribute = Template.bind({});
WithMinMaxAttribute.args = {
  min: "2",
  max: "10",
};

export const WithError = Template.bind({});
WithError.args = {
  value: 123,
  error: true,
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  value: 123,
  error: true,
  errorMessage: "Something is wrong",
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  value: 123,
  disabled: true,
};

export const WithDisabledAndError = Template.bind({});
WithDisabledAndError.args = {
  value: 123,
  error: true,
  disabled: true,
};
