/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";

import ArrowUpIcon from "assets/ArrowUpIcon";

import Icon from "components/icon-elements/Icon/Icon";

describe("Icon", () => {
  test("renders the Icon component with default props", () => {
    render(<Icon icon={ArrowUpIcon} />);
  });
});
