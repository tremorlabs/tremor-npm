import { Color } from "lib";
import React from "react";
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (value: boolean) => void;
    color?: Color;
    name?: string;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    tooltip?: string;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLDivElement>>;
export default Switch;
