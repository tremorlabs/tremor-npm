import React from "react";
import { type TransitionStatus } from "react-transition-state";
import { ButtonVariant, Color, HorizontalPosition, Size } from "../../../lib";
export interface ButtonIconOrSpinnerProps {
    loading: boolean;
    iconSize: string;
    iconPosition: string;
    Icon: React.ElementType | undefined;
    needMargin: boolean;
    transitionStatus: TransitionStatus;
}
export declare const ButtonIconOrSpinner: ({ loading, iconSize, iconPosition, Icon, needMargin, transitionStatus, }: ButtonIconOrSpinnerProps) => React.JSX.Element;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ElementType;
    iconPosition?: HorizontalPosition;
    size?: Size;
    color?: Color;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    tooltip?: string;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
