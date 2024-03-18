import React from "react";
import { Dialog as HeadlessuiDialog, Transition } from "@headlessui/react";
import { makeClassName, tremorTwMerge } from "lib";
import { RootStylesContext } from "contexts";

const makeDisplayClassName = makeClassName("dialog");

export type DialogPanelProps = React.HTMLAttributes<HTMLDivElement>;

const DialogPanel = React.forwardRef<HTMLDivElement, DialogPanelProps>((props, ref) => {
  const { children, className, ...other } = props;
  const rootStyles =
    React.useContext(RootStylesContext) ?? tremorTwMerge("rounded-tremor-default p-6");

  return (
    <Transition.Child
      as={React.Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <HeadlessuiDialog.Panel
        ref={ref}
        className={tremorTwMerge(
          makeDisplayClassName("panel"),
          // common
          "w-full max-w-lg overflow-visible text-left ring-1 shadow-tremor transition-all transform",
          // light
          "bg-tremor-background  text-tremor-content ring-tremor-ring",
          // dark
          "dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:ring-dark-tremor-ring",
          rootStyles,
          className,
        )}
        {...other}
      >
        {children}
      </HeadlessuiDialog.Panel>
    </Transition.Child>
  );
});

DialogPanel.displayName = "DialogPanel";

export default DialogPanel;
