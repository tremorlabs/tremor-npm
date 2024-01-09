import React from "react";

import { CalendarIcon } from "assets";
import { Button, SearchSelect, SearchSelectItem } from "components";

export const SimpleSearchSelect = (args: any) => (
  <SearchSelect {...args}>
    <SearchSelectItem value="5" icon={CalendarIcon}>
      Very Long DropdownItem Value as an edge case
    </SearchSelectItem>
    <SearchSelectItem value="Three" icon={CalendarIcon} />
    <SearchSelectItem value="1" icon={CalendarIcon}>
      One
    </SearchSelectItem>
  </SearchSelect>
);

export const SimpleSearchSelectWithStaticAndDynamicChildren = (args: any) => {
  const items = ["item1", "item2"];
  return (
    <SearchSelect {...args}>
      <SearchSelectItem value="item0">item0</SearchSelectItem>
      {items.map((item) => {
        return <SearchSelectItem value={item} key={item} />;
      })}
    </SearchSelect>
  );
};

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
        <SearchSelectItem value="1">One</SearchSelectItem>
        <SearchSelectItem value="2">Two</SearchSelectItem>
        <SearchSelectItem value="3">Three</SearchSelectItem>
        <SearchSelectItem value="4">Four</SearchSelectItem>
        <SearchSelectItem value="5">Five</SearchSelectItem>
        <SearchSelectItem value="6">Six</SearchSelectItem>
        <SearchSelectItem value="7">Seven</SearchSelectItem>
        <SearchSelectItem value="8">Eight</SearchSelectItem>
        <SearchSelectItem value="9">Nine</SearchSelectItem>
        <SearchSelectItem value="10">Ten</SearchSelectItem>
      </SearchSelect>
      <SearchSelect
        value={value}
        onValueChange={(value) => {
          setValue(value);
          alert(value);
        }}
        {...args}
      >
        <SearchSelectItem value="1">One</SearchSelectItem>
        <SearchSelectItem value="2">Two</SearchSelectItem>
        <SearchSelectItem value="3">Three</SearchSelectItem>
        <SearchSelectItem value="4">Four</SearchSelectItem>
        <SearchSelectItem value="5">Five</SearchSelectItem>
        <SearchSelectItem value="6">Six</SearchSelectItem>
        <SearchSelectItem value="7">Seven</SearchSelectItem>
        <SearchSelectItem value="8">Eight</SearchSelectItem>
        <SearchSelectItem value="9">Nine</SearchSelectItem>
        <SearchSelectItem value="10">Ten</SearchSelectItem>
      </SearchSelect>
      <Button onClick={() => setValue("")}>Reset</Button>
      <Button onClick={() => setValue("1")}>One</Button>
      <p>value: {value}</p>
    </div>
  );
};
