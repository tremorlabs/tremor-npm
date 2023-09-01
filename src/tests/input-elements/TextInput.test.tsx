import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TextInput } from "components";
import userEvent from "@testing-library/user-event";

describe("TextInput", () => {
  test("renders the TextInput component with text type", () => {
    render(<TextInput type="text" defaultValue="Test" />);
  });

  test("renders the TextInput component with password type", () => {
    render(<TextInput type="password" defaultValue="Test" />);
  });

  test("renders the TextInput component with email type", () => {
    render(<TextInput type="email" defaultValue="Test" />);
  });

  test("renders the TextInput component with url type", () => {
    render(<TextInput type="url" defaultValue="Test" />);
  });

  test("renders the TextInput component with placeholder", () => {
    const placeholder = "Type...";
    render(<TextInput placeholder={placeholder} />);
    expect(screen.queryByPlaceholderText(placeholder)).toBeTruthy();
  });

  test("renders the TextInput component and inputs a value", async () => {
    const placeholder = "Type...";
    render(<TextInput placeholder={placeholder} />);
    const input = screen.getByPlaceholderText(placeholder);
    const value = "Test";
    fireEvent.change(input, { target: { value } });
    expect(screen.queryByDisplayValue(value)).toBeTruthy();
  });

  test("renders the TextInput component with customized icon", () => {
    const IconText = "Icon";
    render(<TextInput icon={() => <div>{IconText}</div>} />);
    expect(screen.getByText(IconText)).toBeTruthy();
  });
});
