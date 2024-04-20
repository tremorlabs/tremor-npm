import React from "react";
import { BaseInputProps } from "../BaseInput";
export interface NumberInputProps extends Omit<BaseInputProps, "type" | "stepper" | "onSubmit" | "makeInputClassName"> {
    step?: string | number;
    enableStepper?: boolean;
    onSubmit?: (value: number) => void;
    onValueChange?: (value: number) => void;
}
declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLInputElement>>;
export default NumberInput;
