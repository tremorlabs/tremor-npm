"use client";
import React from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { tremorTwMerge } from "lib";

import { makeClassName, sizing, spacing } from "lib";

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
      className={tremorTwMerge(
        makeTabClassName("root"),
        "flex whitespace-nowrap max-w-xs truncate",
        "focus:outline-none focus:ring-0 text-tremor-sm font-tremor-medium text-tremor-content-subtle hover:text-tremor-content hover:border-tremor-content border-transparent",
        spacing.twoXs.paddingX,
        spacing.sm.paddingY,
        spacing.px.negativeMarginBottom,
        "ui-selected:text-tremor-brand",
        "ui-selected:border-tremor-brand",
        "ui-selected:border-b-2",
        "hover:border-b-2",
        "transition",
        className,
      )}
      {...other}
    >
      {Icon ? (
        <Icon
          className={tremorTwMerge(
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
