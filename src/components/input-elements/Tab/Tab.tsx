"use client";
import React, { useContext } from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { tremorTwMerge } from "lib";

import { makeClassName, sizing, spacing } from "lib";
import { TabVariant, TabVariantContext } from "components/input-elements/Tab/TabList";

const makeTabClassName = makeClassName("Tab");

const variantStyles: { [key in TabVariant]: string } = {
  line: tremorTwMerge(
    "ui-selected:border-tremor-brand ui-selected:border-b-2 ",
    "hover:border-b-2 hover:border-tremor-content hover:text-tremor-content-emphasis",
    "border-transparent text-tremor-normal text-tremor-content",
    spacing.px.negativeMarginBottom,
  ),
  solid: tremorTwMerge(
    "ui-selected:border-tremor-border ui-selected:bg-tremor-background ui-selected:shadow-tremor-sm",
    "hover:text-tremor-content-emphasis",
    "border-transparent border rounded-tremor-sm text-tremor-normal text-tremor-content",
    spacing.lg.paddingX,
    spacing.xs.paddingY,
  ),
};

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const { icon, className, children, ...other } = props;

  const variant = useContext(TabVariantContext);
  const Icon = icon;

  return (
    <HeadlessTab
      ref={ref}
      className={tremorTwMerge(
        makeTabClassName("root"),
        "flex whitespace-nowrap truncate max-w-xs outline-none focus:ring-0 text-tremor-sm",
        "ui-selected:text-tremor-brand transition",
        variantStyles[variant],
        spacing.sm.paddingX,
        spacing.sm.paddingY,
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
        />
      ) : null}
      <p>{children}</p>
    </HeadlessTab>
  );
});

Tab.displayName = "Tab";

export default Tab;
