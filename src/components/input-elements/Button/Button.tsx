"use client";

import React from "react";

import { LoadingSpinner } from "assets";
import { tremorTwMerge } from "lib";
import { tv, VariantProps } from "tailwind-variants";

type HorizontalPosition = "left" | "right";

const HorizontalPositions: { [key: string]: HorizontalPosition } = {
  Left: "left",
  Right: "right",
};

const iconSizes = {
  xs: "h-4 w-4",
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

const buttonStyles = tv({
  base: "group disabled:cursor-not-allowed rounded-tremor-default disabled:opacity-50 inline-flex shrink-0 items-center justify-center font-medium outline-0 outline-offset-2 outline-blue-500 dark:outline-blue-500 transition",
  variants: {
    variant: {
      primary: "",
      secondary: "border",
      light: "",
    },
    size: {
      xs: "px-2.5 py-1.5 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-4 py-2 text-md",
      lg: "px-4 py-2.5 text-lg",
      xl: "px-4 py-3 text-xl",
    },
    color: {
      brand: "",
      slate: "",
      gray: "",
      zinc: "",
      neutral: "",
      stone: "",
      red: "",
      orange: "",
      amber: "",
      yellow: "",
      lime: "",
      green: "",
      emerald: "",
      teal: "",
      cyan: "",
      sky: "",
      blue: "",
      indigo: "",
      violet: "",
      purple: "",
      fuchsia: "",
      pink: "",
      rose: "",
    },
  },
  compoundVariants: [
    // Primary Variants
    {
      variant: "primary",
      color: "brand",
      className:
        "text-tremor-brand-inverted bg-tremor-brand-default hover:bg-tremor-brand-emphasis",
    },
    {
      variant: "primary",
      color: "slate",
      className: "bg-slate-500 hover:bg-slate-600 text-white",
    },
    {
      variant: "primary",
      color: "gray",
      className: "bg-gray-500 hover:bg-gray-600 text-white",
    },
    {
      variant: "primary",
      color: "zinc",
      className: "bg-zinc-500 hover:bg-zinc-600 text-white",
    },
    {
      variant: "primary",
      color: "neutral",
      className: "bg-neutral-500 hover:bg-neutral-600 text-white",
    },
    {
      variant: "primary",
      color: "stone",
      className: "bg-stone-500 hover:bg-stone-600 text-white",
    },
    {
      variant: "primary",
      color: "red",
      className: "bg-red-500 hover:bg-red-600 text-white",
    },
    {
      variant: "primary",
      color: "orange",
      className: "bg-orange-500 hover:bg-orange-600 text-white",
    },
    {
      variant: "primary",
      color: "amber",
      className: "bg-amber-500 hover:bg-amber-600 text-white",
    },
    {
      variant: "primary",
      color: "yellow",
      className: "bg-yellow-500 hover:bg-yellow-600 text-white",
    },
    {
      variant: "primary",
      color: "lime",
      className: "bg-lime-500 hover:bg-lime-600 text-white",
    },
    {
      variant: "primary",
      color: "green",
      className: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      variant: "primary",
      color: "emerald",
      className: "bg-emerald-500 hover:bg-emerald-600 text-white",
    },
    {
      variant: "primary",
      color: "teal",
      className: "bg-teal-500 hover:bg-teal-600 text-white",
    },
    {
      variant: "primary",
      color: "cyan",
      className: "bg-cyan-500 hover:bg-cyan-600 text-white",
    },
    {
      variant: "primary",
      color: "sky",
      className: "bg-sky-500 hover:bg-sky-600 text-white",
    },
    {
      variant: "primary",
      color: "blue",
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    {
      variant: "primary",
      color: "indigo",
      className: "bg-indigo-500 hover:bg-indigo-600 text-white",
    },
    {
      variant: "primary",
      color: "violet",
      className: "bg-violet-500 hover:bg-violet-600 text-white",
    },
    {
      variant: "primary",
      color: "purple",
      className: "bg-purple-500 hover:bg-purple-600 text-white",
    },
    {
      variant: "primary",
      color: "fuchsia",
      className: "bg-fuchsia-500 hover:bg-fuchsia-600 text-white",
    },
    {
      variant: "primary",
      color: "pink",
      className: "bg-pink-500 hover:bg-pink-600 text-white",
    },
    {
      variant: "primary",
      color: "rose",
      className: "bg-rose-500 hover:bg-rose-600 text-white",
    },
    // Secondary Variants
    {
      variant: "secondary",
      color: "brand",
      className:
        "border-tremor-brand-default text-tremor-brand-default hover:text-tremor-brand-emphasis bg-transparent hover:bg-tremor-brand-faint",
    },
    {
      variant: "secondary",
      color: "slate",
      className: "border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-500/15",
    },
    {
      variant: "secondary",
      color: "gray",
      className: "border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500/15",
    },
    {
      variant: "secondary",
      color: "zinc",
      className: "border-zinc-600 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-500/15",
    },
    {
      variant: "secondary",
      color: "neutral",
      className:
        "border-neutral-600 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-500/15",
    },
    {
      variant: "secondary",
      color: "stone",
      className: "border-stone-600 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-500/15",
    },
    {
      variant: "secondary",
      color: "red",
      className: "border-red-600 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/15",
    },
    {
      variant: "secondary",
      color: "orange",
      className: "border-orange-600 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/15",
    },
    {
      variant: "secondary",
      color: "amber",
      className: "border-amber-600 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/15",
    },
    {
      variant: "secondary",
      color: "yellow",
      className: "border-yellow-600 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/15",
    },
    {
      variant: "secondary",
      color: "lime",
      className: "border-lime-600 text-lime-500 hover:bg-lime-50 dark:hover:bg-lime-500/15",
    },
    {
      variant: "secondary",
      color: "green",
      className: "border-green-600 text-green-500 hover:bg-green-50 dark:hover:bg-green-500/15",
    },
    {
      variant: "secondary",
      color: "emerald",
      className:
        "border-emerald-600 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/15",
    },
    {
      variant: "secondary",
      color: "teal",
      className: "border-teal-600 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-500/15",
    },
    {
      variant: "secondary",
      color: "cyan",
      className: "border-cyan-600 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/15",
    },
    {
      variant: "secondary",
      color: "sky",
      className: "border-sky-600 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/15",
    },
    {
      variant: "secondary",
      color: "blue",
      className: "border-blue-600 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/15",
    },
    {
      variant: "secondary",
      color: "indigo",
      className: "border-indigo-600 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/15",
    },
    {
      variant: "secondary",
      color: "violet",
      className: "border-violet-600 text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/15",
    },
    {
      variant: "secondary",
      color: "purple",
      className: "border-purple-600 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/15",
    },
    {
      variant: "secondary",
      color: "fuchsia",
      className:
        "border-fuchsia-600 text-fuchsia-500 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/15",
    },
    {
      variant: "secondary",
      color: "pink",
      className: "border-pink-600 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/15",
    },
    {
      variant: "secondary",
      color: "rose",
      className: "border-rose-600 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/15",
    },
    // Light Variants
    {
      variant: "light",
      color: "brand",
      className: "text-tremor-brand-default hover:text-tremor-brand-emphasis",
    },
    {
      variant: "light",
      color: "slate",
      className: "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-500/15",
    },
    {
      variant: "light",
      color: "gray",
      className: "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500/15",
    },
    {
      variant: "light",
      color: "zinc",
      className: "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-500/15",
    },
    {
      variant: "light",
      color: "neutral",
      className: "text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-500/15",
    },
    {
      variant: "light",
      color: "stone",
      className: "text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-500/15",
    },
    {
      variant: "light",
      color: "red",
      className: "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/15",
    },
    {
      variant: "light",
      color: "orange",
      className: "text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/15",
    },
    {
      variant: "light",
      color: "amber",
      className: "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/15",
    },
    {
      variant: "light",
      color: "yellow",
      className: "text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/15",
    },
    {
      variant: "light",
      color: "lime",
      className: "text-lime-500 hover:bg-lime-50 dark:hover:bg-lime-500/15",
    },
    {
      variant: "light",
      color: "green",
      className: "text-green-500 hover:bg-green-50 dark:hover:bg-green-500/15",
    },
    {
      variant: "light",
      color: "emerald",
      className: "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/15",
    },
    {
      variant: "light",
      color: "teal",
      className: "text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-500/15",
    },
    {
      variant: "light",
      color: "cyan",
      className: "text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/15",
    },
    {
      variant: "light",
      color: "sky",
      className: "text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-500/15",
    },
    {
      variant: "light",
      color: "blue",
      className: "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/15",
    },
    {
      variant: "light",
      color: "indigo",
      className: "text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/15",
    },
    {
      variant: "light",
      color: "violet",
      className: "text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/15",
    },
    {
      variant: "light",
      color: "purple",
      className: "text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/15",
    },
    {
      variant: "light",
      color: "violet",
      className: "text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/15",
    },
    {
      variant: "light",
      color: "fuchsia",
      className: "text-fuchsia-500 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/15",
    },
    {
      variant: "light",
      color: "pink",
      className: "text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/15",
    },
    {
      variant: "light",
      color: "rose",
      className: "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/15",
    },
  ],
  defaultVariants: {
    variant: "primary",
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

  return loading ? (
    <LoadingSpinner
      className={tremorTwMerge("shrink-0 animate-spin", margin, iconSize)}
      style={{ transition: `width 150ms` }}
    />
  ) : (
    <Icon className={tremorTwMerge("shrink-0", iconSize, margin)} />
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      icon: Icon,
      iconPosition = HorizontalPositions.Left,
      variant,
      color,
      size = "sm",
      disabled,
      loading = false,
      loadingText,
      children,
      className,
      ...other
    },
    ref,
  ) => {
    const isDisabled = loading || disabled;
    const showButtonIconOrSpinner = Icon !== undefined || loading;
    const showLoadingText = loading && loadingText;
    const needIconMargin = children || showLoadingText ? true : false;

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        ref={ref}
        className={tremorTwMerge(buttonStyles({ variant, color, size, className }))}
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
  },
);

Button.displayName = "Button";

export { Button, type ButtonProps };
