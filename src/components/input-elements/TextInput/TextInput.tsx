"use client";
import React from "react";
import BaseInput from "assets/BaseInput";
import type { BaseInputProps } from "assets/BaseInput";
import { makeClassName } from "lib";

export type TextInputProps = Omit<BaseInputProps, "numberControllers"> & {
  type?: "text" | "password" | "email" | "url";
  defaultValue?: string;
  value?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const makeTextInputClassName = makeClassName("TextInput");

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props) => {
  return (
    <BaseInput type={props.type || "text"} {...props} makeInputClassName={makeTextInputClassName} />
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
