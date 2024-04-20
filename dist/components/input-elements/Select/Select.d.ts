import React from "react";
export interface SelectProps extends React.HTMLAttributes<HTMLInputElement> {
    value?: string;
    name?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    icon?: React.JSXElementConstructor<any>;
    enableClear?: boolean;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    children: React.ReactNode;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLInputElement>>;
export default Select;
