import React from "react";
import { render } from "@testing-library/react";

import Tab from "components/input-elements/Tab/Tab";
import TabList from "components/input-elements/Tab/TabList";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <TabList>
        <Tab value={1} text="Option One" />
        <Tab value={2} text="Option Two" />
        <Tab value={3} text="Option Three" />
      </TabList>
    );
  });
});
