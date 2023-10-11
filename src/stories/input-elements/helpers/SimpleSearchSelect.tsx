import React from "react";

import { Button, SearchSelect, SearchSelectItem } from "components";
import { CalendarIcon } from "assets";

const MyIcon = CalendarIcon;

export const SimpleSearchSelect = (args: any) => (
  <SearchSelect {...args}>
    <SearchSelectItem value="5" icon={MyIcon}>
      Very Long DropdownItem Value as an edge case
    </SearchSelectItem>
    <SearchSelectItem value="Three" icon={MyIcon} />
    <SearchSelectItem value="1" icon={MyIcon}>
      One
    </SearchSelectItem>
  </SearchSelect>
);

export const SimpleSearchSelectControlled = (args: any) => {
  const [value, setValue] = React.useState<string>("5");
  return (
    <div className="space-y-4">
      <SearchSelect
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
        {...args}
      >
        <SearchSelectItem value={"5"}>Five</SearchSelectItem>
        <SearchSelectItem value={"3"}>Three</SearchSelectItem>
        <SearchSelectItem value={"1"}>One</SearchSelectItem>
        <SearchSelectItem value={"30"}>Thirty</SearchSelectItem>
        <SearchSelectItem value={"33"}>Thirtythree</SearchSelectItem>
      </SearchSelect>
      <Button onClick={() => setValue("")}>Reset</Button>
      <Button onClick={() => setValue("1")}>One</Button>
      <p className="text-slate-500">{value}</p>
    </div>
  );
};
