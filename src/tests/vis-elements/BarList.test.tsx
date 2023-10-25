/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import React from "react";

import BarList from "components/vis-elements/BarList/BarList";

describe("BarList", () => {
  test("renders the BarList component with default props", () => {
    render(
      <BarList
        data={[
          { name: "/home", value: 100000000 },
          { name: "/imprint", value: 351 },
          { name: "/cancellation", value: 271 },
          {
            name: `/special-offer-august-getsahdkjhagskdfjhgakshjgdfkjahsgdfjkgasdjkhfgajkshgdfjkhagsdkjhfgajh
                        ksdgfjkhasdgfjkhagsdjhkgfasjkdgfjkasdhgkjgfdsk`,
            value: 191,
          },
          { name: "/documentation", value: 91 },
        ]}
      />,
    );
  });

  test("renders the BarList component with icon as ElementType", () => {
    const Icon = () => <span data-testid="icon">icon</span>;
    render(
      <BarList
        data={[
          { name: "/home", value: 100000000, icon: Icon },
          { name: "/imprint", value: 351 },
          { name: "/cancellation", value: 271 },
          {
            name: `/special-offer-august-getsahdkjhagskdfjhgakshjgdfkjahsgdfjkgasdjkhfgajkshgdfjkhagsdkjhfgajh
                        ksdgfjkhasdgfjkhagsdjhkgfasjkdgfjkasdhgkjgfdsk`,
            value: 191,
          },
          { name: "/documentation", value: 91 },
        ]}
      />,
    );
    expect(screen.getByTestId("icon")).toBeTruthy();
  });

  test("renders the BarList component with icon as ReactElement", () => {
    const Icon = () => <span data-testid="icon">icon</span>;
    render(
      <BarList
        data={[
          { name: "/home", value: 100000000, icon: <Icon /> },
          { name: "/imprint", value: 351 },
          { name: "/cancellation", value: 271 },
          {
            name: `/special-offer-august-getsahdkjhagskdfjhgakshjgdfkjahsgdfjkgasdjkhfgajkshgdfjkhagsdkjhfgajh
                        ksdgfjkhasdgfjkhagsdjhkgfasjkdgfjkasdhgkjgfdsk`,
            value: 191,
          },
          { name: "/documentation", value: 91 },
        ]}
      />,
    );
    expect(screen.getByTestId("icon")).toBeTruthy();
  });
});
