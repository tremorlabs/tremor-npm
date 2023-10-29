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

export const SimpleSelectControlled = (args: any) => {
  const [value, setValue] = React.useState<string>("5");
  return (
    <div className="space-y-4">
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
        {...args}
      >
        <SelectItem value={"1"}>One</SelectItem>
        <SelectItem value={"2"}>Two</SelectItem>
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"4"}>Four</SelectItem>
        <SelectItem value={"5"}>Five</SelectItem>
        <SelectItem value={"6"}>Six</SelectItem>
        <SelectItem value={"7"}>Seven</SelectItem>
        <SelectItem value={"8"}>Eight</SelectItem>
        <SelectItem value={"9"}>Nine</SelectItem>
        <SelectItem value={"10"}>Ten</SelectItem>
      </Select>
      <Button onClick={() => setValue("")}>Reset</Button>
      <Button onClick={() => setValue("1")}>Set to One</Button>
      <p>value: {value}</p>
    </div>
  );
};
