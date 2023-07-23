"use client";
import React from "react";
import { makeClassName } from "lib";
import BaseInput, { BaseInputProps } from "components/input-elements/BaseInput";

export type TextInputProps = Omit<BaseInputProps, "stepper"> & {
  type?: "text" | "password" | "email" | "url";
  defaultValue?: string;
  value?: string;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const makeTextInputClassName = makeClassName("TextInput");

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { type, ...other } = props;
  return (
    <BaseInput
      ref={ref}
      type={type || "text"}
      makeInputClassName={makeTextInputClassName}
      {...other}
    />
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
