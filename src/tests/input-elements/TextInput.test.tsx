import { render } from "@testing-library/react";
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
});
