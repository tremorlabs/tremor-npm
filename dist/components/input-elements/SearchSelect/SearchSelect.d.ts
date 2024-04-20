import React from "react";
export interface SearchSelectProps extends React.HTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    name?: string;
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    icon?: React.ElementType | React.JSXElementConstructor<any>;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    enableClear?: boolean;
    children: React.ReactNode;
}
declare const SearchSelect: React.ForwardRefExoticComponent<SearchSelectProps & React.RefAttributes<HTMLInputElement>>;
export default SearchSelect;
