"use client";
import BaseInput from "assets/BaseInput";
import React from "react";
import type { BaseInputProps } from "assets/BaseInput";
import { makeClassName } from "lib";

export type NumberInputProps = Omit<BaseInputProps, "type">;

const makeNumberInputClassName = makeClassName("NumberInput");

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props) => {
  return <BaseInput type="number" {...props} makeInputClassName={makeNumberInputClassName} />;
});

NumberInput.displayName = "NumberInput";

export default NumberInput;
