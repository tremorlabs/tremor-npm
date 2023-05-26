import React from "react";
import { render } from "@testing-library/react";

import MultiSelect from "components/input-elements/MultiSelect/MultiSelect";
import MultiSelectItem from "components/input-elements/MultiSelect/MultiSelectItem";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <MultiSelect>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );
  });
});
