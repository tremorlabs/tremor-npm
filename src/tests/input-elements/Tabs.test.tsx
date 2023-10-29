import { render } from "@testing-library/react";
import React from "react";

import Tab from "components/input-elements/Tabs/Tab";
import TabGroup from "components/input-elements/Tabs/TabGroup";
import TabList from "components/input-elements/Tabs/TabList";
import TabPanel from "components/input-elements/Tabs/TabPanel";
import TabPanels from "components/input-elements/Tabs/TabPanels";

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
