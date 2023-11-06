import { render } from "@testing-library/react";
import React from "react";

import MultiSelect from "components/input-elements/MultiSelect/MultiSelect";
import MultiSelectItem from "components/input-elements/MultiSelect/MultiSelectItem";

describe("MultiSelect", () => {
  test("renders the MultiSelect component with default props", () => {
    render(
      <MultiSelect>
        <MultiSelectItem value="1" />
        <MultiSelectItem value="2">Option Two</MultiSelectItem>
        <MultiSelectItem value="3">Option Three</MultiSelectItem>
      </MultiSelect>,
    );
  });
});
