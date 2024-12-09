"use client";
import React from "react";
import BaseInput, { BaseInputProps } from "../BaseInput";

type TextInputProps = Omit<BaseInputProps, "stepper" | "makeInputClassName"> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  icon?: React.ElementType | React.JSXElementConstructor<any>;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { type = "text", ...other } = props;
  return <BaseInput ref={ref} type={type} {...other} />;
});

TextInput.displayName = "TextInput";

export { TextInput, type TextInputProps };
