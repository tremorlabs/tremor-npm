import { Color } from "lib";

export const badgeProportions: {
  [char: string]: {
    paddingX: string;
    paddingY: string;
    fontSize: string;
  };
} = {
  xs: {
    paddingX: "px-2",
    paddingY: "py-0.5",
    fontSize: "text-xs",
  },
  sm: {
    paddingX: "px-2.5",
    paddingY: "py-0.5",
    fontSize: "text-sm",
  },
  md: {
    paddingX: "px-3",
    paddingY: "py-0.5",
    fontSize: "text-md",
  },
  lg: {
    paddingX: "px-3.5",
    paddingY: "py-0.5",
    fontSize: "text-lg",
  },
  xl: {
    paddingX: "px-4",
    paddingY: "py-1",
    fontSize: "text-xl",
  },
};

export const iconSizes: {
  [size: string]: {
    height: string;
    width: string;
  };
} = {
  xs: {
    height: "h-4",
    width: "w-4",
  },
  sm: {
    height: "h-4",
    width: "w-4",
  },
  md: {
    height: "h-4",
    width: "w-4",
  },
  lg: {
    height: "h-5",
    width: "w-5",
  },
  xl: {
    height: "h-6",
    width: "w-6",
  },
};

export const badgeColors: { [color in Color]: string } = {
  brand: "bg-tremor-brand-faint text-tremor-brand-emphasis ring-tremor-brand-default/20",

  slate:
    "ring-slate-300 dark:ring-slate-400/30 bg-slate-600/15 text-slate-700 dark:bg-white/5 dark:text-slate-400",
  gray: "bg-gray-600/15 text-gray-700 ring-gray-300 dark:bg-white/5 dark:text-gray-400 dark:ring-gray-400/30",

  zinc: "bg-zinc-600/15 text-zinc-700 ring-zinc-300 dark:bg-white/5 dark:text-zinc-400 dark:ring-zinc-400/30",

  neutral:
    "ring-neutral-300 dark:ring-neutral-400/30 bg-neutral-600/15 text-neutral-700 dark:bg-white/5 dark:text-neutral-400",
  stone:
    "ring-stone-300 dark:ring-stone-400/30 bg-stone-600/15 text-stone-700 dark:bg-white/5 dark:text-stone-400",
  red: "bg-red-500/15 text-red-700 ring-red-300 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/30",

  orange:
    "ring-orange-300 dark:ring-orange-400/30 bg-orange-500/15 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  amber:
    "ring-amber-300 dark:ring-amber-400/30 bg-amber-400/20 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  yellow:
    "ring-yellow-300 dark:ring-yellow-400/30 bg-yellow-400/20 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-400",
  lime: "bg-lime-400/20 text-lime-700 ring-lime-300 dark:bg-lime-400/10 dark:text-lime-400 dark:ring-lime-400/30",

  green:
    "ring-green-300 dark:ring-green-400/30 bg-green-500/15 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  emerald:
    "ring-emerald-300 dark:ring-emerald-400/30 bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  teal: "bg-teal-500/15 text-teal-700 ring-teal-300 dark:bg-teal-500/10 dark:text-teal-400 dark:ring-teal-400/30",

  cyan: "bg-cyan-400/20 text-cyan-700 ring-cyan-300 dark:bg-cyan-400/10 dark:text-cyan-400 dark:ring-cyan-400/30",

  sky: "bg-sky-500/15 text-sky-700 ring-sky-300 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-400/30",

  blue: "bg-blue-500/15 text-blue-700 ring-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30",

  indigo:
    "ring-indigo-300 dark:ring-indigo-400/30 bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 dark:dark:bg-indigo-500/10",
  violet:
    "ring-violet-300 dark:ring-violet-400/30 bg-violet-500/15 text-violet-700 dark:text-violet-400 dark:dark:bg-violet-500/10",
  purple:
    "ring-purple-300 dark:ring-purple-400/30 bg-purple-500/15 text-purple-700 dark:text-purple-400 dark:dark:bg-purple-500/10",
  fuchsia:
    "ring-fuchsia-300 dark:ring-fuchsia-400/30 bg-fuchsia-400/15 text-fuchsia-700 dark:bg-fuchsia-400/10 dark:text-fuchsia-400",
  pink: "bg-pink-400/15 text-pink-700 ring-pink-300 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/30",

  rose: "bg-rose-400/15 text-rose-700 ring-rose-300 dark:bg-rose-400/10 dark:text-rose-400 dark:ring-rose-400/30",
};
