import React from "react";
import { render } from "@testing-library/react";

import Tracker from "components/vis-elements/Tracker/Tracker";
import TrackerBlock from "components/vis-elements/Tracker/TrackerBlock";

describe("Tracker", () => {
  test("renders the Tracker component with default props", () => {
    render(
      <Tracker>
        <TrackerBlock color="green" />
        <TrackerBlock color="green" />
      </Tracker>,
    );
  });
});
