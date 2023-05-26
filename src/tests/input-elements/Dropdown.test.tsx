import React from "react";
import { render } from "@testing-library/react";

import Dropdown from "components/input-elements/Select/Select";
import DropdownItem from "components/input-elements/Select/SelectItem";

describe("Dropdown", () => {
  test("renders the Dropdown component with default props", () => {
    render(
      <Dropdown>
        <DropdownItem value={"5"} />
        <DropdownItem value={"3"}>Three</DropdownItem>
        <DropdownItem value={"1"}>One</DropdownItem>
      </Dropdown>,
    );
  });
});
