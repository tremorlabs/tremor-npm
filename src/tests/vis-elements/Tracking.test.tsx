import React from "react";
import { render } from "@testing-library/react";

import Tracking from "components/vis-elements/Tracking/Tracking";
import TrackingBlock from "components/vis-elements/Tracking/TrackingBlock";

describe("Tracking", () => {
  test("renders the Tracking component with default props", () => {
    render(
      <Tracking>
        <TrackingBlock color="green" />
        <TrackingBlock color="green" />
      </Tracking>
    );
  });
});
