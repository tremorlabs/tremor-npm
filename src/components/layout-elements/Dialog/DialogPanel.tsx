import { DialogPanel as HeadlessuiDialogPanel, TransitionChild } from "@headlessui/react";
import { RootStylesContext } from "contexts";
import { makeClassName, tremorTwMerge } from "lib";
import React from "react";

const makeDisplayClassName = makeClassName("dialog");

export type DialogPanelProps = React.HTMLAttributes<HTMLDivElement>;

const DialogPanel = React.forwardRef<HTMLDivElement, DialogPanelProps>((props, ref) => {
  const { children, className, ...other } = props;
  const rootStyles =
    React.useContext(RootStylesContext) ?? tremorTwMerge("rounded-tremor-default p-6");

  return (
    <TransitionChild
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <HeadlessuiDialogPanel
        ref={ref}
        className={tremorTwMerge(
          makeDisplayClassName("panel"),
          // common
          "shadow-tremor w-full max-w-lg transform overflow-visible text-left ring-1 transition-all",
          // light
          "bg-tremor-background text-tremor-content ring-tremor-ring",
          // dark
          "dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:ring-dark-tremor-ring",
          rootStyles,
          className,
        )}
        {...other}
      >
        {children}
      </HeadlessuiDialogPanel>
    </TransitionChild>
  );
});

DialogPanel.displayName = "DialogPanel";

export default DialogPanel;
