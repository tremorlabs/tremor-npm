import React from "react";

import { Button, MultiSelect, MultiSelectItem } from "components";

export const SimpleMultiSelect = (args: any) => (
  <MultiSelect {...args}>
    <MultiSelectItem value={"5"}>Very Long DropdownItem Value as an edge case</MultiSelectItem>
    <MultiSelectItem value="Three" />
    <MultiSelectItem value={"1"}>One</MultiSelectItem>
  </MultiSelect>
);

export const SimpleMultiSelectWithStaticAndDynamicChildren = (args: any) => {
  const items = ["item1", "item2"];
  return (
    <MultiSelect {...args}>
      <MultiSelectItem value="item0">item0</MultiSelectItem>
      {items.map((item) => {
        return <MultiSelectItem value={item} key={item} />;
      })}
    </MultiSelect>
  );
};

export const SimpleMultiSelectForm = (args: any) => {
  return (
    <form className="flex flex-col gap-3 items-start" method="GET" action="http://localhost:6006/">
      <label htmlFor="multi-select-test" className="mb-5">
        Label
      </label>
      <MultiSelect {...args} id="multi-select-test" name="MultiSelect" required className="w-1/2">
        <MultiSelectItem value={"5"}>Five</MultiSelectItem>
        <MultiSelectItem value={"3"}>Three</MultiSelectItem>
        <MultiSelectItem value={"1"}>One</MultiSelectItem>
      </MultiSelect>
      <Button type="submit">Submit</Button>
      <p>{"You'll find your selected value in the URL params after submiting the form"}</p>
    </form>
  );
};

export const SimpleMultiSelectControlled = () => {
  const [value, setValue] = React.useState<string[]>([]);

  const handleValueChange = (values: string[]) => {
    setValue(values);
  };

  const handleReset = () => {
    setValue([]);
  };

  const handleSetToOne = () => {
    setValue(["1"]);
  };

  return (
    <div className="space-y-2">
      <MultiSelect value={value} onValueChange={handleValueChange}>
        <MultiSelectItem value="1">One</MultiSelectItem>
        <MultiSelectItem value="2">Two</MultiSelectItem>
        <MultiSelectItem value="3">Three</MultiSelectItem>
        <MultiSelectItem value="4">Four</MultiSelectItem>
        <MultiSelectItem value="5">Five</MultiSelectItem>
        <MultiSelectItem value="6">Six</MultiSelectItem>
        <MultiSelectItem value="7">Seven</MultiSelectItem>
        <MultiSelectItem value="8">Eight</MultiSelectItem>
        <MultiSelectItem value="9">Nine</MultiSelectItem>
        <MultiSelectItem value="10">Ten</MultiSelectItem>
      </MultiSelect>
      <MultiSelect value={value} onValueChange={handleValueChange}>
        <MultiSelectItem value="1">One</MultiSelectItem>
        <MultiSelectItem value="2">Two</MultiSelectItem>
        <MultiSelectItem value="3">Three</MultiSelectItem>
        <MultiSelectItem value="4">Four</MultiSelectItem>
        <MultiSelectItem value="5">Five</MultiSelectItem>
        <MultiSelectItem value="6">Six</MultiSelectItem>
        <MultiSelectItem value="7">Seven</MultiSelectItem>
        <MultiSelectItem value="8">Eight</MultiSelectItem>
        <MultiSelectItem value="9">Nine</MultiSelectItem>
        <MultiSelectItem value="10">Ten</MultiSelectItem>
      </MultiSelect>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleSetToOne}>Set to One</Button>
      <p>value: {value.join(", ")}</p>
    </div>
  );
};
