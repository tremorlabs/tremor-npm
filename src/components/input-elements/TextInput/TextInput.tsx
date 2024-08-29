"use client";
import React from "react";
import { makeClassName } from "lib";
import BaseInput, { BaseInputProps } from "../BaseInput";

export type TextInputProps = Omit<BaseInputProps, "stepper" | "makeInputClassName"> & {
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
  if (process.env.NODE_ENV === "development") {
    console.info(
      "The TextInput is also available as a copy-and-paste component. Visit https://tremor.so/docs/inputs/input (This is only shown in development)",
    );
  }
  return <BaseInput ref={ref} type={type} makeInputClassName={makeTextInputClassName} {...other} />;
});

TextInput.displayName = "TextInput";

export default TextInput;
