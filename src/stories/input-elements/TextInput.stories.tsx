import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button, Card, Text, TextInput } from "components";
import { CalendarIcon } from "assets";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/TextInput",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof TextInput> = (args) => {
  const [value, setValue] = useState("");
  return (
    <div>
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
      <Card className="bg-gray-950">
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
    </div>
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
  value: "Hello",
};

export const WithError = Template.bind({});
WithError.args = {
  value: "Hello",
  error: true,
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  value: "Hello",
  error: true,
  errorMessage: "Something is wrong",
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  value: "Hello",
  disabled: true,
};

export const WithDisabledAndError = Template.bind({});
WithDisabledAndError.args = {
  value: "Hello",
  error: true,
  disabled: true,
};

export const WithTypePassword = Template.bind({});
WithTypePassword.args = {
  type: "password",
};
