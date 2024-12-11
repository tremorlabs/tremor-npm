import { render } from "@testing-library/react";
import { List, ListItem } from "components";
import React from "react";

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
