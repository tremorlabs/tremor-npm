import React from "react";
import { render } from "@testing-library/react";

import MultiSelectBox from "components/input-elements/MultiSelectBox/MultiSelectBox";
import MultiSelectBoxItem from "components/input-elements/MultiSelectBox/MultiSelectBoxItem";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <MultiSelectBox>
        <MultiSelectBoxItem value="1" />
        <MultiSelectBoxItem value="2">Option Two</MultiSelectBoxItem>
        <MultiSelectBoxItem value="3">Option Three</MultiSelectBoxItem>
      </MultiSelectBox>,
    );
  });
});
