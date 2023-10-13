"use client";
import { makeClassName } from "lib";
import React from "react";
import BaseInput, { BaseInputProps } from "../BaseInput";

export type TextInputProps = Omit<BaseInputProps, "stepper" | "makeInputClassName"> & {
  type?: "text" | "password" | "email" | "url";
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const makeTextInputClassName = makeClassName("TextInput");

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { type = "text", ...other } = props;
  return <BaseInput ref={ref} type={type} makeInputClassName={makeTextInputClassName} {...other} />;
});

TextInput.displayName = "TextInput";

export default TextInput;
