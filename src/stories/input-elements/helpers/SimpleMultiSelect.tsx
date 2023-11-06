import React from "react";

import { Button, MultiSelect, MultiSelectItem } from "components";

export const SimpleMultiSelect = (args: any) => (
  <MultiSelect {...args}>
    <MultiSelectItem value={"5"}>Very Long DropdownItem Value as an edge case</MultiSelectItem>
    <MultiSelectItem value="Three" />
    <MultiSelectItem value={"1"}>One</MultiSelectItem>
  </MultiSelect>
);

export const SimpleMultiSelectControlled = () => {
  const [value, setValue] = React.useState<string[]>([]);

  const handleValueChange = (values: string[]) => {
    setValue(values);
    // You can perform any additional actions here when the value changes.
  };

  const handleReset = () => {
    setValue([]);
  };

  const handleSetToOne = () => {
    setValue(["1"]);
  };

  return (
    <div>
      <MultiSelect
        value={value}
        onValueChange={handleValueChange}
        // Add any other props you need
      >
        <MultiSelectItem value={"5"}>Five</MultiSelectItem>
        <MultiSelectItem value={"3"}>Three</MultiSelectItem>
        <MultiSelectItem value={"1"}>One</MultiSelectItem>
      </MultiSelect>
      <MultiSelect
        value={value}
        onValueChange={handleValueChange}
        // Add any other props you need
      >
        <MultiSelectItem value={"5"}>Five</MultiSelectItem>
        <MultiSelectItem value={"3"}>Three</MultiSelectItem>
        <MultiSelectItem value={"1"}>One</MultiSelectItem>
      </MultiSelect>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleSetToOne}>Set to One</Button>
      <p>value: {value.join(", ")}</p>
    </div>
  );
};

export default SimpleMultiSelectControlled;
