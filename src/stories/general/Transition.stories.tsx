import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
  DatePicker,
  DateRangePicker,
  MultiSelect,
  MultiSelectItem,
  NumberInput,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "components";

const meta: Meta<typeof DatePicker> = {
  title: "General",
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Stories
export const Transition: Story = {
  render: () => {
    return (
      <div className="space-y-4 max-w-sm">
        <DatePicker />
        <DateRangePicker />
        <Select>
          <SelectItem value="1">Item 1</SelectItem>
          <SelectItem value="2">Item 2</SelectItem>
        </Select>
        <SearchSelect>
          <SearchSelectItem value="1">Item 1</SearchSelectItem>
          <SearchSelectItem value="2">Item 2</SearchSelectItem>
        </SearchSelect>
        <MultiSelect>
          <MultiSelectItem value="1">Item 1</MultiSelectItem>
          <MultiSelectItem value="2">Item 2</MultiSelectItem>
        </MultiSelect>
        <NumberInput />
        <TextInput />
      </div>
    );
  },
};
