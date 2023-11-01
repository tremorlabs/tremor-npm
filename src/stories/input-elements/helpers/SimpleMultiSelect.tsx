import React from "react";

import { Button, MultiSelect, MultiSelectItem } from "components";

export const SimpleMultiSelect = (args: any) => (
  <MultiSelect {...args}>
    <MultiSelectItem value={"5"}>Very Long DropdownItem Value as an edge case</MultiSelectItem>
    <MultiSelectItem value="Three" />
    <MultiSelectItem value={"1"}>One</MultiSelectItem>
  </MultiSelect>
);

export const SimpleMultiSelectControlled = (args: any) => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <>
      <MultiSelect
        value={value}
        onValueChange={(values) => {
          setValue(values);
          alert(values);
        }}
        {...args}
      >
        <MultiSelectItem value={"5"}>Five</MultiSelectItem>
        <MultiSelectItem value={"3"}>Three</MultiSelectItem>
        <MultiSelectItem value={"1"}>One</MultiSelectItem>
      </MultiSelect>
      <Button onClick={() => setValue([])}>Reset</Button>
      <Button onClick={() => setValue(["1"])}>Set to One</Button>
      <p>value: {value}</p>
    </>
  );
};
