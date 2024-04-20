import React from "react";
import { BaseInputProps } from "../BaseInput";
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
declare const TextInput: React.ForwardRefExoticComponent<Omit<BaseInputProps, "stepper" | "makeInputClassName"> & {
    type?: "text" | "url" | "email" | "password" | undefined;
    defaultValue?: string | undefined;
    value?: string | undefined;
    onValueChange?: ((value: string) => void) | undefined;
    icon?: React.JSXElementConstructor<any> | React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    error?: boolean | undefined;
    errorMessage?: string | undefined;
    disabled?: boolean | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export default TextInput;
