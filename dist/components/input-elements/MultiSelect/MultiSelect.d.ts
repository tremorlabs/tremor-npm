import React from "react";
export interface MultiSelectProps extends React.HTMLAttributes<HTMLInputElement> {
    defaultValue?: string[];
    name?: string;
    value?: string[];
    onValueChange?: (value: string[]) => void;
    placeholder?: string;
    placeholderSearch?: string;
    disabled?: boolean;
    icon?: React.ElementType | React.JSXElementConstructor<any>;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    children: React.ReactNode;
}
declare const MultiSelect: React.ForwardRefExoticComponent<MultiSelectProps & React.RefAttributes<HTMLInputElement>>;
export default MultiSelect;
