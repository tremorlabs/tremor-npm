import React from "react";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    defaultValue?: string | number;
    value?: string | number;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export default Textarea;
