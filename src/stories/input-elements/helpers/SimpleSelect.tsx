import React from "react";

import { CalendarIcon } from "assets";
import { Button, Select, SelectItem, TextInput } from "components";

export const SimpleSelect = (args: any) => (
  <Select {...args}>
    <SelectItem value={"5"} icon={CalendarIcon}>
      Very Long SelectItem Value as an edge case
    </SelectItem>
    <SelectItem value="3" icon={CalendarIcon}>
      Three
    </SelectItem>
    <SelectItem value={"1"} icon={CalendarIcon}>
      One
    </SelectItem>
  </Select>
);

export const SimpleSelectWithStaticAndDynamicChildren = (args: any) => {
  const items = ["item1", "item2"];
  return (
    <Select {...args}>
      <SelectItem value="item0">item0</SelectItem>
      {items.map((item) => {
        return <SelectItem value={item} key={item} />;
      })}
    </Select>
  );
};

export function SimpleSelectControlled() {
  const [value, setValue] = React.useState("5");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleReset = () => {
    setValue("");
  };

  const handleSetToOne = () => {
    setValue("1");
  };

  return (
    <div className="space-y-4">
      <Select enableClear={true} value={value} onValueChange={handleValueChange}>
        <SelectItem value="1">One</SelectItem>
        <SelectItem value="2">Two</SelectItem>
        <SelectItem value="3">Three</SelectItem>
        <SelectItem value="4">Four</SelectItem>
        <SelectItem value="5">Five</SelectItem>
        <SelectItem value="6">Six</SelectItem>
        <SelectItem value="7">Seven</SelectItem>
        <SelectItem value="8">Eight</SelectItem>
        <SelectItem value="9">Nine</SelectItem>
        <SelectItem value="10">Ten</SelectItem>
      </Select>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectItem value="1">One</SelectItem>
        <SelectItem value="2">Two</SelectItem>
        <SelectItem value="3">Three</SelectItem>
        <SelectItem value="4">Four</SelectItem>
        <SelectItem value="5">Five</SelectItem>
        <SelectItem value="6">Six</SelectItem>
        <SelectItem value="7">Seven</SelectItem>
        <SelectItem value="8">Eight</SelectItem>
        <SelectItem value="9">Nine</SelectItem>
        <SelectItem value="10">Ten</SelectItem>
      </Select>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleSetToOne}>Set to One</Button>
      <p>value: {value}</p>
    </div>
  );
}

export const SimpleSelectForm = (args: any) => {
  return (
    <form
      className="flex flex-col gap-3 items-start max-w-md"
      method="GET"
      action="http://localhost:6006/"
    >
      <label htmlFor="path" className="w-full">
        <p>Redirect path</p>
        <TextInput name="path" id="path" defaultValue="/story/ui-input-select--form" />
      </label>
      <label htmlFor="select-test">Label</label>
      <Select enableClear={true} {...args} name="select" id="select-test">
        <SelectItem value={"5"}>Five</SelectItem>
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>
      <Button type="submit">Submit</Button>
      <p>You will find your selected value in the URL params after submiting the form</p>
    </form>
  );
};
