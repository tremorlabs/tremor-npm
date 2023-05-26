import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CheckBox from "components/input-elements/CheckBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/InputElements/CheckBox",
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox
    className="form-checkbox cursor-pointer h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
    {...args}
  />
);

const baseArgs = { label: "Checkbox" };

export const Default = Template.bind({});
Default.args = baseArgs;

export const Checked = Template.bind({});
Checked.args = {
  ...baseArgs,
  checked: true,
};

export const DefaultChecked = Template.bind({});
DefaultChecked.args = {
  ...baseArgs,
  defaultChecked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...baseArgs,
  disabled: true,
};
