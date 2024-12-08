"use client";

import React from "react";

export type HorizontalPosition = "left" | "right";

export type VerticalPosition = "top" | "bottom";

export const HorizontalPositions: { [key: string]: HorizontalPosition } = {
  Left: "left",
  Right: "right",
};

export const VerticalPositions: { [key: string]: VerticalPosition } = {
  Top: "top",
  Bottom: "bottom",
};

import { tremorTwMerge } from "lib";

import { LoadingSpinner } from "assets";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = {
  primary: [
    "border-tremor-brand",
    "hover:border-tremor-brand-emphasis ",
    "text-tremor-brand-inverted ",
    "hover:text-tremor-brand-inverted ",
    "bg-tremor-brand ",
    "hover:bg-tremor-brand-emphasis",
  ],
  secondary: [
    "border-tremor-brand ",
    "text-tremor-brand ",
    "hover:text-tremor-brand-emphasis ",
    "bg-transparent",
    "hover:bg-tremor-brand-faint ",
    "hover:bg-opacity-20 ",
  ],
  light: [
    "border-transparent",
    "text-tremor-brand ",
    "hover:text-tremor-brand-emphasis ",
    "bg-transparent",
  ],
};

const buttonSizes = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-4 py-2 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-4 py-2.5 text-lg",
  xl: "px-4 py-3 text-xl",
};

const iconSizes = {
  xs: "h-4 w-4",
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

const buttonStyles = tv({
  base: "group disabled:cursor-not-allowed disabled:opacity-50 inline-flex shrink-0 items-center justify-center font-medium outline-hidden",
  variants: {
    variant: { ...buttonVariants },
    size: { ...buttonSizes },
  },
  defaultVariants: {
    color: "brand",
    size: "sm",
  },
});

type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  keyof VariantProps<typeof buttonStyles>
> &
  VariantProps<typeof buttonStyles> & {
    icon?: React.ElementType;
    iconPosition?: HorizontalPosition;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
  };

export interface ButtonIconOrSpinnerProps {
  loading: boolean;
  iconSize: string;
  iconPosition: string;
  Icon: React.ElementType | undefined;
  needMargin: boolean;
}

export const ButtonIconOrSpinner = ({
  loading,
  iconSize,
  iconPosition,
  Icon,
  needMargin,
}: ButtonIconOrSpinnerProps) => {
  Icon = Icon!;

  const margin = !needMargin
    ? ""
    : iconPosition === HorizontalPositions.Left
      ? tremorTwMerge("-ml-1", "mr-1.5")
      : tremorTwMerge("-mr-1", "ml-1.5");

  const defaultSpinnerSize = tremorTwMerge("h-0 w-0");
  const spinnerSize: { [key: string]: any } = {
    default: defaultSpinnerSize,
    entering: defaultSpinnerSize,
    entered: iconSize,
    exiting: iconSize,
    exited: defaultSpinnerSize,
  };

  return loading ? (
    <LoadingSpinner
      className={tremorTwMerge("shrink-0 animate-spin", margin, spinnerSize.default)}
      style={{ transition: `width 150ms` }}
    />
  ) : (
    <Icon className={tremorTwMerge("shrink-0", iconSize, margin)} />
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    icon,
    iconPosition = HorizontalPositions.Left,
    size = "sm",
    // color = "brand",
    variant = "primary",
    disabled,
    loading = false,
    loadingText,
    children,
    className,
    ...other
  } = props;

  const Icon = icon;

  const isDisabled = loading || disabled;
  const showButtonIconOrSpinner = Icon !== undefined || loading;
  const showLoadingText = loading && loadingText;
  const needIconMargin = children || showLoadingText ? true : false;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      ref={ref}
      className={tremorTwMerge(buttonStyles({ size, variant, className }))}
      disabled={isDisabled}
      {...other}
    >
      {showButtonIconOrSpinner && iconPosition !== HorizontalPositions.Right ? (
        <ButtonIconOrSpinner
          loading={loading}
          iconSize={iconSizes[size]}
          iconPosition={iconPosition}
          Icon={Icon}
          needMargin={needIconMargin}
        />
      ) : null}
      {showLoadingText || children ? (
        <span className={tremorTwMerge("text-tremor-default whitespace-nowrap")}>
          {showLoadingText ? loadingText : children}
        </span>
      ) : null}
      {showButtonIconOrSpinner && iconPosition === HorizontalPositions.Right ? (
        <ButtonIconOrSpinner
          loading={loading}
          iconSize={iconSizes[size]}
          iconPosition={iconPosition}
          Icon={Icon}
          needMargin={needIconMargin}
        />
      ) : null}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
