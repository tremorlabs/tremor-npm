import React from "react";
import { render } from "@testing-library/react";

import Tab from "components/input-elements/Tab/Tab";
import TabList from "components/input-elements/Tab/TabList";
import TabGroup from "components/input-elements/Tab/TabGroup";
import TabPanels from "components/input-elements/Tab/TabPanels";
import TabPanel from "components/input-elements/Tab/TabPanel";

describe("SelectBox", () => {
  test("renders the SelectBox component with default props", () => {
    render(
      <TabGroup>
        <TabList>
          <Tab>Option One</Tab>
          <Tab>Option Two</Tab>
          <Tab>Option Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Hello World 1</TabPanel>
          <TabPanel>Hello World 2</TabPanel>
          <TabPanel>Hello World 3</TabPanel>
        </TabPanels>
      </TabGroup>,
    );
  });
});
