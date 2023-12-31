import React from "react";
import { border, makeClassName, tremorTwMerge } from "lib";
import { Dialog as HeadlessuiDialog } from "@headlessui/react";
import { RootStylesContext } from "contexts";

const makeDisplayClassName = makeClassName("Dialog");

export type DialogPanelProps = React.HTMLAttributes<HTMLDivElement>;

const Dialog = React.forwardRef<HTMLDivElement, DialogPanelProps>((props, ref) => {
  const { children, className, ...other } = props;
  const rootStyles =
    React.useContext(RootStylesContext) ?? tremorTwMerge(border.sm.all, "rounded-tremor-default");

  return (
    <HeadlessuiDialog.Panel
      ref={ref}
      className={tremorTwMerge(
        makeDisplayClassName("panel"),
        "w-full max-w-xl transform overflow-hidden, rounded-tremor-default",
        "bg-tremor-background border-tremor-border",
        "dark:bg-dark-tremor-background dark:border-dark-tremor-border",
        "text-left align-middle shadow-tremor transition-all p-6",
        rootStyles,
        className,
      )}
      {...other}
    >
      {children}
    </HeadlessuiDialog.Panel>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
