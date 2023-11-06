import React from "react";

import { CalendarIcon } from "assets";
import { Button, Select, SelectItem } from "components";

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
    alert(newValue);
  };

  const handleReset = () => {
    setValue("");
  };

  const handleSetToOne = () => {
    setValue("1");
  };

  return (
    <div className="space-y-4">
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
