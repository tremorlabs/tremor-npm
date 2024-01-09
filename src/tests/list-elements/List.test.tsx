import { render } from "@testing-library/react";
import React from "react";

import List from "components/list-elements/List/List";
import ListItem from "components/list-elements/List/ListItem";

describe("List", () => {
  test("renders the List component with default props", () => {
    render(
      <List>
        <ListItem>
          <div>Hello</div>
          <div>World</div>
        </ListItem>
        <ListItem>
          <div>Hello</div>
          <div>World</div>
        </ListItem>
      </List>,
    );
  });
});
