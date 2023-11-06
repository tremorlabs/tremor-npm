import { render } from "@testing-library/react";
import React from "react";

import SearchSelect from "components/input-elements/SearchSelect/SearchSelect";
import SearchSelectItem from "components/input-elements/SearchSelect/SearchSelectItem";

describe("SearchSelect", () => {
  test("renders the SearchSelect component with default props", () => {
    render(
      <SearchSelect>
        <SearchSelectItem value="1" />
        <SearchSelectItem value="2">Option Two</SearchSelectItem>
        <SearchSelectItem value="3">Option Three</SearchSelectItem>
      </SearchSelect>,
    );
  });
});
