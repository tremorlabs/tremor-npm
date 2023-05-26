import React from "react";
import { render } from "@testing-library/react";

import Select from "components/input-elements/Select/Select";
import SelectItem from "components/input-elements/Select/SelectItem";

describe("Select", () => {
  test("renders the Select component with default props", () => {
    render(
      <Select>
        <SelectItem value={"5"} />
        <SelectItem value={"3"}>Three</SelectItem>
        <SelectItem value={"1"}>One</SelectItem>
      </Select>,
    );
  });
});
