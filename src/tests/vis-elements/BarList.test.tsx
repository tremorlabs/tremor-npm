import { render } from "@testing-library/react";
import { BarList } from "components";
import React from "react";

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
});
