import React from "react";
import { render } from "@testing-library/react";

import Dropdown from "components/input-elements/Dropdown/Dropdown";
import DropdownItem from "components/input-elements/Dropdown/DropdownItem";

describe("Dropdown", () => {
  test("renders the Dropdown component with default props", () => {
    render(
      <Dropdown>
        <DropdownItem value={5} text={"Five"} />
        <DropdownItem value={3} text={"Three"} />
        <DropdownItem value={1} text={"One"} />
      </Dropdown>
    );
  });
});
