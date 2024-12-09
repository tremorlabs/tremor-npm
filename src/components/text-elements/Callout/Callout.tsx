import { Color, tremorTwMerge } from "lib";
import React from "react";
import { tv } from "tailwind-variants";

const calloutStyles = tv({
  base: "rounded-tremor-default text-tremor-default flex flex-col border-l-4 py-3 pr-3 pl-4",
  variants: {
    color: {
      brand: ["bg-tremor-brand-faint border-tremor-brand-emphasis text-tremor-brand-emphasis"],
      slate: [
        "bg-slate-50 border-slate-500 text-slate-600",
        "dark:bg-slate-500/10 dark:border-slate-400 dark:text-slate-400",
      ],
      gray: [
        "bg-gray-50 border-gray-500 text-gray-600",
        "dark:bg-gray-500/10 dark:border-gray-400 dark:text-gray-400",
      ],
      zinc: [
        "bg-zinc-50 border-zinc-500 text-zinc-600",
        "dark:bg-zinc-500/10 dark:border-zinc-400 dark:text-zinc-400",
      ],
      neutral: [
        "bg-neutral-50 border-neutral-500 text-neutral-600",
        "dark:bg-neutral-500/10 dark:border-neutral-400 dark:text-neutral-400",
      ],
      stone: [
        "bg-stone-50 border-stone-500 text-stone-600",
        "dark:bg-stone-500/10 dark:border-stone-400 dark:text-stone-400",
      ],
      red: [
        "bg-red-50 border-red-500 text-red-600",
        "dark:bg-red-500/10 dark:border-red-400 dark:text-red-400",
      ],
      orange: [
        "bg-orange-50 border-orange-500 text-orange-600",
        "dark:bg-orange-500/10 dark:border-orange-400 dark:text-orange-400",
      ],
      amber: [
        "bg-amber-50 border-amber-500 text-amber-600",
        "dark:bg-amber-500/10 dark:border-amber-400 dark:text-amber-400",
      ],
      yellow: [
        "bg-yellow-50 border-yellow-500 text-yellow-600",
        "dark:bg-yellow-500/10 dark:border-yellow-400 dark:text-yellow-400",
      ],
      lime: [
        "bg-lime-50 border-lime-500 text-lime-600",
        "dark:bg-lime-500/10 dark:border-lime-400 dark:text-lime-400",
      ],
      green: [
        "bg-green-50 border-green-500 text-green-600",
        "dark:bg-green-500/10 dark:border-green-400 dark:text-green-400",
      ],
      emerald: [
        "bg-emerald-50 border-emerald-500 text-emerald-600",
        "dark:bg-emerald-500/10 dark:border-emerald-400 dark:text-emerald-400",
      ],
      teal: [
        "bg-teal-50 border-teal-500 text-teal-600",
        "dark:bg-teal-500/10 dark:border-teal-400 dark:text-teal-400",
      ],
      cyan: [
        "bg-cyan-50 border-cyan-500 text-cyan-600",
        "dark:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400",
      ],
      sky: [
        "bg-sky-50 border-sky-500 text-sky-600",
        "dark:bg-sky-500/10 dark:border-sky-400 dark:text-sky-400",
      ],
      blue: [
        "bg-blue-50 border-blue-500 text-blue-600",
        "dark:bg-blue-500/10 dark:border-blue-400 dark:text-blue-400",
      ],
      indigo: [
        "bg-indigo-50 border-indigo-500 text-indigo-600",
        "dark:bg-indigo-500/10 dark:border-indigo-400 dark:text-indigo-400",
      ],
      violet: [
        "bg-violet-50 border-violet-500 text-violet-600",
        "dark:bg-violet-500/10 dark:border-violet-400 dark:text-violet-400",
      ],
      purple: [
        "bg-purple-50 border-purple-500 text-purple-600",
        "dark:bg-purple-500/10 dark:border-purple-400 dark:text-purple-400",
      ],
      fuchsia: [
        "bg-fuchsia-50 border-fuchsia-500 text-fuchsia-600",
        "dark:bg-fuchsia-500/10 dark:border-fuchsia-400 dark:text-fuchsia-400",
      ],
      pink: [
        "bg-pink-50 border-pink-500 text-pink-600",
        "dark:bg-pink-500/10 dark:border-pink-400 dark:text-pink-400",
      ],
      rose: [
        "bg-rose-50 border-rose-500 text-rose-600",
        "dark:bg-rose-500/10 dark:border-rose-400 dark:text-rose-400",
      ],
    },
  },
  defaultVariants: {
    color: "brand",
  },
});

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ElementType;
  color?: Color;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, icon: Icon, color, className, children, ...other } = props;

  return (
    <div ref={ref} className={calloutStyles({ color, className })} {...other}>
      <div className="flex items-center">
        {Icon && <Icon className="mr-1.5 h-5 w-5 shrink-0" />}
        <p className="font-semibold text-inherit">{title}</p>
      </div>
      <p
        className={tremorTwMerge("overflow-y-auto text-inherit sm:text-sm", children ? "mt-2" : "")}
      >
        {children}
      </p>
    </div>
  );
});

Callout.displayName = "Callout";

export { Callout, type CalloutProps };
