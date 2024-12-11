"use client";

import { Tab as HeadlessTab } from "@headlessui/react";
import { TabVariantContext } from "components/input-elements/Tabs/TabList";
import { BaseColorContext } from "contexts";
import { tremorTwMerge } from "lib";
import React, { useContext } from "react";
import { tv, VariantProps } from "tailwind-variants";

const tabColors = {
  brand: {
    line: "hover:border-tremor-content-default hover:text-tremor-content-emphasis text-tremor-content-default data-selected:border-tremor-brand-default data-selected:text-tremor-brand-default",
    solid:
      "text-tremor-content-default data-selected:text-tremor-brand-default hover:text-tremor-content-emphasis",
  },
  slate: {
    line: "hover:border-slate-600 hover:text-slate-900 text-slate-600 data-selected:border-slate-700 data-selected:text-slate-900 dark:hover:border-slate-400 dark:hover:text-slate-200 dark:text-slate-400 dark:data-selected:border-slate-400 dark:data-selected:text-slate-200",
    solid:
      "text-slate-600 data-selected:text-slate-900 hover:text-slate-900 dark:text-slate-400 dark:data-selected:text-slate-200 dark:hover:text-slate-200",
  },
  gray: {
    line: "hover:border-gray-600 hover:text-gray-900 text-gray-600 data-selected:border-gray-700 data-selected:text-gray-900 dark:hover:border-gray-400 dark:hover:text-gray-200 dark:text-gray-400 dark:data-selected:border-gray-400 dark:data-selected:text-gray-200",
    solid:
      "text-gray-600 data-selected:text-gray-900 hover:text-gray-900 dark:text-gray-400 dark:data-selected:text-gray-200 dark:hover:text-gray-200",
  },
  zinc: {
    line: "hover:border-zinc-600 hover:text-zinc-900 text-zinc-600 data-selected:border-zinc-700 data-selected:text-zinc-900 dark:hover:border-zinc-400 dark:hover:text-zinc-200 dark:text-zinc-400 dark:data-selected:border-zinc-400 dark:data-selected:text-zinc-200",
    solid:
      "text-zinc-600 data-selected:text-zinc-900 hover:text-zinc-900 dark:text-zinc-400 dark:data-selected:text-zinc-200 dark:hover:text-zinc-200",
  },
  neutral: {
    line: "hover:border-neutral-600 hover:text-neutral-900 text-neutral-600 data-selected:border-neutral-700 data-selected:text-neutral-900 dark:hover:border-neutral-400 dark:hover:text-neutral-200 dark:text-neutral-400 dark:data-selected:border-neutral-400 dark:data-selected:text-neutral-200",
    solid:
      "text-neutral-600 data-selected:text-neutral-900 hover:text-neutral-900 dark:text-neutral-400 dark:data-selected:text-neutral-200 dark:hover:text-neutral-200",
  },
  stone: {
    line: "hover:border-stone-600 hover:text-stone-900 text-stone-600 data-selected:border-stone-700 data-selected:text-stone-900 dark:hover:border-stone-400 dark:hover:text-stone-200 dark:text-stone-400 dark:data-selected:border-stone-400 dark:data-selected:text-stone-200",
    solid:
      "text-stone-600 data-selected:text-stone-900 hover:text-stone-900 dark:text-stone-400 dark:data-selected:text-stone-200 dark:hover:text-stone-200",
  },
  red: {
    line: "hover:border-red-600 hover:text-red-700 text-red-600 data-selected:border-red-700 data-selected:text-red-700 dark:hover:border-red-400 dark:hover:text-red-400 dark:text-red-400 dark:data-selected:border-red-400 dark:data-selected:text-red-400",
    solid:
      "text-red-600 data-selected:text-red-700 hover:text-red-700 dark:text-red-400 dark:data-selected:text-red-400 dark:hover:text-red-400",
  },
  orange: {
    line: "hover:border-orange-600 hover:text-orange-700 text-orange-600 data-selected:border-orange-700 data-selected:text-orange-700 dark:hover:border-orange-400 dark:hover:text-orange-400 dark:text-orange-400 dark:data-selected:border-orange-400 dark:data-selected:text-orange-400",
    solid:
      "text-orange-600 data-selected:text-orange-700 hover:text-orange-700 dark:text-orange-400 dark:data-selected:text-orange-400 dark:hover:text-orange-400",
  },
  amber: {
    line: "hover:border-amber-600 hover:text-amber-700 text-amber-600 data-selected:border-amber-700 data-selected:text-amber-700 dark:hover:border-amber-400 dark:hover:text-amber-400 dark:text-amber-400 dark:data-selected:border-amber-400 dark:data-selected:text-amber-400",
    solid:
      "text-amber-600 data-selected:text-amber-700 hover:text-amber-700 dark:text-amber-400 dark:data-selected:text-amber-400 dark:hover:text-amber-400",
  },
  yellow: {
    line: "hover:border-yellow-600 hover:text-yellow-700 text-yellow-600 data-selected:border-yellow-700 data-selected:text-yellow-700 dark:hover:border-yellow-400 dark:hover:text-yellow-400 dark:text-yellow-400 dark:data-selected:border-yellow-400 dark:data-selected:text-yellow-400",
    solid:
      "text-yellow-600 data-selected:text-yellow-700 hover:text-yellow-700 dark:text-yellow-400 dark:data-selected:text-yellow-400 dark:hover:text-yellow-400",
  },
  lime: {
    line: "hover:border-lime-600 hover:text-lime-700 text-lime-600 data-selected:border-lime-700 data-selected:text-lime-700 dark:hover:border-lime-400 dark:hover:text-lime-400 dark:text-lime-400 dark:data-selected:border-lime-400 dark:data-selected:text-lime-400",
    solid:
      "text-lime-600 data-selected:text-lime-700 hover:text-lime-700 dark:text-lime-400 dark:data-selected:text-lime-400 dark:hover:text-lime-400",
  },
  green: {
    line: "hover:border-green-600 hover:text-green-700 text-green-600 data-selected:border-green-700 data-selected:text-green-700 dark:hover:border-green-400 dark:hover:text-green-400 dark:text-green-400 dark:data-selected:border-green-400 dark:data-selected:text-green-400",
    solid:
      "text-green-600 data-selected:text-green-700 hover:text-green-700 dark:text-green-400 dark:data-selected:text-green-400 dark:hover:text-green-400",
  },
  emerald: {
    line: "hover:border-emerald-600 hover:text-emerald-700 text-emerald-600 data-selected:border-emerald-700 data-selected:text-emerald-700 dark:hover:border-emerald-400 dark:hover:text-emerald-400 dark:text-emerald-400 dark:data-selected:border-emerald-400 dark:data-selected:text-emerald-400",
    solid:
      "text-emerald-600 data-selected:text-emerald-700 hover:text-emerald-700 dark:text-emerald-400 dark:data-selected:text-emerald-400 dark:hover:text-emerald-400",
  },
  teal: {
    line: "hover:border-teal-600 hover:text-teal-700 text-teal-600 data-selected:border-teal-700 data-selected:text-teal-700 dark:hover:border-teal-400 dark:hover:text-teal-400 dark:text-teal-400 dark:data-selected:border-teal-400 dark:data-selected:text-teal-400",
    solid:
      "text-teal-600 data-selected:text-teal-700 hover:text-teal-700 dark:text-teal-400 dark:data-selected:text-teal-400 dark:hover:text-teal-400",
  },
  cyan: {
    line: "hover:border-cyan-600 hover:text-cyan-700 text-cyan-600 data-selected:border-cyan-700 data-selected:text-cyan-700 dark:hover:border-cyan-400 dark:hover:text-cyan-400 dark:text-cyan-400 dark:data-selected:border-cyan-400 dark:data-selected:text-cyan-400",
    solid:
      "text-cyan-600 data-selected:text-cyan-700 hover:text-cyan-700 dark:text-cyan-400 dark:data-selected:text-cyan-400 dark:hover:text-cyan-400",
  },
  sky: {
    line: "hover:border-sky-600 hover:text-sky-700 text-sky-600 data-selected:border-sky-700 data-selected:text-sky-700 dark:hover:border-sky-400 dark:hover:text-sky-400 dark:text-sky-400 dark:data-selected:border-sky-400 dark:data-selected:text-sky-400",
    solid:
      "text-sky-600 data-selected:text-sky-700 hover:text-sky-700 dark:text-sky-400 dark:data-selected:text-sky-400 dark:hover:text-sky-400",
  },
  blue: {
    line: "hover:border-blue-600 hover:text-blue-700 text-blue-600 data-selected:border-blue-700 data-selected:text-blue-700 dark:hover:border-blue-400 dark:hover:text-blue-400 dark:text-blue-400 dark:data-selected:border-blue-400 dark:data-selected:text-blue-400",
    solid:
      "text-blue-600 data-selected:text-blue-700 hover:text-blue-700 dark:text-blue-400 dark:data-selected:text-blue-400 dark:hover:text-blue-400",
  },
  indigo: {
    line: "hover:border-indigo-600 hover:text-indigo-700 text-indigo-600 data-selected:border-indigo-700 data-selected:text-indigo-700 dark:hover:border-indigo-400 dark:hover:text-indigo-400 dark:text-indigo-400 dark:data-selected:border-indigo-400 dark:data-selected:text-indigo-400",
    solid:
      "text-indigo-600 data-selected:text-indigo-700 hover:text-indigo-700 dark:text-indigo-400 dark:data-selected:text-indigo-400 dark:hover:text-indigo-400",
  },
  violet: {
    line: "hover:border-violet-600 hover:text-violet-700 text-violet-600 data-selected:border-violet-700 data-selected:text-violet-700 dark:hover:border-violet-400 dark:hover:text-violet-400 dark:text-violet-400 dark:data-selected:border-violet-400 dark:data-selected:text-violet-400",
    solid:
      "text-violet-600 data-selected:text-violet-700 hover:text-violet-700 dark:text-violet-400 dark:data-selected:text-violet-400 dark:hover:text-violet-400",
  },
  purple: {
    line: "hover:border-purple-600 hover:text-purple-700 text-purple-600 data-selected:border-purple-700 data-selected:text-purple-700 dark:hover:border-purple-400 dark:hover:text-purple-400 dark:text-purple-400 dark:data-selected:border-purple-400 dark:data-selected:text-purple-400",
    solid:
      "text-purple-600 data-selected:text-purple-700 hover:text-purple-700 dark:text-purple-400 dark:data-selected:text-purple-400 dark:hover:text-purple-400",
  },
  fuchsia: {
    line: "hover:border-fuchsia-600 hover:text-fuchsia-700 text-fuchsia-600 data-selected:border-fuchsia-700 data-selected:text-fuchsia-700 dark:hover:border-fuchsia-400 dark:hover:text-fuchsia-400 dark:text-fuchsia-400 dark:data-selected:border-fuchsia-400 dark:data-selected:text-fuchsia-400",
    solid:
      "text-fuchsia-600 data-selected:text-fuchsia-700 hover:text-fuchsia-700 dark:text-fuchsia-400 dark:data-selected:text-fuchsia-400 dark:hover:text-fuchsia-400",
  },
  pink: {
    line: "hover:border-pink-600 hover:text-pink-700 text-pink-600 data-selected:border-pink-700 data-selected:text-pink-700 dark:hover:border-pink-400 dark:hover:text-pink-400 dark:text-pink-400 dark:data-selected:border-pink-400 dark:data-selected:text-pink-400",
    solid:
      "text-pink-600 data-selected:text-pink-700 hover:text-pink-700 dark:text-pink-400 dark:data-selected:text-pink-400 dark:hover:text-pink-400",
  },
  rose: {
    line: "hover:border-rose-600 hover:text-rose-700 text-rose-600 data-selected:border-rose-700 data-selected:text-rose-700 dark:hover:border-rose-400 dark:hover:text-rose-400 dark:text-rose-400 dark:data-selected:border-rose-400 dark:data-selected:text-rose-400",
    solid:
      "text-rose-600 data-selected:text-rose-700 hover:text-rose-700 dark:text-rose-400 dark:data-selected:text-rose-400 dark:hover:text-rose-400",
  },
} as const;

type ColorType = keyof typeof tabColors;
type VariantType = keyof (typeof tabColors)[ColorType];

const tab = tv({
  base: "!text-tremor-default flex truncate whitespace-nowrap transition duration-100 outline-none data-focus-visible:ring-3",
  variants: {
    variant: {
      line: "-mb-px border-transparent px-2 py-2 transition duration-100 hover:border-b-2 data-selected:border-b-2",
      solid:
        "rounded-tremor-small border border-transparent px-2.5 py-1 data-selected:border-tremor-border-default data-selected:bg-tremor-background-default data-selected:shadow-tremor-input",
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
  compoundVariants: (
    Object.entries(tabColors) as [ColorType, (typeof tabColors)[ColorType]][]
  ).flatMap(([colorName, variants]) =>
    (Object.entries(variants) as [VariantType, string][]).map(([variantName, className]) => ({
      color: colorName,
      variant: variantName,
      class: className,
    })),
  ),
  defaultVariants: {
    color: "brand",
    variant: "line",
  },
});

const icon = tv({
  base: "h-5 w-5 shrink-0",
  variants: {
    hasChildren: {
      true: "mr-2",
      false: "",
    },
  },
});

type TabVariants = VariantProps<typeof tab>;

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  color?: TabVariants["color"];
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ icon: Icon, className, children, color: colorProp, ...other }, ref) => {
    const variant = useContext(TabVariantContext);
    const contextColor = useContext(BaseColorContext);
    const color = colorProp || contextColor || "brand";

    return (
      <HeadlessTab
        ref={ref}
        className={tremorTwMerge(
          tab({
            variant,
            color,
            className,
          }),
        )}
        {...other}
      >
        {Icon ? <Icon className={icon({ hasChildren: !!children })} /> : null}
        {children ? <span>{children}</span> : null}
      </HeadlessTab>
    );
  },
);

Tab.displayName = "Tab";

export { Tab, type TabProps };
