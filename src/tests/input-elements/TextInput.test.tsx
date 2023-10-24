import { render, screen, fireEvent } from "@testing-library/react";
import { TextInput } from "components";
import React from "react";

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

  test("TextInput component with enableClear prop", () => {
    render(<TextInput defaultValue="Test" enableClear />);
    const inputEl: HTMLInputElement = screen.getByTestId("base-input");
    expect(inputEl.value).toBe("Test");
    const clearBtnEl = screen.getByTestId("clear-btn");
    fireEvent.click(clearBtnEl);
    expect(inputEl.value).toBe("");
  });

  test("controlled TextInput component", () => {
    const ControlledTextInput = () => {
      const [value, setValue] = React.useState("");
      return (
        <TextInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          enableClear
        />
      );
    };
    render(<ControlledTextInput />);
    const inputEl: HTMLInputElement = screen.getByTestId("base-input");
    expect(inputEl.value).toBe("");
    fireEvent.change(inputEl, { target: { value: "Test" } });
    expect(inputEl.value).toBe("Test");
    const clearBtnEl = screen.getByTestId("clear-btn");
    fireEvent.click(clearBtnEl);
    expect(inputEl.value).toBe("");
  });
});
