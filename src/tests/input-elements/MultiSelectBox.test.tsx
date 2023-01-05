import React from "react";
import { render } from "@testing-library/react";

import MultiSelectBox from "components/input-elements/MultiSelectBox/MultiSelectBox";
import MultiSelectBoxItem from "components/input-elements/MultiSelectBox/MultiSelectBoxItem";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <MultiSelectBox>
        <MultiSelectBoxItem value={1} text="Option One" />
        <MultiSelectBoxItem value={2} text="Option Two" />
        <MultiSelectBoxItem value={3} text="Option Three" />
      </MultiSelectBox>
    );
  });
});
