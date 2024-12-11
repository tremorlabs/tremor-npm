import { DialogPanel as HeadlessuiDialogPanel, TransitionChild } from "@headlessui/react";
import { RootStylesContext } from "contexts";
import { tremorTwMerge } from "lib";
import React from "react";

type DialogPanelProps = React.HTMLAttributes<HTMLDivElement>;

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
          "shadow-tremor-card bg-tremor-background-default text-tremor-content-default ring-tremor-ring-default w-full max-w-lg transform overflow-visible text-left ring-1 transition-all",
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

export { DialogPanel, type DialogPanelProps };
