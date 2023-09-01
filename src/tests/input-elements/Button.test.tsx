/* eslint-disable no-undef */
import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Button from "components/input-elements/Button/Button";

describe("Button", () => {
  test("renders the Button component with default props", () => {
    render(<Button>Button</Button>);
  });

  test("renders the Button component with customized text", () => {
    const buttonText = "Click Me";
    const { getByText } = render(<Button>{buttonText}</Button>);

    expect(getByText(buttonText)).toBeTruthy();
  });

  test("renders the Button component with customized onClick", () => {
    const buttonText = "Click Me";
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>{buttonText}</Button>);
    expect(onClick).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText(buttonText));
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(getByText(buttonText));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test("renders the Button component with customized disabled", () => {
    const buttonText = "Click Me";
    const disabled = true;
    const onClick = jest.fn();
    const { getByText } = render(
      <Button disabled={disabled} onClick={onClick}>
        {buttonText}
      </Button>,
    );

    act(() => {
      fireEvent.click(getByText(buttonText));
    });

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test("renders the Button component with customized icon", () => {
    const buttonText = "Click Me";
    const Icon = () => <div>Icon</div>;
    const { queryByText } = render(
      <Button icon={Icon} iconPosition="left">
        {buttonText}
      </Button>,
    );

    expect(queryByText("Icon")).toBeTruthy();
  });

  test("renders the Button component with tooltip", async () => {
    const buttonText = "Click Me";
    const tooltip = "some explanation";
    const { getByText } = render(<Button tooltip={tooltip}>{buttonText}</Button>);

    await userEvent.hover(getByText(buttonText));
    await waitFor(() => {
      expect(screen.queryByText(tooltip)).toBeTruthy();
    });

    // mysteriously, below using fireEvent does not work
    // fireEvent.mouseOver(getByText(buttonText));
    // await screen.findByTitle(tooltip);
    // expect(screen.queryByText(tooltip)).toBeTruthy();
  });
});
