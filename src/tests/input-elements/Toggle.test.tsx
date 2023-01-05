import React from "react";
import { render } from "@testing-library/react";

import Toggle from "components/input-elements/Toggle/Toggle";
import ToggleItem from "components/input-elements/Toggle/ToggleItem";

describe("Toggle", () => {
  test("renders the Toggle component with default props", () => {
    render(
      <Toggle>
        <ToggleItem value={1} text="Option 1" />
        <ToggleItem value={2} text="Option 2" />
        <ToggleItem value={3} text="Option 3" />
      </Toggle>
    );
  });
});
