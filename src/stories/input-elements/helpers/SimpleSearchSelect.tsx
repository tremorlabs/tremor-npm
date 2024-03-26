import React from "react";

import { CalendarIcon } from "assets";
import { Button, SearchSelect, SearchSelectItem, TextInput } from "components";

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

export const SimpleSearchSelectForm = (args: any) => {
  return (
    <form
      className="flex flex-col gap-3 items-start max-w-md"
      method="GET"
      action="http://localhost:6006/"
    >
      <label htmlFor="path" className="w-full">
        <p>Redirect path</p>
        <TextInput name="path" id="path" defaultValue="/story/ui-input-searchselect--form" />
      </label>
      <label htmlFor="search-select-test">Label</label>
      <SearchSelect {...args} id="search-select-test" name="Searchselect">
        <SearchSelectItem value={"5"}>Five</SearchSelectItem>
        <SearchSelectItem value={"3"}>Three</SearchSelectItem>
        <SearchSelectItem value={"1"}>One</SearchSelectItem>
      </SearchSelect>
      <Button type="submit">Submit</Button>
      <p>You will find your selected value in the URL params after submiting the form</p>
    </form>
  );
};

export function SimpleSearchSelectControlled() {
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
      <SearchSelect value={value} onValueChange={handleValueChange}>
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
      <SearchSelect enableClear={false} value={value} onValueChange={handleValueChange}>
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
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={handleSetToOne}>Set to One</Button>
      <p>value: {value}</p>
    </div>
  );
}

export function SimpleSearchSelectServerSideRendering() {
  const [searchQuery, setSearchQuery] = React.useState("");

  interface User {
    id: number;
    name: string;
    email: string;
  }
  const [options, setOptions] = React.useState<User[]>([]);

  const [value, setValue] = React.useState<string>();

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleReset = () => {
    setValue("");
  };

  React.useEffect(() => {
    if (searchQuery) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          setOptions(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <SearchSelect
        value={value}
        onValueChange={handleValueChange}
        searchValue={searchQuery}
        onSearchValueChange={handleSearchQueryChange}
      >
        {options.map((option) => (
          <SearchSelectItem key={option.id} value={option.id.toString()}>
            {`${option.name} (${option.email})`}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      <Button onClick={handleReset}>Reset</Button>
      <p>Selected User ID: {value}</p>
    </div>
  );
}
