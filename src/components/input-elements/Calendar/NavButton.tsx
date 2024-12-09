import { tremorTwMerge } from "lib";
import React from "react";

interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: React.ElementType;
}

export const NavButton = ({ onClick, icon, ...other }: NavButtonProps) => {
  const Icon = icon;
  return (
    <button
      type="button"
      className={tremorTwMerge(
        "border-tremor-border-default hover:bg-tremor-background-muted rounded-tremor-small focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted outline-one text-tremor-content-subtle hover:text-tremor-content-default flex size-7 items-center justify-center border transition duration-100 select-none focus:ring-2",
      )}
      onClick={onClick}
      {...other}
    >
      <Icon className="size-6 text-inherit" />
    </button>
  );
};
