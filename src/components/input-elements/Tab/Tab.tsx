"use client";
import React from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { fontSize, fontWeight, getColorClassNames, makeClassName, sizing, spacing } from "lib";

import { colorPalette, DEFAULT_COLOR } from "lib/theme";

const makeTabClassName = makeClassName("Tab");

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { icon, className, children, ...other } = props;

  const Icon = icon;

  return (
    <HeadlessTab
      ref={ref}
      className={twMerge(
        makeTabClassName("root"),
        "flex whitespace-nowrap max-w-xs truncate",
        "focus:outline-none focus:ring-0",
        spacing.twoXs.paddingX,
        spacing.sm.paddingY,
        spacing.px.negativeMarginBottom,
        fontSize.sm,
        fontWeight.md,
        getColorClassNames("transparent").borderColor,
        getColorClassNames(DEFAULT_COLOR, colorPalette.lightText).textColor,
        getColorClassNames(DEFAULT_COLOR, colorPalette.text).hoverTextColor,
        getColorClassNames(DEFAULT_COLOR, colorPalette.border).hoverBorderColor,
        "ui-selected:text-blue-500",
        "ui-selected:border-blue-500",
        "ui-selected:border-b-2",
        "hover:border-b-2",
        className,
      )}
      {...other}
    >
      {Icon ? (
        <Icon
          className={twMerge(
            makeTabClassName("icon"),
            "flex-none",
            sizing.lg.height,
            sizing.lg.width,
            spacing.sm.marginRight,
          )}
          aria-hidden="true"
        />
      ) : null}
      <p>{children}</p>
    </HeadlessTab>
  );
});

export default Tab;
